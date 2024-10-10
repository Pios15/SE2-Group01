import QRCode from 'qrcode';

import db from '../db.mjs';

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
  this.getTicket = id_service => {
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
  };
}
