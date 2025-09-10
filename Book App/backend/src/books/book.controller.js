import Book from "./book.model.js";
import { StatusCodes } from 'http-status-codes';
import { NotFoundError, BadRequestError } from '../errors/index.js'

export const getAllBooks = async (req, res, next) => {
    try {
        const books = await Book.find().sort('title');
        res.status(StatusCodes.OK).json({ books, count: books.length });
    } catch (error) {
        next(error);
    }
};

export const getSingleBook = async (req, res, next) => {
    try {
        const bookId = req.params.id;
        const book = await Book.findOne({ _id: bookId });

        if (!book) {
            throw new NotFoundError(`No book with id ${bookId}`);
        }
        res.status(StatusCodes.OK).json({ book });
    } catch (error) {
        next(error);
    }

};

export const createBook = async (req, res, next) => {
    try {
        const newBook = await Book.create(req.body);
        res.status(StatusCodes.CREATED).json({ message: "Book created successfully", book: newBook });
    } catch (error) {
        next(error);
    }
};

export const updateBook = async (req, res, next) => {
    try {
        const bookId = req.params.id;
        const book = await Book.findOneAndUpdate({ _id: bookId }, req.body, {
            new: true,
            runValidators: true
        });

        if (!book) {
            throw new NotFoundError(`No job with id ${jobId}`);
        }
        res.status(StatusCodes.OK).json({ message: "Book updated successfully", book });
    } catch (error) {
        next(error);
    }
};

export const deleteBook = async (req, res, next) => {
    try {
        const bookId = req.params.id;
        const book = await Book.findOneAndDelete({ _id: bookId });

        if (!book) {
            throw new NotFoundError(`No book with id ${bookId}`);
        }
        res.status(StatusCodes.OK).json({ message: "Book deleted successfully", book });
    } catch (error) {
        next(error);
    }
};