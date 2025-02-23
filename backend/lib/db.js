const sqlite3 = require('sqlite3');
const createTables = require('./setup-queries.js');
const parseCSV = require('../utils/parser');
const path = require('path');

// TODO: Change the database path to in memory when done testing
const db = new sqlite3.Database(path.join(__dirname, "../news-articles"), async (err) => {
    if (err) {
      console.error("Error connecting to database:", err.message);
      return;
    }
    console.log("Connected to SQLite3 database");

    setupDatabase();

    try {
        const rows = await getQuery("SELECT * FROM Article LIMIT 1");
        if (!rows) {
            data = await parseCSV(path.join(__dirname, "../data/Fake.csv"));
            await insertData(data);
            console.log("Data inserted successfully");
        }
    } catch (err) {
        console.error("Error inserting data during setup:", err.message);
    }
  });

function setupDatabase() {
    db.exec(createTables, async (err) => {
      if (err) {
        console.error("Error creating tables:", err.message);
      } else {
        console.log("Tables created successfully");
      }
    });
}

function runQuery(query, params = []) {
    return new Promise((resolve, reject) => {
      db.run(query, params, function (err) {
        if (err) reject(err);
        else resolve(this);
      });
    });
  }
  
  function getQuery(query, params = []) {
    return new Promise((resolve, reject) => {
      db.get(query, params, function (err, row) {
        if (err) reject(err);
        else resolve(row);
      });
    });
  }
  
  function getAllQuery(query, params = []) {
    return new Promise((resolve, reject) => {
      db.all(query, params, function (err, rows) {
        if (err) reject(err);
        else resolve(rows);
      });
    });
  }

  async function insertData(data) {
    await runQuery('BEGIN TRANSACTION');
    try {
        for(const row of data) {
            const [
                title, 
                summary, 
                publisher,
                date
            ] = row;
            
            if (!title || !summary || !publisher || !date) {
                throw new Error("Invalid data");
            }

            await runQuery(
                `INSERT INTO Article (Title, Summary, Publisher, Date) VALUES (?, ?, ?, ?)`,
                [title, summary, publisher, date]
            );
        }

        await runQuery('COMMIT');
    } catch (err) {
        await runQuery('ROLLBACK');
        throw err;
    }
  }

  async function updateData(id, data) {
    const { title, summary, publisher, date } = data;

    if (!title || !summary || !publisher || !date) {
        throw new Error("Invalid data");
    }

    await runQuery(
      `UPDATE Article SET Title = ?, Summary = ?, Publisher = ?, Date = ? WHERE id = ?`,
      [title, summary, publisher, date, id]
    );
  }

  async function deleteData(id) {
    if (id === undefined || !!id === false) {
      throw new Error("Invalid data");
    }
    await runQuery(`DELETE FROM Article WHERE id = ?`, [id]);
  }

  module.exports = { db, runQuery, getQuery, getAllQuery, insertData, updateData, deleteData };