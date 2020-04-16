const router = require('express').Router();
const Users = require('./users-model.js');
const db = require('../database/dbconfig.js');

router.get('/', (req, res) => {
    Users.find()
        .then(users => {
            res.json(users);
        })
        .catch(err => res.send(err));
});

router.put('/:id', (req, res) => {

    const {id} = req.params;
    const changes = req.body;

    Users.findById(id)
        .then(user => {
            if (user) {
                Users.update(id, changes)
                    .then(updatedUser => {
                        res.status(200).json(updatedUser);
                    });
            } else {
                res.status(404).json({message: "Could not find user with the given id"});
            }
        })
        .catch(err => {
            res.status(500).json({message: "Failed to update user information"})
        })
})

router.delete('/:id', (req, res) => {
    const id = req.params.id;

    if (!id) {
        res.status(404).json({message: "User id not valid"})
    }
    Users.remove(id)
        .then(user => {
            res.json(user);
        })
        .catch(err => {
            res.status(500).json({message: "Not able to remove user"})
        })
})

module.exports = router;