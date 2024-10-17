export function addHistoryRecord(ticket_number) {
    return new Promise((resolve, reject) => {
      // retrieve the counter_id, service_id ticket table
      // we need to add creation_time field to ticket table
      const ticketQuery = `
        SELECT counter_id, service_id, creation_time
        FROM tickets
        WHERE ticket_number = ?
      `;
  
      db.get(ticketQuery, [ticket_number], (err, ticketRow) => {
        if (err) {
          return reject(err);
        }
  
        // Calculate spent time - It's better to add creation_time column to ticket table
        const currentTime = new Date();
        const creationTime = new Date(ticketRow.creation_time);
        const spentTime = Math.floor((currentTime - creationTime) / (1000 * 60)); // spent time in minutes
  
        // Insert into history table
        const insertHistoryQuery = `
          INSERT INTO history (ticket_number, date, spent_time, counter_id, service_id)
          VALUES (?, ?, ?, ?, ?)
        `;
        const currentDate = currentTime.toISOString().split('T')[0]; // Get just the date (YYYY-MM-DD)
  
        db.run(insertHistoryQuery, [ticket_number, currentDate, spentTime, ticketRow.counter_id, ticketRow.service_id], (err) => {
          if (err) {
            return reject(err);
          }
          resolve();
        });
      });
    });
  }
  