const express = require('express');
const bodyParser = require('body-parser');
const massive = require('massive');
// const session = require('express-session');
const managerController = require('./controllers/managerController');
const authController = require('./controllers/authController');
require('dotenv').config();


const app = express();
massive(process.env.CONNECTION_STRING).then(db => app.set('db', db));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../../build')));

// Manager Endpoints
app.post('/api/monsters', managerController.createMonster);
app.get('/api/encounters/:id', managerController.getMonstersByEncounterId);
app.patch('/api/monsters', managerController.updateMonster);
app.delete('/api/monsters/:id', managerController.deleteMonster);

// Authentication Endpoints

const SERVER_PORT = process.env.SERVER_PORT || 4000;
app.listen(SERVER_PORT, () => console.log(`Running server on local port: ${SERVER_PORT} 🙈 Dont spook the monkey with errors`));