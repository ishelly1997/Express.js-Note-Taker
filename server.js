const express = require('express');
const res = require('express/lib/response');
const uuid = require('./uuid');
const path = require('path');
const notes = require('./db/db.json');
const PORT = process.env.PORT || 3001;

//let note = [{}]

const app = express();
const fs = require('fs');
const util = require('util');
//const readFileAsync = util.promisify(fs.readFile);
//const writeFileAsync = util.promisify(fs.writeFile);
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static('public'));

/*app.get('/', (req, res) => {
  console.log(req)
  res.sendFile(path.join(__dirname, './public/index.html'))
})*/

app.get('/api/notes', (req, res) => {
  res.json(`${req.method} get notes`);
  console.info(`${req.method} get notes`);
});
/*app.get('/api/notes/:note_id', (req, res) => {
  if (req.body && req.params.note_id) {
    console.info(`${req.method} note request`);
    const noteId = req.params.note_id;
    for (let i = 0; i < notes.length; i++) {
      const activeNote = notes[i];
      if (activeNote.note_id === noteId) {
        res.json(activeNote);
        return;
      }
    }
    res.json('N/A');
  }
});*/

app.post('/api/notes', (req, res) => {
  console.log(req);
  const notes = JSON.parse(fs.readFileSync('./db/db.json'));
  const newNotes = req.body;
  newNotes.id = uuid();
  notes.push(newNotes);
  console.log(notes);
  fs.writeFileSync('./db/db.json', JSON.stringify(notes))
  res.json(notes)
});

app.get('/notes', (req, res) => {
  console.log(req)
  res.sendFile(path.join(__dirname, './public/notes.html'))
})

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
  });

app.listen(PORT, () => {
    console.log(`App server now on port ${PORT}!`);
});