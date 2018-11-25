const express = require('express');
const bodyParser = require('body-parser');
const massive = require('massive');
const session = require('express-session');
const managerController = require('./controllers/managerController');
const authController = require('./controllers/authController');
require('dotenv').config();


const app = express();
massive(process.env.CONNECTION_STRING).then(db => app.set('db', db));
app.use(bodyParser.json());
app.use(session({
    secret: process.env.SESSION_SECRET,
    saveUninitialized: false,
    resave: false,
  }));
app.use(express.static(`${__dirname}/../build`));


function loginCheck (req, res, next) {
  // console.log('login',req.session);
  if (!req.session.user) {
    res.status(403).json({ message: 'Unauthorized' })
    return;
  }
  next();
}
// Manager Endpoints
app.post('/api/monsters', managerController.createMonster);
app.get('/api/encounters', loginCheck, managerController.getEncounterList);
app.post('/api/encounters', loginCheck, managerController.createEncounter);
app.get('/api/encounters/:id', managerController.getMonstersByEncounterId);
app.patch('/api/monsters', managerController.updateMonster);
app.delete('/api/monsters/:id', managerController.deleteMonster);

// Authentication Endpoints

app.get('/auth/callback', authController.login);
app.get('/auth/get-session', (req, res) => {
  // console.log(req.session);
  res.status(200).json(req.session.user);
});
app.post('/auth/logout', (req, res) => {
  req.session.destroy();
  res.sendStatus(200);
});
const SERVER_PORT = process.env.SERVER_PORT || 4000;
app.listen(SERVER_PORT, () => console.log(`Running server on local port: ${SERVER_PORT} 🙈 Dont spook the monkey with errors`));