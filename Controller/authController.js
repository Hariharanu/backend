import { validationResult } from "express-validator";
import RegisterModal from "../Models/RegisterModal.js"
import HttpError from "../Models/httpError.js";
import { INVALID_PASSWORD_ERROR_MESSAGE, USER_NOT_FOUND_ERROR_MESSAGE, USERNAME_REQUIRED_ERROR_MESSAGE } from "../constant/validationConstant.js";
export const login = async (req, res,next) => {
    const result = validationResult(req)
    if (!result.isEmpty()) {
        return res.status(422).json({ errors: result.array() })
    }
    try {
        const { userName, password } = req.body
        const user = await RegisterModal.findOne({ userName })
        if (!user) {
            throw new HttpError(404, USER_NOT_FOUND_ERROR_MESSAGE)
        }
        const isPasswordValid = await user.comparePassword(password)
        if (!isPasswordValid) {
            throw new HttpError(401, INVALID_PASSWORD_ERROR_MESSAGE)
        }
        const token = user.generateToken()
        res.status(200).json({
            message: 'Login successful',
            accessToken: token,
            userType: user.userType,
        })
    } catch (err) {
        return next(err)
    }
}

export const register = async (req, res, next) => {
    const result = validationResult(req)
    if (!result.isEmpty()) {
        return res.status(422).json({ errors: result.array() })
    }
    try {
        const registerModal1 = await RegisterModal.findOne({ userName: req.body.userName })
        if (registerModal1) {
            throw new HttpError(409, USERNAME_REQUIRED_ERROR_MESSAGE)
        }
        const { userName, password, userType } = req.body
        const registerModal = new RegisterModal({
            userName,
            password,
            userType
        })
        registerModal.save().then(response => {
            res.status(201).json({
                message:'User registered successfully',
                user: {
                    userName: response.userName,
                    userType: response.userType,
                    _id: response._id,
                },
            })
        }).catch(err => {
            if (err.code === 11000) {
            console.log(err.message)
              return next(new HttpError(409, USERNAME_REQUIRED_ERROR_MESSAGE))
            }
            console.log(err.message)
            return next(new HttpError(500, err.message));
        })
    }
    catch (err) {
        return next(err)
    }
}