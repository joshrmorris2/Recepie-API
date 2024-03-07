const validator = require('../helpers/validate');

const saveRecipe = (req, res, next) => {
    const validationRule = {
        title: 'required|string',
        ingredients: 'required|string',
        directions: 'required|string',
        cuisine: 'string',
        chef: 'string',
        creation: 'string',
        locked: 'boolean'
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

const saveChef = (req, res, next) => {
    const validationRule = {
        firstName: 'required|string',
        lastName: 'required|string',
        cuisine: 'string',
        forHire: 'boolean',
        email: 'email',
        phone: 'required_if:forHire=true, integer',
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
    saveRecipe,
    saveChef
};