const bodyParser = require('body-parser');
const express = require('express');
const db = require('./db');

const app = express();

app.use(bodyParser.json());

// 운영 환경에서 테이블 생성
db.pool.query(
  `
  CREATE TABLE lists (
    id MEDIUMINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    value TEXT
  )
  `,
  (err, results, fileds) => console.log('results', results)
);

app.listen(5000, () => console.log('Application started on port:5000'));

app.get('/api/values', function (req, res, next) {
  db.pool.query('SELECT * FROM lists;', (err, results, fields) => {
    if (err) return res.status(500).send(err);

    return res.json(results);
  });
});

app.post('/api/values', function (req, res, next) {
  db.pool.query(
    `INSERT INTO lists (value) VALUES("${req.body.value}")`,
    (err, results, fields) => {
      console.log('err?', err);
      if (err) return res.status(500).send(err);
      res.json({ success: true, value: req.body.value });
    }
  );
});
