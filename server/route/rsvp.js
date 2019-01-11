import { Router } from 'express';

/** import
 * @module controller/rsvp
*/
import rsvpController from '../controller/rsvp';

const router = Router();

/** This router handles request for the creation of a rsvp */
router.post('/', rsvpController.createRsvp);

export default router;
