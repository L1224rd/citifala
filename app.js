// ==================== EXTERNAL IMPORTS ==================== //

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

// ==================== INTERNAL IMPORTS ==================== //

// ==================== GLOBAL VARIABLES ==================== //

const app = express();

const fala = [];
let eleicao = 'no';

// ==================== MIDDLEWARE ==================== //

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// serving static files
app.use('/views', express.static(path.join(__dirname, 'views')));

// ==================== FUNCTIONS ==================== //

// returns the full path of the passed view
const getViewPath = view => path.join(__dirname, `views/${view}/${view}.html`);

// ==================== ROUTES ==================== //

// ==================== RENDER VIEWS ==================== //

app.get('/', (req, res) => {
  res.sendFile(getViewPath('home'));
});

app.get('/fala', (req, res) => {
  res.send(fala);
});

app.get('/eleicao', (req, res) => {
  res.send(eleicao);
});

app.get('/proximo_remove', (req, res) => {
  fala.shift();
  res.send('ok');
});

app.get('/change_eleicao/:status', (req, res) => {
  eleicao = req.params.status;
  res.redirect('/');
});

app.post('/', (req, res) => {
  if(!req.body.level) req.body.level = 1;
  if (!fala.length) {
    fala.push({
      name: req.body.name,
      level: req.body.level,
    });
    res.send('ok');
    return;
  }
  let positionFlag = fala.length;
  for (let i = 0; i < fala.length; i++) {
    if (+fala[i].level < +req.body.level) {
      positionFlag = i;
      break;
    }
  }
  fala.splice(positionFlag, 0, {
    name: req.body.name,
    level: req.body.level,
  });
  res.send('ok');
});

// ==================== START SERVER ==================== //

app.listen(process.env.PORT || 3000, () => {
  console.log('READY');
});

// ====================================================== //
