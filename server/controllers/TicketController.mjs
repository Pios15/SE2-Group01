import {
  canCounterServe,
  getCounters,
  getNumberOfServicesServed,
  getNumberPeopleForRequest,
  getServiceTime,
} from '../dao/TicketDao.mjs';

export async function getWaitingTime(serviceType) {
  return convertDecimalToTime(await calculateWaitingTime(serviceType));
}

async function calculateWaitingTime(serviceType) {
  const serviceTime = await getServiceTime(serviceType);
  const numberPeople = await getNumberPeopleForRequest(serviceType);
  const calculateTypeOfServicevar = await calculateTypeOfService();
  console.log(serviceTime);
  console.log(numberPeople);
  console.log(calculateTypeOfServicevar);
  return serviceTime * (numberPeople / calculateTypeOfServicevar + 1 / 2);
}

async function calculateTypeOfService() {
  let total = 0;
  let counters = await getCounters();

  const results = await Promise.all(
    counters.map(async i => {
      let numberServicebyCounter = await getNumberOfServicesServed(i);
      if (numberServicebyCounter === 0) {
        return 0;
      }

      let canServe = await canCounterServe(i);
      return (1 / numberServicebyCounter) * canServe;
    }),
  );

  total = results.reduce((acc, result) => acc + result, 0);

  return total;
}

function convertDecimalToTime(decimalHours) {
  const hours = Math.floor(decimalHours);
  const minutes = Math.round((decimalHours - hours) * 60);

  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
}
