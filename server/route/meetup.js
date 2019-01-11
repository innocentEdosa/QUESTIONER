import { Router } from 'express';

/** import
 * @module controller/meetup
*/
import meetupController from '../controller/meetup';

const router = Router();

/** This router handles request for the creation of a meetup */
router.post('/', meetupController.createMeetup);
/** This router handles request to get all meetups */
router.get('/', meetupController.getMeetups);
/** This router handles requests to get a specific meetup */
router.get('/:meetupId', meetupController.getMeetup);


/**
 * @export router
 */
export default router;
