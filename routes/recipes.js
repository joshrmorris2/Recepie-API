const routes = require('express').Router();
const contactController = require('../controllers/recipes');
const validation = require('../middleware/validate')


routes.get('/', contactController.getAll);
routes.get('/:id', contactController.getSingle);
routes.post('/', validation.saveRecipe, contactController.create);
routes.put('/:id', validation.saveRecipe, contactController.update);
routes.delete('/:id', contactController.remove);

module.exports = routes;