import { Router } from 'express';

/** import
 * @module controller/meetup
*/
import meetupController from '../controller/meetup';

const router = Router();

/** This router handles request for the creation of a meetup */
router.post('/', meetupController.createMeetup);

/**
 * @export router
 */
export default router;
