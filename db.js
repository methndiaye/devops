const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./notes.db');

db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS notes (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT,
            content TEXT
        )
    `);
});

module.exports = db;