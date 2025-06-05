import { validationResult } from "express-validator";
import UserModal from "../Models/userModal.js";
export const login = async (req, res) => {
    res.send('Login')
}

export const register = async (req, res) => {
    const result = validationResult(req)
    if (!result.isEmpty()) {
        return res.status(422).json({ errors: result.array() })
    }
    const userModal= new UserModal(req.body)
    userModal.save().then((user) => {
        res.send(user)
    }).catch((err) => {
        console.log(err)
        res.status(500)
    })
    
}