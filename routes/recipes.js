const routes = require('express').Router();
const contactController = require('../controllers/recipes');
const validation = require('../middleware/validate')


routes.get('/', contactController.getAll);
routes.get('/:id', contactController.getSingle);
routes.post('/', validation.saveRecipe, contactController.createRecipe);
routes.put('/:id', validation.saveRecipe, contactController.updateRecipe);
routes.delete('/:id', contactController.deleteRecipe);

module.exports = routes;