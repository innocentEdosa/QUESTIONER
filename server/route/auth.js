import { Router } from 'express';
import { body } from 'express-validator/check';

/** import
 * @module controller/auth
*/

import authController from '../controller/auth';

import validator from '../helper/validate';

const router = Router();

router.post('/signup', validator.validateSignup(), authController.Signup);

router.post('/login', authController.Login);
/**
 * @export router
 */
export default router;
