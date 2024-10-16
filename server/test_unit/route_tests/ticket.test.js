import { afterEach, describe, expect, jest, test } from '@jest/globals';

import request from 'supertest';

import { TicketController } from '../../controllers/TicketController.mjs';
import { app } from '../../index.mjs';

describe('GET /ticket/waitingTime/:serviceType', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should return the waiting time with the status 200', async () => {
    const mockServiceType = 'Type1'; // Un servizio di esempio
    const mockWaitingTime = '20:00';

    // Mock della funzione getWaitingTime
    jest
      .spyOn(TicketController, 'getWaitingTime')
      .mockResolvedValueOnce(mockWaitingTime);

    // Esegui la richiesta al server
    const response = await request(app).get(
      `/ticket/waitingTime/${mockServiceType}`,
    );

    // Log della risposta per debugging
    console.log(response.body);

    // Asserzioni
    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockWaitingTime); // Assicurati che la risposta JSON corrisponda a ciò che ti aspetti
    expect(TicketController.getWaitingTime).toHaveBeenCalledWith(
      mockServiceType,
    ); // Verifica che la funzione sia stata chiamata con il giusto parametro
  });
  test('should return the waiting time with the status 500', async () => {
    const mockServiceType = 'Type1'; // Un servizio di esempio

    // Mock della funzione getWaitingTime
    jest.spyOn(TicketController, 'getWaitingTime').mockRejectedValue('Error');

    // Esegui la richiesta al server
    const response = await request(app).get(
      `/ticket/waitingTime/${mockServiceType}`,
    );

    // Log della risposta per debugging
    console.log(response.body);

    // Asserzioni
    expect(response.status).toBe(500);
    expect(TicketController.getWaitingTime).toHaveBeenCalledWith(
      mockServiceType,
    ); // Verifica che la funzione sia stata chiamata con il giusto parametro
  });
});
