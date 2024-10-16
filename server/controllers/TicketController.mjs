import {
  canCounterServe,
  getCounters,
  getNumberOfServicesServed,
  getNumberPeopleForRequest,
  getServiceTime,
} from '../dao/TicketDao.mjs';

async function getWaitingTime(serviceType) {
  const serviceTimeForRequest = await getServiceTime(serviceType);
  const numberPeopleForRequest = await getNumberPeopleForRequest(serviceType);
  let counters = await getCounters();

  const results = await Promise.all(
    counters.map(async i => {
      let numberServicebyCounter = await getNumberOfServicesServed(i.id);
      if (numberServicebyCounter === 0) {
        return 0;
      }
      const canServe = (await canCounterServe(i)) ? 1 : 0;
      return (1 / numberServicebyCounter) * canServe;
    }),
  );

  const total = results.reduce((acc, result) => acc + result, 0);

  let result = serviceTimeForRequest * (numberPeopleForRequest / total + 1 / 2);

  return convertDecimalToTime(result);
}

function convertDecimalToTime(decimalHours) {
  const hours = Math.floor(decimalHours);
  const minutes = Math.round((decimalHours - hours) * 60);

  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
}
export const TicketController = {
  getWaitingTime,
};
