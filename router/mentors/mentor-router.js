const router = require('express').Router();
const db = require('./mentor-model');
middleware = require('./middleware');



router.get('/', (req, res) => {
    db.getMentors()
    .then(mentors => {
        res.status(200).json(mentors)
    })
    .catch(err => {
        res.status(500).json(err);
        console.log(err);
    })
});

router.get('/:id', middleware.validateUserId, (req, res) => {
    const id = req.params.id;
    db.getMentor(id)
    .then(id => {
        res.status(200).json(id)
    })
    .catch(err => {
        res.status(500).json({errorMessage: 'Could not retrieve specified ID'})
    })
});

router.post('/', middleware.validateUser, (req, res) => {
    const body = req.body;
    db.addMentor(body)
    .then(user => {
        res.status(201).json(user)
    })
    .catch(err => {
        res.status(500).json(err)
    })
})

router.put('/:id',middleware.validateUser,middleware.validateUserId, (req,res) => {
    const id = req.params.id;
    const changes = req.body;
    db.updateMentor(id, changes)
    .then(update => {
        res.status(201).json(update)
    })
    .catch(err => {
        res.status(500).json(err)
    })
})

router.delete('/:id', middleware.validateUserId, (req, res) => {
    const id = req.params.id;
    db.deleteMentor(id)
    .then(user => {
        res.status(200).json(user)
    })
    .catch(err => {
        res.status(500).json(err)
    })
})

module.exports = router;