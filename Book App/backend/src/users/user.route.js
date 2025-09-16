import express from 'express';
const router = express.Router();

import { loginAdmin } from './user.controller.js';

router.route('/admin').post(loginAdmin);

export default router;