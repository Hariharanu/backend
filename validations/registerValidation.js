import {body} from 'express-validator'

export const registerValidation = () =>{
    return[
        body('userName').trim().notEmpty().withMessage('Username is required').isEmail().withMessage('Not valid email').escape(),
        body('password').isStrongPassword().withMessage('Password strength rules not met'),
        body('confirmPassword').notEmpty().withMessage('Confirm password is required'),
        body('userType').notEmpty().withMessage('user type is required').isIn(['DOCTOR', 'PATIENT']).withMessage('userType must be either DOCTOR or PATIENT')
    ]
}