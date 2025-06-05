import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import morgan from 'morgan';
import authRoute from './Routes/authRoute.js';

dotenv.config()

const app = express()
app.use(cors())
app.use(helmet())   
app.use(bodyParser.json())
app.use(morgan('combined'))

app.use('/auth', authRoute)

app.use((err, req, res, next) => {
  console.error(err.stack, "kggk");
})
app.delete('/auth', (req, res) => {
  res.status(200).json({ message: 'Delete request received' });
});

mongoose.connect(process.env.MONGO_URI).then(()=>{
    app.listen(process.env.PORT, () => {
        console.log('Server is running on port 3000')
    })
}).catch(err => {
    console.log(err)
})