import { getAverageSpentTimeByService, updateAverageTime } from '../dao/serviceDao.mjs';
import { db } from '../db.mjs'; 

jest.mock('../db.mjs'); 

describe('Service DAO Tests', () => {
  afterEach(() => {
    jest.clearAllMocks(); 
  });

  test('getAverageSpentTimeByService should return average time spent', async () => {
    db.get.mockImplementation((query, params, callback) => {
      callback(null, { avg_time_spent: 150 });
    });

    const avgTimeSpent = await getAverageSpentTimeByService(1);
    expect(avgTimeSpent).toBe(150);
    expect(db.get).toHaveBeenCalledWith(expect.any(String), [1], expect.any(Function));
  });

  test('updateAverageTime should update average time in service table', async () => {
    // Mock db.run to simulate database update
    db.run.mockImplementation((query, params, callback) => {
      callback(null);
    });

    await expect(updateAverageTime(1, 150)).resolves.toBeUndefined();
    expect(db.run).toHaveBeenCalledWith(expect.any(String), [150, 1], expect.any(Function));
  });
});
