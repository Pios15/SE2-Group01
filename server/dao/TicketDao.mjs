import db from '../db.mjs';

export const getServiceTime = type => {
  return new Promise((resolve, reject) => {
    const sql = 'select average_time from service where name = ?';
    db.get(sql, [type], (err, row) => {
      if (err) reject(err);
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
      resolve(row.total_people);
    });
  });
};

export const getNumberOfServicesServed = counter_id => {
  return new Promise((resolve, reject) => {
    const sql = 'select count(*) as totCount from counter where number = ?';
    db.get(sql, [counter_id.id], (err, row) => {
      if (err) reject(err);
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

export const canCounterServe = counter_id => {
  return new Promise((resolve, reject) => {
    const sql =
      'select * from ticket where counter_id = ? and status = "in_progress"';
    db.get(sql, [counter_id], (err, row) => {
      if (err) reject(err);
      if (row) resolve(0);
      else resolve(1);
    });
  });
};
