// Database

import sqlite3 from "sqlite3";

const db = new sqlite3.Database("office.db", (error) => {
  if (error) throw error;
});

export default db;
