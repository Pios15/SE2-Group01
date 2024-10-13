import express from 'express';

import { updateServiceAverageTime } from '../controllers/serviceController.mjs';

const router = express.Router();

// Route to update the service's average time
router.put('/update-service-average/:service_id', updateServiceAverageTime);

export default router;
