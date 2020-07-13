const { Router } = require('express');
const MailController = require('../controllers/MailController');

const routes = Router();

routes.get('/', MailController.index);
routes.post('/send', MailController.store);

module.exports = routes;
