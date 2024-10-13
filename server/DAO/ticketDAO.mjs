import QRCode from 'qrcode';

import db from '../db.mjs';
import { Ticket } from '../model.mjs';

export default function TicketDAO() {
  //this function returns a link to the page which makes you download the ticket
  //it returns both the qr code version and the plain text version
  //we have to choose if download or show the ticket
  this.getLink = id_service => {
    return new Promise((resolve, reject) => {
      const query = 'SELECT * FROM services WHERE name = ?';
      db.get(query, [id_service], (err, row) => {
        if (err) {
          reject(err);
        }
        if (row === undefined) {
          resolve({ error: 'service not found.' });
        } else {
          const url = 'http://localhost:3000/ticket/' + id_service;
          QRCode.toDataURL(url, (err, qrCodeUrl) => {
            if (err) {
              reject(err);
            } else {
              resolve({ url, qrCodeUrl });
            }
          });
        }
      });
    });
  };

  //this function returns all the data to be shown on the ticket
  //receives the service
  /*this.getTicket = id_service => {
    //change db for having a parameter service for better queries
    //add date for having every day a new line

    //getting today's date
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const day = String(today.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;

    return new Promise((resolve, reject) => {
      const query =
        'SELECT max(ticket_number) as ticket_number FROM tickets WHERE id_service = ? AND date = ?';
      db.all(query, [id_service, formattedDate], (err, row) => {
        if (err) {
          reject(err);
        }
        if (row === undefined) {
          //Could have to implement if there are no tickets yet on today's date
          resolve({ error: 'ticket not found.' });
        } else {
          const lastTicketNumber = row.ticket_number || 0;
          const newTicketNumber = lastTicketNumber + 1;

          //need to modify the query as the db will be changed
          const insertQuery =
            'INSERT INTO tickets (id_service, ticket_number) VALUES (?, ?)';
          db.run(insertQuery, [id_service, newTicketNumber], function (err) {
            if (err) {
              reject(err);
            } else {
              //need to discuss about what to be shown in the ticket and what to encode in the qr code
              const ticketData = {
                id_service: id_service,
                ticket_number: newTicketNumber,
                ticket_id: this.lastID, // Assuming `this.lastID` gives the last inserted row ID
              };
              const url = `http://localhost:3000/ticket/${ticketData.ticket_id}`;
              QRCode.toDataURL(url, (err, qrCodeUrl) => {
                if (err) {
                  reject(err);
                } else {
                  resolve({ ticketData, qrCodeUrl });
                }
              });
            }
          });
        }
      });
    });
  };*/

  //this function computes the next ticket number for a given service
  this.compute_next_ticket_number = id_service => {
    return new Promise((resolve, reject) => {
      db.get(
        'SELECT ticket_number FROM tickets WHERE service = ? ORDER BY id DESC LIMIT 1',
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
    const estimated_time = 0; //va preso dalla funzione

    return new Promise((resolve, reject) => {
      db.run(
        'INSERT INTO tickets (ticket_number, estimated_time, status, service) VALUES (?, ?, ?, ?)',
        [ticket_number, estimated_time, status, id_service],
        function (error) {
          if (error) {
            reject(error);
          } else {
            const id = this.lastID;
            const ticketData = new Ticket(
              id,
              ticket_number,
              estimated_time,
              status,
              id_service,
            );
            const url = `http://localhost:3000/ticket/${ticketData.ticket_id}`;
            QRCode.toDataURL(url, (err, qrCodeUrl) => {
              if (err) {
                reject(err);
              } else {
                resolve({ ticketData, qrCodeUrl });
              }
            });
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
        'UPDATE tickets SET status = ? WHERE ticket_number = ?',
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
}
