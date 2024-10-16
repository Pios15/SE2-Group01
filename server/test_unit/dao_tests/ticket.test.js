import {
  getCounterFromService,
  getCounters,
  getNumberOfServicesServed,
  getNumberPeopleForRequest,
} from '../../dao/TicketDao.mjs';
import db from '../../db.mjs';

const { afterEach, describe, test, expect, jest } = require('@jest/globals');
const { getServiceTime } = require('../../dao/TicketDao.mjs');

jest.mock('../../dao/TicketDao.mjs');

afterEach(() => {
  jest.clearAllMocks();
});

describe('TicketDao', () => {
  describe('getServiceTime', () => {
    test('should reject with an error when no service is found', async () => {
      // Mock `db.get` to simulate no service found (null row)
      jest.spyOn(db, 'get').mockImplementation((sql, params, callback) => {
        callback(null, null); // No row found
      });

      // Test that it rejects with "Service not found"
      await expect(getServiceTime('service1')).rejects.toBe(
        'Service not found',
      );
    });

    test('should reject with an error when the database returns an error', async () => {
      // Mock `db.get` to simulate a database error
      jest.spyOn(db, 'get').mockImplementation((sql, params, callback) => {
        callback(new Error('Database error'), null); // Database error
      });

      // Test that it rejects with the database error
      await expect(getServiceTime('service1')).rejects.toThrow(
        'Database error',
      );
    });

    test('should return the average_time when service is found', async () => {
      // Mock `db.get` to simulate a valid service found
      jest.spyOn(db, 'get').mockImplementation((sql, params, callback) => {
        callback(null, { average_time: 20 }); // Row found with average_time
      });

      // Test that it resolves with the correct value
      const result = await getServiceTime('service1');
      expect(result).toBe(20);
    });
  });

  describe('getNumberPeopleForRequest', () => {
    test('No people for request', async () => {
      jest.spyOn(db, 'get').mockImplementation((sql, params, callback) => {
        callback(null, null); // No row found
      });

      const res = getNumberPeopleForRequest('service1');
      await expect(res).rejects.toBe('Service not found');
    });
    test('should return the number of people waiting', async () => {
      jest.spyOn(db, 'get').mockImplementation((sql, params, callback) => {
        callback(null, { total_people: 5 });
      });

      const result = await getNumberPeopleForRequest('service1');
      expect(result).toBe(5);
    });

    test('should reject with an SQL error', async () => {
      const sqlError = new Error('SQL Error');
      jest.spyOn(db, 'get').mockImplementation((sql, params, callback) => {
        callback(sqlError, null); // Simula un errore SQL
      });

      await expect(getNumberPeopleForRequest('service1')).rejects.toThrow(
        'SQL Error',
      );
    });

    test('should return 0 if there are no people waiting', async () => {
      jest.spyOn(db, 'get').mockImplementation((sql, params, callback) => {
        callback(null, { total_people: 0 });
      });

      const result = await getNumberPeopleForRequest('service1');
      expect(result).toBe(0);
    });
  });

  describe('getNumberOfServicesServed', () => {
    test('should retrive the number of service served', async () => {
      jest.spyOn(db, 'get').mockImplementation((sql, params, callback) => {
        callback(null, { totCount: 5 }); // Simula un errore SQL
      });

      await expect(getNumberOfServicesServed(1)).resolves.toBe(5);
    });

    test('should retrive the number of service served', async () => {
      jest.spyOn(db, 'get').mockImplementation((sql, params, callback) => {
        callback(null, { totCount: 0 }); // Simula un errore SQL
      });

      await expect(getNumberOfServicesServed(1)).resolves.toBe(0);
    });
    test('should retrive the number of service served', async () => {
      jest.spyOn(db, 'get').mockImplementation((sql, params, callback) => {
        callback(null, null); // Simula un errore SQL
      });

      await expect(getNumberOfServicesServed(1)).rejects.toBe(
        'Counter not found',
      );
    });
    test('should reject with an SQL error', async () => {
      const sqlError = new Error('SQL Error');
      jest.spyOn(db, 'get').mockImplementation((sql, params, callback) => {
        callback(sqlError, null); // Simula un errore SQL
      });

      await expect(getNumberPeopleForRequest(2)).rejects.toThrow('SQL Error');
    });
  });

  describe('getCounters', () => {
    test('should resolve with an array of counters', async () => {
      jest.spyOn(db, 'all').mockImplementation((sql, callback) => {
        callback(null, [{ id: 1 }, { id: 2 }, { id: 3 }]);
      });

      const result = await getCounters();
      expect(result).toEqual([{ id: 1 }, { id: 2 }, { id: 3 }]);
    });

    test('should reject with an SQL error', async () => {
      const sqlError = new Error('SQL Error');

      jest.spyOn(db, 'all').mockImplementation((sql, callback) => {
        callback(sqlError, null);
      });

      await expect(getCounters()).rejects.toThrow('SQL Error');
    });
  });

  describe('getCounterFromService', () => {
    test('should resolve with an array of counters', async () => {
      const arrToVerify = [
        { id: 1, number: 1, service_id: 2 },
        { id: 2, number: 2, service_id: 2 },
        { id: 3, number: 3, service_id: 2 },
      ];
      jest.spyOn(db, 'all').mockImplementation((sql, params, callback) => {
        callback(null, arrToVerify);
      });

      const result = await getCounterFromService('service1');
      expect(result).toEqual(arrToVerify);
    });

    test('should reject with an SQL error', async () => {
      const sqlError = new Error('SQL Error');

      jest.spyOn(db, 'all').mockImplementation((sql, params, callback) => {
        callback(sqlError, null);
      });

      await expect(getCounterFromService('service1')).rejects.toThrow(
        'SQL Error',
      );
    });
  });
});
