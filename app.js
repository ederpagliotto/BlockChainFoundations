const express = require('express');
const path = require('path');
const app = express();
const port = 8080;

app.set('view engine', 'ejs');
app.set('views', './views');

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/about', (req, res) => {
  res.render('about');
});

app.get('/baristaplan', (req, res) => {
  res.render('baristaplan');
});

app.get('/brewmasterplan', (req, res) => {
  res.render('brewmasterplan');
});

app.get('/experience', (req, res) => {
  res.render('experience');
});

app.get('/plans', (req, res) => {
  res.render('plans');
});

app.listen(port, () => {
  console.log(`Server running: http://localhost:${port}`);
});
