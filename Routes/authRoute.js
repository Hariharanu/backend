import express from 'express';
import { login, register } from '../Controller/authController.js';
import { registerValidation } from '../validations/registerValidation.js';

const router = express.Router()


router.post('/register', registerValidation(),  register)
router.post('/login', login)

export default router