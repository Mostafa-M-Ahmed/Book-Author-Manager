import express from 'express'
import bookRouter from "./src/Modules/Book/book.routes.js";
import authorRouter from "./src/Modules/Author/author.routes.js";
import { connection_db } from "./DB/connection.js";


const app = express();
const port = 3000;
app.use(express.json());
app.use('/book', bookRouter);
app.use('/author', authorRouter);

connection_db();

app.get('/', (req, res) => res.send('Books database'))
app.listen(port, () => console.log(`Books-app listening on port ${port}!`))