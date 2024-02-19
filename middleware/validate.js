const validator = require('../helpers/validate');

const saveRecipe = (req, res, next) => {
    const validationRule = {
        title: 'required|string',
        ingredients: 'required|string',
        directions: 'required|string',
        cuisine: 'string',
        chef: 'string',
        creation: 'string'
    };
    validator(req.body, validationRule, {}, (err, status) => {
        if (!status) {
            res.status(412).send({
                success: false,
                message: 'Validation failed',
                data: err
            });
        } else {
            next();
        }
    });
};

module.exports = {
    saveRecipe
};