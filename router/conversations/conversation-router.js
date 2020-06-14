const router = require('express').Router();
const db = require('./conversation-model');

router.get('/', (req, res) => {
    db.getAllConversation()
    .then(convo => {
        res.status(200).json(convo)
    })
    .catch(err => {
        res.status(500).json(err)
    })
})

router.post('/', (req, res) => {
    const body = req.body;
    db.addConversation(body)
    .then(convo => {
        res.status(201).json(convo)
    })
    .catch(err => {
        res.status(500).json(err)
    })
})

router.delete('/:id', (req, res) => {
    const {id} = req.params;
    db.deleteConversation(id)
    .then(convo => {
        res.status(200),json(convo)
    })
    .catch(err => {
        res.status(500).json(err)
    })
})

module.exports = router;