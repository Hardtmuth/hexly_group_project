import sqlite3 from 'sqlite3';

const openDb = () => new sqlite3.Database('./db/tasks.db', sqlite3.OPEN_READWRITE, (err) => {
  if (err) {
    return console.error(err.message);
  }
  return 1;
});

const closeDb = (db) => {
  db.close((err) => {
    if (err) {
      return console.error(err.message);
    }
    return 1;
  });
};

const getAllTasks = async () => {
  const db = openDb();
  const response = { tasks: [] };
  const sql = `
    select id, text, status, priority 
    from tasks
    where not status = 'recycled'
  `;

  await new Promise((resolve) => {
    db.all(sql, (err, rows) => resolve(rows));
  }).then((rows) => {
    rows.forEach((row) => {
      response.tasks.push(row);
    });
  });
  closeDb(db);
  console.log(`tasks:${JSON.stringify(response)}`);
  return response;
};

const getDeletedTasks = async () => {
  const db = openDb();
  const response = { tasks: [] };
  const sql = `
    select id, text, status, priority
    from tasks
    where status = 'recycled'
  `;

  await new Promise((resolve) => {
    db.all(sql, (err, rows) => resolve(rows));
  }).then((rows) => {
    rows.forEach((row) => {
      response.tasks.push(row);
    });
  });
  closeDb(db);
  console.log(`tasks:${JSON.stringify(response)}`);
  return response;
};

const getTaskId = async (text) => {
  const db = openDb();
  const response = [];
  const sql = `
    select id
    from tasks
    where text = '${text}'
  `;

  await new Promise((resolve) => {
    db.all(sql, (err, rows) => resolve(rows));
  }).then((rows) => {
    rows.forEach((row) => {
      response.push(row);
    });
  });
  closeDb(db);
  return response;
};

const createTask = async (text, status, priority) => {
  const db = openDb();
  const sql = `
    INSERT INTO tasks (text, status, priority)
    VALUES (?, ?, ?);
  `;

  await new Promise((resolve, reject) => {
    db.run(sql, [text, status, priority], (err) => {
      if (err) {
        console.error(err.message);
        reject(err);
      }
      resolve({ text });
    });
  });

  /* await new Promise((resolve, reject) => {
    db.all(sql, (err, rows) => resolve(rows));
  }).then((rows) => {
    rows.forEach((row) => {
      response.task.push(row);
    });
  }); */

  closeDb(db);
};

const removeTask = async (id) => {
  const db = openDb();
  // const response = { task: [] };
  const sql = `
    UPDATE tasks SET status = 'recycled' WHERE id = ?
  `;

  await new Promise((resolve, reject) => {
    db.run(sql, [id], (err) => {
      if (err) {
        console.error(err.message);
        reject(err);
      }
      resolve({ id });
    });
  });

  closeDb(db);
  /* await new Promise((resolve, reject) => {
    db.all(sql, (err, rows) => resolve(rows));
  }).then((rows) => {
    rows.forEach((row) => {
      response.task.push(row);
    });
  });
  closeDb(db);
  console.log(`task:${JSON.stringify(response)}`);
  return response; */
};

const removeRecycledTask = async (id) => {
  const db = openDb();
  // const response = { task: [] };
  const sql = `
    DELETE FROM tasks
    WHERE id = ?;
  `;

  await new Promise((resolve, reject) => {
    db.run(sql, [id], (err) => {
      if (err) {
        console.error(err.message);
        reject(err);
      }
      // resolve({ id: this.lastID });
    });
  });

  closeDb(db);
  /* await new Promise((resolve, reject) => {
    db.all(sql, (err, rows) => resolve(rows));
  }).then((rows) => {
    rows.forEach((row) => {
      response.task.push(row);
    });
  });
  closeDb(db);
  console.log(`task:${JSON.stringify(response)}`);
  return response; */
};

