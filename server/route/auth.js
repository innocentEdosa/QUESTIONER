import { Router } from 'express';
import { body } from 'express-validator/check';

/** import
 * @module controller/auth
*/
import pool from '../models/dbConfig';

import authController from '../controller/auth';

import validator from '../helper/validate';

const router = Router();

router.post('/signup', validator.validateSignup(), authController.Signup);

/**
 * @export router
 */
export default router;
