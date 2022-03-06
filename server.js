const express = require('express');
const res = require('express/lib/response');
const uuid = require('uuid');
const path = require('path');
const {notes} = require('./db/db.json');
const PORT = process.env.PORT || 3001;
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static('public'));

app.get('/api/notes', (req, res) => {
  res.sendFile(path.join(__dirname, './db/db.json'))
});

app.post('/api/notes', (req, res) => {
  const { title, text } = req.body;

  if (title && text) {

    const newNote = {
      title,
      text,
      note_id: uuid(),
    };
    const noteString = JSON.stringify(newNote);
    // Write the string to a file
    fs.writeFile(`./db/db.json`, noteString, (err) =>
      err
        ? console.error(err)
        : console.log(
            `Note ${newNote.title} has been written to JSON file`
          )
    );
    const response = {
      status: 'success',
      body: newNote,
    };
    console.log(response);
    res.json(response);
  } else {
    res.json('Error in creating note');
  }
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './public/index.html'))
})

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'))
})

app.listen(PORT, () => {
    console.log(`App server now on port ${PORT}!`);
});