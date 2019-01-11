import { Router } from 'express';

import validator from '../helper/validate';

/** import
 * @module controller/rsvp
*/
import rsvpController from '../controller/rsvp';

const router = Router();

/** This router handles request for the creation of a rsvp */
router.post('/', validator.validateRsvp(), rsvpController.createRsvp);

export default router;
