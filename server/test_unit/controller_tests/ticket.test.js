import { beforeEach, describe, expect, jest, test } from '@jest/globals';

import { TicketController } from '../../controllers/TicketController.mjs';
import { TicketDao } from '../../dao/TicketDao.mjs';

jest.mock('../../dao/TicketDao.mjs'); // Mock the entire DAO module

describe('TicketController', () => {
  beforeEach(() => {
    // Clear any previous mocks before each test
    jest.clearAllMocks();
  });
  //TODO verify the calculation by hand
  describe('getWaitingTime', () => {
    test('should return formatted waiting time', async () => {
      const getServiceTimeMock = jest
        .spyOn(TicketDao, 'getServiceTime')
        .mockResolvedValueOnce(10);
      const getNumberPeopleForRequestMock = jest
        .spyOn(TicketDao, 'getNumberPeopleForRequest')
        .mockResolvedValueOnce(2);
      const getNumberOfServicesServedMock = jest
        .spyOn(TicketDao, 'getNumberOfServicesServed')
        .mockResolvedValue(1)
        .mockResolvedValue(2)
        .mockResolvedValue(3);
      const getCountersMock = jest
        .spyOn(TicketDao, 'getCounters')
        .mockResolvedValueOnce([{ id: 1 }, { id: 2 }, { id: 3 }]);
      const canCounterServeMock = jest
        .spyOn(TicketDao, 'canCounterServe')
        .mockResolvedValue(true)
        .mockResolvedValue(false)
        .mockResolvedValue(true);
      const result = await TicketController.getWaitingTime('Type1');

      expect(getServiceTimeMock).toHaveBeenCalledTimes(1);
      expect(getNumberPeopleForRequestMock).toHaveBeenCalledTimes(1);
      expect(getCountersMock).toHaveBeenCalledTimes(1);
      expect(getNumberOfServicesServedMock).toHaveBeenCalledTimes(3);
      expect(canCounterServeMock).toHaveBeenCalledTimes(3);

      expect(result).toBe('25:00');
    });
  });
});
