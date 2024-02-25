const { response } = require('express');
const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAll = (req, res) => {
    mongodb
        .getDb()
        .db()
        .collection('chefs')
        .find()
        .toArray((err, lists) => {
            if (err) {
                res.status(400).json({ message: err });
            }
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(lists);
    });
};

const getSingle = async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
      res.status(400).json('Must use a valid chef id to find a chef.');
    }
    const userId = new ObjectId(req.params.id);
    mongodb
        .getDb()
        .db()
        .collection('chefs')
        .find({ _id: userId })
        .toArray((err, lists) => {
            if (err) {
                res.status(400).json({message:err});
            }
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(lists[0]);
    });
};

const create = async (req, res, next) => {
    const chef = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        cuisine: req.body.cuisine,
        forHire: req.body.forHire,
        email: req.body.email,
        phone: req.body.phone,
    };
    const response = await mongodb.getDb().db().collection('chefs').insertOne(chef);
    if (response.acknowledged) {
        res.status(201).json(response);
    } else {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const update = async (req, res, next) => {
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid chef id to update a chef.');
    }
    const response = await mongodb.getDb().db().collection('chefs').updateOne(
        { _id: new ObjectId(req.params.id) }, 
        {
            $set: {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                cuisine: req.body.cuisine,
                forHire: req.body.forHire,
                email: req.body.email,
                phone: req.body.phone,
            },
        });
        if(response.modifiedCount > 0) {
            res.status(204).send();
        } else {
            res.status(500).json({ error: 'Internal Server Error' });
        }
};

const remove = async (req, res, next) => {
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid chef id to delete a chef.');
    }
    const result = await mongodb.getDb().db().collection('chefs').deleteOne(
        { _id: new ObjectId(req.params.id) }, true);

    if (result.deletedCount > 0 ) {
        res.status(200).send();
    } else {
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