import Book from '../../../DB/Models/book.model.js';


// =================================== create a new book ===================================
export const createBook = async (req, res, next) => {
    try {
        const { title, content, author, publishedDate } = req.body

        const book = new Book({
            title,
            content,
            author,
            publishedDate
        });

        // create a new book
        const newBook = await book.save();

        res.json({ message: 'Book created successfully', book: newBook })
    } catch (error) {
        console.log(error);
        res.json({ message: "Something went wrong while creating book" })
    }

}



// =================================== retrieve all books ===================================
export const getAllBooks = async (req, res) => {
    try {
        const { page = 1, limit = 10, filter = '' } = req.query;

        const query = {
            $or: [
                { title: { $regex: filter, $options: 'i' } },   // case-insensitive
                { author: { $regex: filter, $options: 'i' } }
            ]
        };

        const books = await Book.find(query)
            .limit(parseInt(limit))
            .skip((parseInt(page) - 1) * parseInt(limit));

        let count = await Book.countDocuments();
        if (filter != '') {
            count = books.length
        }

        res.json({ message: `Showing ${limit} books per page.`, books, totalBooks: count, totalPages: Math.ceil(count / limit), currentPage: parseInt(page) });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Something went wrong while retrieving books' });
    }
};



// =================================== retrieve a single book ===================================
export const getBookById = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if (!book)
            return res.status(404).json({ message: 'Book not found' });
        res.json(book);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Something went wrong while retrieving book' });
    }
};



// =================================== update a book ===================================
export const updateBookById = async (req, res) => {
    try {
        const { title, content, author, publishedDate } = req.body;

        const book = await Book.findByIdAndUpdate(
            req.params.id,
            { title, content, author, publishedDate, $inc: { __v: 1 } },
            { new: true, runValidators: true }
        );

        if (!book)
            return res.status(404).json({ message: 'Book not found' });
        res.json({ message: 'Book updated successfully', book });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Something went wrong while updating book' });
    }
};



// =================================== delete a book ===================================
export const deleteBookById = async (req, res) => {
    try {
        const book = await Book.findByIdAndDelete(req.params.id);
        if (!book)
            return res.status(404).json({ message: 'Book not found' });
        res.json({ message: 'Book deleted successfully', book });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Something went wrong while deleting book' });
    }
};
