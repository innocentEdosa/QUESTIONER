import { Router } from 'express';

/** import
 * @module controller/question
*/
import questionController from '../controller/questions';

const router = Router();

/** This router handles request for the creation of a question */
router.post('/', questionController.createQuestion);

/** This routes handles request to upvote a question */
router.patch('/:questionId/upvote', questionController.upvote);

export default router;
