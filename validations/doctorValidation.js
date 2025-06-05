import { body } from "express-validator"
import { NAME_LENGTH_ERROR_MESSAGE } from "../constant/validationConstant.js"

export const doctorValidation = () =>{
    return[
        body('firstName').trim().notEmpty()
        .withMessage('firstName is required')
        .isLength({ min: 2, max: 50 })
        .withMessage(`firstName ${NAME_LENGTH_ERROR_MESSAGE}`).escape()
        
    ]
}