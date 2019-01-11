import { Router } from 'express';

/** import all required router
 * @module ./meetup
 * @module ./quesions
 */
import meetupRouter from './meetup';
import questionsRouter from './questions';

const router = Router();

/** This router handles all requests to /meetups endpoint */
router.use('/meetups', meetupRouter);

/** This router handles all requests to /questions endpoint */
router.use('/questions', questionsRouter)

export default router;
