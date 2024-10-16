import db from '../db.mjs';
import { Ticket } from '../model.mjs';

export default function TicketDAO() {
  //this function computes the next ticket number for a given service
  this.compute_next_ticket_number = id_service => {
    return new Promise((resolve, reject) => {
      db.get(
        'SELECT ticket_number FROM ticket WHERE service_ref = ? ORDER BY ticket_number DESC LIMIT 1',
        [id_service],
        (error, row) => {
          if (error) {
            reject(error);
          } else {
            const serviceLetterMap = {
              1: 'A',
              2: 'B',
              3: 'C',
              4: 'D',
            };
            const lastTicketNumber = row
              ? parseInt(row.ticket_number.slice(0, -1))
              : 0;
            resolve(`${lastTicketNumber + 1}${serviceLetterMap[id_service]}`);
          }
        },
      );
    });
  };

  //this function creates a new ticket
  this.getTicket = async id_service => {
    const ticket_number = await this.compute_next_ticket_number(id_service);
    const status = 'Waiting';

    return new Promise((resolve, reject) => {
      db.run(
        'INSERT INTO ticket (ticket_number, status, service_ref) VALUES (?, ?, ?)',
        [ticket_number, status, id_service],
        function (error) {
          if (error) {
            reject(error);
          } else {
            const ticketData = new Ticket(ticket_number, status, id_service);
            resolve(ticketData);
          }
        },
      );
    });
  };

  //this function changes the status of a ticket (served, canceled, in progress)
  this.change_status = (ticket_number, new_status_code) => {
    return new Promise((resolve, reject) => {
      const statusMap = {
        1: 'Served',
        2: 'Canceled',
        3: 'In_Progress',
      };
      db.run(
        'UPDATE ticket SET status = ? WHERE ticket_number = ?',
        [statusMap[new_status_code], ticket_number],
        error => {
          if (error) {
            reject(error);
          } else {
            resolve(statusMap[new_status_code]);
          }
        },
      );
    });
  };

  this.get_service_name = id_service => {
    return new Promise((resolve, reject) => {
      db.get(
        'SELECT name FROM service WHERE id = ?',
        [id_service],
        (error, row) => {
          if (error) {
            reject(error);
          } else {
            resolve(row.name);
          }
        },
      );
    });
  };
}
