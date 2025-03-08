import express from 'express';
import { login, register } from '../Controller/authController.js';

const router = express.Router()

router.post('/register', register)

export default router