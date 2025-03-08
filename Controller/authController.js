import UserModal from "../Models/userModal.js";

export const login = async (req, res) => {
    res.send('Login')
}

export const register = async (req, res) => {
    const { name, email, password } = req.body;
    const userModal= new UserModal()
    userModal.name = name;
    userModal.email = email;
    userModal.password = password;
    userModal.save().then((user) => {
        res.send(user)
    })
    
}