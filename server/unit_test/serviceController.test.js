// serviceController.test.js
import { getAverageSpentTimeByService, updateAverageTime } from '../dao/serviceDao.mjs';
import { updateServiceAverageTime } from '../controllers/serviceController.mjs';

jest.mock('../dao/serviceDao.mjs'); // Mock the DAO layer

describe('Service Controller Tests', () => {
  const mockRequest = {
    params: { service_id: '1' },
  };

  const mockResponse = {
    json: jest.fn(),
    status: jest.fn().mockReturnThis(),
  };

  afterEach(() => {
    jest.clearAllMocks(); 
  });

  test('updateServiceAverageTime should update service and return success', async () => {
    getAverageSpentTimeByService.mockResolvedValue(150);
    updateAverageTime.mockResolvedValue();

    await updateServiceAverageTime(mockRequest, mockResponse);

    expect(getAverageSpentTimeByService).toHaveBeenCalledWith('1');
    expect(updateAverageTime).toHaveBeenCalledWith('1', 150);
    expect(mockResponse.json).toHaveBeenCalledWith({
      success: true,
      message: 'Average time for service ID 1 updated successfully.',
      average_time: 150,
    });
  });

  test('updateServiceAverageTime should handle errors and return failure', async () => {
    getAverageSpentTimeByService.mockRejectedValue(new Error('DB error'));

    await updateServiceAverageTime(mockRequest, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(500);
    expect(mockResponse.json).toHaveBeenCalledWith({
      success: false,
      message: 'Error updating service: DB error',
    });
  });
});
