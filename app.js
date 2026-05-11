const express = require('express');
const db = require('./db');
const path = require('path');

const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, '../frontend')));

// GET notes
app.get('/api/notes', (req, res) => {
    db.all("SELECT * FROM notes", [], (err, rows) => {
        res.json(rows);
    });
});

// POST note
app.post('/api/notes', (req, res) => {
    const { title, content } = req.body;

    db.run(
        "INSERT INTO notes(title, content) VALUES (?, ?)",
        [title, content],
        function () {
            res.json({ id: this.lastID });
        }
    );
});

// DELETE note
app.delete('/api/notes/:id', (req, res) => {
    const { id } = req.params;
    db.run("DELETE FROM notes WHERE id = ?", [id], function (err) {
        res.json({ deleted: this.changes });
    });
});

app.listen(3000, () => {
    console.log("🚀 Server running on http://localhost:3000");
});
