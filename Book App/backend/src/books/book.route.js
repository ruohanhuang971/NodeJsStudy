import express from 'express';
const router = express.Router();

import { getAllBooks, getSingleBook, createBook, updateBook, deleteBook } from './book.controller.js';

// create book
router.route('/').get(getAllBooks).post(createBook);
router.route('/:id').get(getSingleBook).patch(updateBook).delete(deleteBook);

export default router;