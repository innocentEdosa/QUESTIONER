import { Router } from 'express';

/** import all required router
 * @module ./meetup
 */
import meetupRouter from './meetup';

const router = Router();

/** This router handles all requests to /meetups endpoint */
router.use('/meetups', meetupRouter);

export default router;
