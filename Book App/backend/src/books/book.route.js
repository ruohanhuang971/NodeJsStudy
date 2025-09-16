import express from 'express';
const router = express.Router();

import { getAllBooks, getSingleBook, createBook, updateBook, deleteBook } from './book.controller.js';
import authMiddleware from '../middleware/auth.js';

// create book
router.route('/').get(getAllBooks).post(authMiddleware, createBook);
router.route('/:id').get(getSingleBook).patch(authMiddleware, updateBook).delete(authMiddleware, deleteBook);

export default router;