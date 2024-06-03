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

const getAllTasks = async () => {
  const db = openDb();
  const response = {tasks: []};
  const sql = `
    select id, text, status, priority
    from tasks
  `;  
  

  await new Promise((resolve, reject) => {
    db.all(sql, (err, rows) => resolve(rows));
    }).then((rows) => {
    rows.forEach(row => {
      response.tasks.push(row);
    });
  });
  closeDb(db);
  console.log('task:' + JSON.stringify(response));
  return response;
};

export { getAllTasks };
