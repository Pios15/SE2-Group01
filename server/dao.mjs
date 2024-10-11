import { db } from './db.mjs';
import { Ticket } from './models.mjs';

export function compute_next_ticket_number(service) {
  return new Promise((resolve, reject) => {
    db.get(
      'SELECT ticket_number FROM tickets WHERE service = ? ORDER BY id DESC LIMIT 1',
      [service],
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
          resolve(`${lastTicketNumber + 1}${serviceLetterMap[service]}`);
        }
      },
    );
  });
}

export async function create_ticket(service) {
  const ticket_number = await compute_next_ticket_number(service);
  const status = 'Waiting';
  const estimated_time = 0; //va preso dalla funzione

  return new Promise((resolve, reject) => {
    db.run(
      'INSERT INTO tickets (ticket_number, estimated_time, status, service) VALUES (?, ?, ?, ?)',
      [ticket_number, estimated_time, status, service],
      error => {
        if (error) {
          reject(error);
        } else {
          const id = this.lastID;
          resolve(
            new Ticket(id, ticket_number, estimated_time, status, service),
          );
        }
      },
    );
  });
}

export function set_served(ticket_number, new_status) {
  return new Promise((resolve, reject) => {
    const statusMap = {
      1: 'Served',
      2: 'Canceled',
      3: 'In_Progress',
    };
    db.run(
      'UPDATE tickets SET status = ? WHERE ticket_number = ?',
      [statusMap[new_status], ticket_number],
      error => {
        if (error) {
          reject(error);
        } else {
          resolve();
        }
      },
    );
  });
}
