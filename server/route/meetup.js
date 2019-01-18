import { Router } from 'express';

/** import
 * @module controller/meetup
*/
import meetupController from '../controller/meetup';

import validator from '../helper/validate';

import isAuth from '../middleware/isAuth';


const router = Router();

/** This router handles request for the creation of a meetup */
router.post('/', isAuth, validator.validateMeetup(), meetupController.createMeetup);

/** This router handles request to get all meetups */
router.get('/', isAuth, meetupController.getMeetups);

/** This router handles request to get upcoming meetup */
router.get('/upcoming', isAuth, meetupController.getUpcoming);

/** This router handles requests to get a specific meetup */
router.get('/:meetupId', meetupController.getMeetup);


/**
 * @export router
 */
export default router;
