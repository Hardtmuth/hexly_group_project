import sqlite3 from 'sqlite3';

const openDb = () => new sqlite3.Database('./db/tasks.db', sqlite3.OPEN_READWRITE, (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.debug('Connected to the ./db/tasks.db SQlite database.');
});

const closeDb = (db) => {
  db.close((err) => {
    if (err) {
      return console.error(err.message);
    }
    console.debug('Close the database connection.');
  });
};

const getAllTasks = () => {
  const db = openDb();
  const response = [];
  const sql = 
  `select t.id, t.name, s.name status 
    from task t
    join status s on t.status_id = s.id`;

  db.all(sql, (err, rows) =>  rows);
  closeDb(db);
  console.log('zxc:' + JSON.stringify());
  return response;
};

export { getAllTasks };
