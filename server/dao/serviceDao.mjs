import { db } from '../db.mjs';

export function getAverageSpentTimeByService(service_id) {
  return new Promise((resolve, reject) => {
    const query = `
      SELECT AVG(spent_time) AS avg_spent_time
      FROM (
        SELECT spent_time
        FROM history
        WHERE service_id = ?
        ORDER BY id DESC
        LIMIT 100
      ) AS latest_history;
    `;

    db.get(query, [service_id], (err, row) => {
      if (err) return reject(err);
      resolve(row && row.avg_spent_time ? row.avg_spent_time : 0);
    });
  });
}

export function updateAverageTime(service_id, avgTimeSpent) {
  return new Promise((resolve, reject) => {
    const updateQuery = `
            UPDATE service
            SET average_time = ?
            WHERE id = ?;
        `;
    db.run(updateQuery, [avgTimeSpent, service_id], err => {
      if (err) return reject(err);
      resolve();
    });
  });
}
