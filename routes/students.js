const express = require('express');
const router = express.Router();
const db = require('../db/conn');

router.get('/', (req, res) => {
    db.query('SELECT * FROM students', (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

router.post('/', (req, res) => {
    const { name, age, email, course } = req.body;
    const sql = 'INSERT INTO students (name, age, email, course) VALUES (?, ?, ?, ?)';
    db.query(sql, [name, age, email, course], (err, result) => {
        if (err) throw err;
        res.json({ id: result.insertId, name, age, email, course });
    });
});

router.put('/:id', (req, res) => {
    const { name, age, email, course } = req.body;
    const sql = 'UPDATE students SET name = ?, age = ?, email = ?, course = ? WHERE id = ?';
    db.query(sql, [name, age, email, course, req.params.id], (err) => {
        if (err) throw err;
        res.json({ message: 'Student updated successfully' });
    });
});

router.delete('/:id', (req, res) => {
    const sql = 'DELETE FROM students WHERE id = ?';
    db.query(sql, [req.params.id], (err) => {
        if (err) throw err;
        res.json({ message: 'Student deleted successfully' });
    });
});

module.exports = router;
