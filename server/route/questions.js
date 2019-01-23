import { Router } from 'express';

/** import
 * @module controller/question
*/
import questionController from '../controller/questions';

import validator from '../helper/validate';

import isAuth from '../middleware/isAuth';

const router = Router();

/** This router handles request for the creation of a question */
router.post('/', isAuth, validator.validateQuestions(), questionController.createQuestion);

/** This routes handles request to upvote a question */
router.patch('/:questionId/upvote', questionController.upvote);

/** This route handles request to downvote a question */
router.patch('/:questionId/downvote', questionController.downvote);

export default router;
