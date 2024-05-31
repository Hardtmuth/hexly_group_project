import sqlite3 from 'sqlite3';

export default (request) => {
  let db = new sqlite3.Database('./db/tasks.db', sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
      return console.error(err.message);
    }
    console.log('Connected to the in-memory SQlite database.');
  });

  db.serialize(() => {
  db.each(request, (err, row) => {
      if (err) {
        console.error(err.message);
      }
    });
  });

  db.close((err) => {
    if (err) {
      return console.error(err.message);
    }
    console.log('Close the database connection.');
  });
}