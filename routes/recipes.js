const routes = require('express').Router();
const recipeController = require('../controllers/recipes');
const validation = require('../middleware/validate')


routes.get('/', recipeController.getAll);
routes.get('/:id', recipeController.getSingle);
routes.post('/', validation.saveRecipe, recipeController.create);
routes.put('/:id', validation.saveRecipe, recipeController.update);
routes.delete('/:id', recipeController.remove);

module.exports = routes;