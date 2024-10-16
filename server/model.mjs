export default function Ticket(ticket_number, status = 'Waiting', service) {
  this.ticket_number = ticket_number;
  this.status = status;
  this.service = service;
}
