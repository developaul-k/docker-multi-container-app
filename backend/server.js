const express = require('express');
const db = require('./db');

const app = express();

app.use(express.json());

app.listen(5000, () => console.log('Application started on port:5000'));

app.get('/api/values', function (req, res, next) {
  db.pool.query('SELECT * FROM lists;', (err, results, fields) => {
    if (err) return res.status(500).send(err);

    return res.json(results);
  });
});

app.post('/api/values', function (req, res, next) {
  console.log('req.body.value: ', req.body.value);
  db.pool.query(
    `INSERT INTO lists (value) VALUES("${req.body.value}")`,
    (err, results, fields) => {
      if (err) return res.status(500).send(err);
      res.json({ success: true, value: req.body.value });
    }
  );
});
