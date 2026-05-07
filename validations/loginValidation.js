import {body} from 'express-validator'

export const loginValidation = () =>{
    return[
        body('userName').trim().notEmpty().withMessage('Username is required').isEmail().withMessage('Not valid email').escape(),
        body('password').notEmpty().withMessage('Password is required'),
    ]
}