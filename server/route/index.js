import { Router } from 'express';

/** import all required router
 * @module ./meetup
 * @module ./quesions
 */
import meetupRouter from './meetup';
import questionsRouter from './questions';
import rsvpRouter from './rsvp';

const router = Router();

/** This router handles all requests to /meetups endpoint */
router.use('/meetups', meetupRouter);

/** This router handles all requests to /questions endpoint */
router.use('/questions', questionsRouter)

/** This router handles rsvp requests */
router.use('/meetups/:meetupId/rsvp', rsvpRouter);

export default router;
