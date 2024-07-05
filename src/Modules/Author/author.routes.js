import { Router } from "express";
import * as authorController from "./author.controller.js";
const router = Router();

router.post('/', authorController.createAuthor);
router.get('/', authorController.getAllAuthors);
router.get('/:id', authorController.getAuthorById);
router.patch('/:id', authorController.updateAuthorById);
router.delete('/:id', authorController.deleteAuthorById);



export default router