const changeStatus = async (id, status) => {
  const db = openDb();
  const sql = `
    UPDATE tasks SET status = ? WHERE id = ?
  `;

  await new Promise((resolve, reject) => {
    db.run(sql, [status, id], (err) => {
      if (err) {
        console.error(err.message);
        reject(err);
      }
      resolve({ id, status });
    });
  });

  closeDb(db);
};

const createTable = async (name) => {
  const db = openDb();
  const response = { task: [] };
  const sql = `
    CREATE TABLE ${name} (
      id            INTEGER PRIMARY KEY UNIQUE,
      text          TEXT NOT NULL,
      status        TEXT, -- only open, closed, recycled
      priority      INTEGER -- 1: low, 2: default, 3: hight
    );
  `;

  await new Promise((resolve) => {
    db.all(sql, (err, rows) => resolve(rows));
  }).then((rows) => {
    rows.forEach((row) => {
      response.task.push(row);
    });
  });
  closeDb(db);
  console.log(`task:${JSON.stringify(response)}`);
  return response;
};

const dropTable = async (name) => {
  const db = openDb();
  const response = { task: [] };
  const sql = `
    DROP TABLE ${name}
  `;

  await new Promise((resolve) => {
    db.all(sql, (err, rows) => resolve(rows));
  }).then((rows) => {
    rows.forEach((row) => {
      response.task.push(row);
    });
  });
  closeDb(db);
  console.log(`task:${JSON.stringify(response)}`);
  return response;
};

const cartClean = async () => {
  const db = openDb();
  const response = { task: [] };
  const sql = `
    DELETE FROM tasks
    WHERE status = 'recycled'
  `;

  await new Promise((resolve) => {
    db.all(sql, (err, rows) => resolve(rows));
  }).then((rows) => {
    rows.forEach((row) => {
      response.task.push(row);
    });
  });
  closeDb(db);
  console.log(`task:${JSON.stringify(response)}`);
  return response;
};

const changePriority = async (id, priority) => {
  const db = openDb();
  const response = { task: [] };
  const sql = `
    UPDATE tasks SET priority = ${priority} WHERE id = ${id}
  `;

  await new Promise((resolve) => {
    db.all(sql, (err, rows) => resolve(rows));
  }).then((rows) => {
    rows.forEach((row) => {
      response.task.push(row);
    });
  });
  closeDb(db);
  console.log(`task:${JSON.stringify(response)}`);
  return response;
};

const getTasksByPriority = async (priority) => {
  const db = openDb();
  const response = { task: [] };
  const sql = `
    SELECT id, text, status, priority
    FROM tasks
    WHERE priority = ${priority}
  `;

  await new Promise((resolve) => {
    db.all(sql, (err, rows) => resolve(rows));
  }).then((rows) => {
    rows.forEach((row) => {
      response.task.push(row);
    });
  });
  closeDb(db);
  console.log(`task:${JSON.stringify(response)}`);
  return response;
};

const getTasksByText = async (text) => {
  const db = openDb();
  const response = { task: [] };
  const sql = `
    SELECT text, status, priority
    FROM tasks
    WHERE text = '${text}'
  `;

  await new Promise((resolve) => {
    db.all(sql, (err, rows) => resolve(rows));
  }).then((rows) => {
    rows.forEach((row) => {
      response.task.push(row);
    });
  });
  closeDb(db);
  // console.log(`text task:${JSON.stringify(response)}`);
  return response;
};

const removeTasksByText = async (text) => {
  const db = openDb();
  const response = { task: [] };
  const sql = `
    DELETE FROM tasks
    WHERE text = '${text}'
  `;

  await new Promise((resolve) => {
    db.all(sql, (err, rows) => resolve(rows));
  }).then((rows) => {
    rows.forEach((row) => {
      response.task.push(row);
    });
  });
  closeDb(db);
  // console.log(`text task:${JSON.stringify(response)}`);
  return response;
};

export {
  getAllTasks,
  getTaskId,
  createTask,
  removeTask,
  changeStatus,
  createTable,
  dropTable,
  changePriority,
  getTasksByPriority,
  getDeletedTasks,
  removeRecycledTask,
  cartClean,
  getTasksByText,
  removeTasksByText,
};
