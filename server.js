const express = require('express');
const res = require('express/lib/response');

const path = require('path');

const notes = require('./db/db.json')
const PORT = process.env.PORT || 3001;
const app = express();
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static('public'))
app.get('/api/notes', (req, res) => {
    let results = notes;
    console.log(req.query)
    res.json(results);
  });

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'))
})

app.post('/api/notes', (req, res) => {
    res.json(`${req.method} request received to get notes`);

    console.info(`${req.method} request received to get notes`);
  });

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'))
})
app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});