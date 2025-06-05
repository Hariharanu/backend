import mongoose from 'mongoose';
const userSchema = new mongoose.Schema({
    firstName:{
        type: String,
        required: true
    },
    lastName:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    phone:{
        type: String,
        required: true
    },
    alternatePhone:{
        type: String,
    },
    address:{
       addressLine1: {
            type: String,
            required: true
        },
        addressLine2: {
            type: String
        }
    },
    city:{
        type: String,
        required: true
    },
    state:{
        type: String,
        required: true
    },
    country:{
        type: String,
        required: true
    },
    zip:{
        type: String,
        required: true
    },
    createdAt:{
        type: Date,
        default: Date.now
    },
    updatedAt:{
        type: Date,
        default: Date.now
    },
    dockerID:{
        type: String,
        required: true
    },
    patients:{
        type: Array,
        default: []
    },
    
})

const UserModal = mongoose.model('User', userSchema);
export default UserModal;