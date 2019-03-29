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

router.get('/upcoming', isAuth, meetupController.getUpcoming);

router.get('/random/:meetupNum', meetupController.getRandom);

router.get('/trending', meetupController.getTrending);

router.get('/:admin/meetups', meetupController.getAdminMeetups);

/** This router handles requests to get a specific meetup */
router.get('/:meetupId', isAuth, meetupController.getMeetup);

/** This router handles requests for deleting a specific meetup */
router.delete('/:meetupId', isAuth, meetupController.deleteMeetup);

router.put('/:meetupid', isAuth, validator.validateMeetup(), meetupController.updateMeetup);


/**
 * @export router
 */
export default router;
