import express from 'express';
const router = express.Router();

import { createOrder, getOrderByEmail } from './order.controllers.js';

// create order endpoint
router.route('/').post(createOrder);

// get order by user email address
router.route('/:email').get(getOrderByEmail)

export default router;