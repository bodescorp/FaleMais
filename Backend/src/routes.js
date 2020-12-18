const express = require('express');
const { celebrate, Segments, Joi } = require('celebrate');

const DddController = require('./controllers/DddController');
const UsersController = require('./controllers/UsersController');
const PlanoController = require('./controllers/PlanoController');
const LigaController = require('./controllers/ligamaisController');
const SessionController = require('./controllers/SessionController');

const routes = express.Router();

routes.post('/sessions', SessionController.create);

routes.post('/ddd', DddController.create);
routes.get('/ddd', DddController.list);

routes.get('/users', UsersController.list);

routes.post('/users', celebrate({
    [Segments.BODY]: Joi.object().keys({
        cpf: Joi.number().required().min(11),
        name: Joi.string().required(),
        email: Joi.string().required().email(),
        falemais_id: Joi.number().required()
    })
}), UsersController.create);

routes.put('/users', celebrate({
    [Segments.HEADERS]: Joi.object({
            authorization: Joi.string().required(),
        }).unknown(),
    [Segments.BODY]: Joi.object().keys({
            falemais_id: Joi.number().required()
        })
}), UsersController.update);

routes.get('/plano', PlanoController.list);
routes.post('/plano', PlanoController.create);

routes.post('/liga', LigaController.liga);

module.exports = routes;