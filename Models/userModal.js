import mongoose from 'mongoose';
const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    }
})

const UserModal = mongoose.model('User', userSchema);
export default UserModal;