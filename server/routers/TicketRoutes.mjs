import express from 'express';

import { getWaitingTime } from '../controllers/TicketController.mjs';

export const router = express.Router();

router.get('/waitingTime/:serviceType', (req, res, next) =>
  getWaitingTime(req.params.serviceType)
    .then(r => res.status(200).json(r))
    .catch(err => next(err)),
);

export default router;
