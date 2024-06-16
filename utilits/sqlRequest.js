import sqlite3 from 'sqlite3';

export default (request) => {
  const res = [];
  const db = new sqlite3.Database('./db/tasks.db', sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
      return console.error(err.message);
    }
    console.log('Connected to the task.db.');
    return 1;
  });

  db.each(request, (err, row) => {
    if (err) {
      console.error(err.message);
    }
    console.log('row: ', row);
    res.push(row);
  });

  db.close((err) => {
    if (err) {
      return console.error(err.message);
    }
    console.log('Close the database connection.');
    return 1;
  });
  return res;
};
