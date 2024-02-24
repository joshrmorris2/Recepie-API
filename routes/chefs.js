const routes = require('express').Router();
const chefController = require('../controllers/chefs');
const validation = require('../middleware/validate')


routes.get('/', chefController.getAll);
routes.get('/:id', chefController.getSingle);
routes.post('/', validation.savechef, chefController.create);
routes.put('/:id', validation.savechef, chefController.update);
routes.delete('/:id', chefController.remove);

module.exports = routes;