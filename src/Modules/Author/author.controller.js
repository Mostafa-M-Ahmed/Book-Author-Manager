import Author from "../../../DB/Models/author.model.js"


// =================================== create a new author ===================================
export const createAuthor = async (req, res) => {
    try {
        const { name, bio, birthDate, books } = req.body;

        const author = new Author({
            name,
            bio,
            birthDate,
            books
        });

        const newAuthor = await author.save();

        res.json({ message: 'Author created successfully', author: newAuthor });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Something went wrong while creating author' });
    }
};



// =================================== get all authors ===================================
export const getAllAuthors = async (req, res) => {
    try {
        let { filter } = req.query;
        if (filter === null || filter === undefined) {
            filter = '';
        }

        const query = {
            $or: [
                { name: { $regex: filter, $options: 'i' } },    // case-insensitive
                { bio: { $regex: filter, $options: 'i' } }
            ]
        };

        const authors = await Author.find(query);
        res.json({ message: "Total number of created authors " + authors.length, authors })
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Something went wrong while retrieving authors' });
    }
};



// =================================== get author by id ===================================
export const getAuthorById = async (req, res) => {
    try {
        const author = await Author.findById(req.params.id).populate('books');
        if (!author)
            return res.status(404).json({ message: 'Author not found' });
        res.json(author);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Something went wrong while retrieving author' });
    }
};



// =================================== update author ===================================
export const updateAuthorById = async (req, res) => {
    try {
        const { name, bio, birthDate, books } = req.body;

        const author = await Author.findByIdAndUpdate(
            req.params.id,
            {name, bio, birthDate, books, $inc: { __v: 1 } },
            { new: true, runValidators: true }
        );

        if (!author)
            return res.status(404).json({ message: 'Author not found' });
        res.json({ message: 'Author updated successfully', author });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Something went wrong while updating author' });
    }
};



// =================================== delete author ===================================
export const deleteAuthorById = async (req, res) => {
    try {
        const author = await Author.findByIdAndDelete(req.params.id);
        if (!author)
            return res.status(404).json({ message: 'Author not found' });
        res.json({ message: 'Author deleted successfully', author });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Something went wrong while deleting author' });
    }
};