import db from '../db.mjs';

export const getServiceTime = type => {
  return new Promise((resolve, reject) => {
    const sql = 'select average_time from service where name = ?';
    db.get(sql, [type], (err, row) => {
      if (err) reject(err);
      else if (!row) reject('Service not found');
      resolve(row.average_time);
    });
  });
};

export const getNumberPeopleForRequest = service_ref => {
  return new Promise((resolve, reject) => {
    const sql =
      "select count(*) as total_people from ticket,service where service_ref = id and name = ? and status = 'Waiting'  ";
    db.get(sql, [service_ref], (err, row) => {
      if (err) reject(err);
      if (!row) reject('Service not found');
      resolve(row.total_people);
    });
  });
};

export const getNumberOfServicesServed = counter_id => {
  return new Promise((resolve, reject) => {
    const sql = 'select count(*) as totCount from counter where number = ?';
    db.get(sql, [counter_id], (err, row) => {
      if (err) reject(err);
      if (!row) reject('Counter not found');
      resolve(row.totCount);
    });
  });
};

export const getCounters = () => {
  return new Promise((resolve, reject) => {
    const sql = 'select id from counter';
    db.all(sql, (err, rows) => {
      if (err) reject(err);

      resolve(rows);
    });
  });
};

export const canCounterServe = service => {
  return new Promise((resolve, reject) => {
    const sql = 'select * from counter where service_id = ? and number = ?';
    db.get(sql, [service], (err, row) => {
      if (err) reject(err);
      if (row) resolve(true);
      else resolve(false);
      resolve(row);
    });
  });
};
export const TicketDao = {
  getServiceTime,
  getNumberPeopleForRequest,
  getNumberOfServicesServed,
  getCounters,
  canCounterServe,
};
