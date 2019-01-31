import { Router } from 'express';
import { body } from 'express-validator/check';

/** import
 * @module controller/auth
*/
import isAuth from '../middleware/isAuth';

import authController from '../controller/auth';

import validator from '../helper/validate';

const router = Router();

router.post('/signup', validator.validateEmail(), validator.validatePassword(), validator.validatePhonenumber(), validator.validateUsername(), validator.validateSignup(), authController.Signup);

router.post('/login', validator.validateEmail(), validator.validatePassword(), authController.Login);

router.post('/verify', isAuth, authController.Verify);
/**
 * @export router
 */
export default router;
