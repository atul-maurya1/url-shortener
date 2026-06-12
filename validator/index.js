import {body} from  'express-validator'

export const userRegestrationValidation = () => {
    
    return [
        body("email")
          .notEmpty()
          .withMessage("email is required")
          .isEmail()
          .withMessage("please enter valid email")
          .trim(),
        body("password")
           .notEmpty()
           .withMessage("password is required")
           .isLength({ min: 6 })
		   .withMessage("Password must be 6 characters longs"),
        body("confirmPassword")
              .notEmpty()
           .withMessage("confirmpassword is required")
     ]
}

