import TicketDAO from '../DAO/ticketDAO.mjs';

const ticketDAO = new TicketDAO();

export async function getWaitingTime(serviceType) {
  const serviceTimeForRequest = await ticketDAO.getServiceTime(serviceType);
  const numberPeopleForRequest =
    await ticketDAO.getNumberPeopleForRequest(serviceType);
  let counters = await ticketDAO.getCounters();

  const results = await Promise.all(
    counters.map(async i => {
      let numberServicebyCounter = await ticketDAO.getNumberOfServicesServed(
        i.id,
      );
      if (numberServicebyCounter === 0) {
        return 0;
      }

      const canServe = (await ticketDAO.canCounterServe(i.id, serviceType))
        ? 1
        : 0;
      return (1 / numberServicebyCounter) * canServe;
    }),
  );

  const total = results.reduce((acc, result) => acc + result, 0);
  let result = serviceTimeForRequest * (numberPeopleForRequest / total + 1 / 2);
  return convertDecimalToTime(result);
}

export const TicketController = {
  getWaitingTime,
};

function convertDecimalToTime(decimalHours) {
  const hours = Math.floor(decimalHours);
  const minutes = Math.round((decimalHours - hours) * 60);

  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
}
