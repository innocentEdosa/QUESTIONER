import { Router } from 'express';

import validator from '../helper/validate';

import isAuth from '../middleware/isAuth';

/** import
 * @module controller/comments
*/
import commentController from '../controller/comments';

const router = Router();

/** This router handles request for the creation of a rsvp */
router.post('/', isAuth, commentController.createComment);

export default router;
