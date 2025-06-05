import mongoose from "mongoose";

const registerSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    }
})

const RegisterModal = mongoose.model('Users', registerSchema)

export default RegisterModal