import { Router } from 'express';

/** import all required router
 * @module ./meetup
 * @module ./quesions
 */
import meetupRouter from './meetup';
import questionsRouter from './questions';
import rsvpRouter from './rsvp';
import authRouter from './auth';

const router = Router();

/** fix cors errors */
router.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PATCH, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

/** This router handles all requests to /meetups endpoint */
router.use('/meetups', meetupRouter);

/** This router handles all requests to /questions endpoint */
router.use('/questions', questionsRouter)

/** This router handles rsvp requests */
router.use('/meetups/:meetupId/rsvp', rsvpRouter);

router.use('/auth', authRouter);

export default router;
