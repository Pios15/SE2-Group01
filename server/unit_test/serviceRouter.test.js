import request from 'supertest';
import express from 'express';
import serviceRouter from '../routes/serviceRouter.mjs';
import { updateServiceAverageTime } from '../controllers/serviceController.mjs';

jest.mock('../controllers/serviceController.mjs'); // Mock the controller

const app = express();
app.use(express.json()); // for parsing application/json
app.use('/service', serviceRouter);

describe('Service Router Tests', () => {
  test('PUT /update-service-average/:service_id should call controller', async () => {
    updateServiceAverageTime.mockImplementation((req, res) => res.json({ success: true }));

    const response = await request(app).put('/service/update-service-average/1');

    expect(updateServiceAverageTime).toHaveBeenCalled();
    expect(response.body).toEqual({ success: true });
  });
});
