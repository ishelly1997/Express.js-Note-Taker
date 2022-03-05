const express = require('express');

const path = require('path');

const notes = require('./db/db.json')
const PORT = 3001;
const app = express();

/* app.get('/api/notes', (req, res) => {
    let results = notes;
    console.log(req.query)
    res.json(results);
  }); */
app.listen(3001, () => {
    console.log(`API server now on port 3001!`);
  });