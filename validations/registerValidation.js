import {body} from 'express-validator'

export const registerValidation = () =>{
    return[
        body('userName').trim().notEmpty().withMessage('Username is required').escape()
    ]
}