function Ticket(
  id,
  ticket_number,
  estimated_time,
  status = 'Waiting',
  service,
) {
  this.id = id;
  this.ticket_number = ticket_number;
  this.estimated_time = estimated_time;
  this.status = status;
  this.service = service;
}

export { Ticket };
