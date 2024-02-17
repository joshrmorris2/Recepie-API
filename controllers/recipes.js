const { response } = require('express');
const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAll = (req, res) => {
    try {
        mongodb
        .getDb()
        .db()
        .collection('contacts')
        .find()
        .toArray((err, lists) => {
            if (err) {
                res.status(400).json({message: err});
            }
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(lists);
        });
    } catch {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const getSingle = async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
      res.status(400).json('Must use a valid recipe id to find a recipe.');
    }
    try {
        const userId = new ObjectId(req.params.id);
        mongodb
            .getDb()
            .db()
            .collection('contacts')
            .find({ _id: userId })
            .toArray((err, lists) => {
            if (err) {
                res.status(400).json({message:err});
            }
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(lists[0]);
            });
    } catch {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const create = async (req, res, next) => {
    try {
        const recipe = {
            title: req.body.title,
            ingredients: req.body.ingredients,
            directions: req.body.directions,
            cuisine: req.body.cuisine,
            chef: req.body.chef,
            creation: req.body.creation,
        };
        const response = await mongodb.getDb().db().collection('recipes').insertOne(recipe);
        if (response.acknowledged) {
            res.status(201).json(response);
        } else {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const update = async (req, res, next) => {
    try {
        if (!ObjectId.isValid(req.params.id)) {
          res.status(400).json('Must use a valid recipe id to update a recipe.');
        }
        const response = await mongodb.getDb().db().collection('recipes').updateOne(
            { _id: new ObjectId(req.params.id) }, 
            {
                $set: {
                    title: req.body.title,
                    ingredients: req.body.ingredients,
                    directions: req.body.directions,
                    cuisine: req.body.cuisine,
                    chef: req.body.chef,
                    creation: req.body.creation,
                },
            });
            if(response.modifiedCount > 0) {
                res.status(204).send();
            } else {
                res.status(500).json({ error: 'Internal Server Error' });
            }
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error'});
    }
};

const remove = async (req, res, next) => {
    try {
        if (!ObjectId.isValid(req.params.id)) {
          res.status(400).json('Must use a valid recipe id to delete a recipe.');
        }
        const result = await mongodb.getDb().db().collection('recipes').deleteOne(
            { _id: new ObjectId(req.params.id) }, true);

        if (result.deletedCount > 0 ) {
            res.status(200).send();
        } else {
            res.status(500).json({ error: 'Internal Server Error' });
        }

    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


module.exports = {
    getAll,
    getSingle,
    create,
    update,
    remove
};