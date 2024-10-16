const baseURL = 'http://localhost:3001/api';

const handleInvalidResponse = response => {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  const type = response.headers.get('content-type');
  if (type !== null && type.indexOf('application/json') === -1) {
    throw new TypeError(`Expected JSON, got ${type}`);
  }
  return response;
};

// create ticket
export const createTicket = async serviceId => {
  const response = await fetch(`${baseURL}/ticket/create`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ serviceId }),
  })
    .then(handleInvalidResponse)
    .then(response => response.json());
  return response.qrcode;
};

// change ticket status
export const changeTicketStatus = async (status, ticketId) => {
  const response = await fetch(`${baseURL}/ticket/${ticketId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ status }),
  })
    .then(handleInvalidResponse)
    .then(res => res.json());
  return response;
};
