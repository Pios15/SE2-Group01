import express from 'express';

import { updateServiceAverageTime } from '../controllers/serviceController.mjs';

const serviceRouter = express.Router();

// Route to update the service's average time
serviceRouter.put(
  '/update-service-average/:service_id',
  updateServiceAverageTime,
);

export default serviceRouter;
