import express from 'express';
import { dockerController } from '../Controller/doctorController.js';
const router = express.Router();


router.post('/addDoctor',dockerController)


export default router;