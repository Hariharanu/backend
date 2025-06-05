import express from 'express';
import { register } from '../Controller/authController.js';
import { doctorValidation } from '../validations/doctorValidation.js';

const router = express.Router()


router.post('/register', doctorValidation(),  register)

export default router