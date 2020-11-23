const express = require('express');
const DddController = require('./controllers/DddController');
const UsersController = require('./controllers/UsersController');
const PlanoController = require('./controllers/PlanoController');
const LigaController = require('./controllers/ligamaisController');
const SessionController = require('./controllers/SessionController');

const routes = express.Router();

routes.post('/sessions', SessionController.create);

routes.post('/ddd', DddController.create);
routes.get('/ddd', DddController.list);

routes.get('/users',UsersController.list);
routes.post('/users',UsersController.create); 
routes.put('/users', UsersController.update);

routes.get('/plano',PlanoController.list);
routes.post('/plano',PlanoController.create); 

routes.post('/liga', LigaController.liga);

module.exports = routes;