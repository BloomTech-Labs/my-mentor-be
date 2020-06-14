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
//conversation/:id/messages
router.get('/:id/messages', (req, res) => {
    const {id} = req.params;
    db.getMessages(id)
    .then(message => {
        res.status(200).json(message)
    })
    .catch(err => {
        res.status(500).json(err)
    })
})


router.post('/:id/messages', (req, res) => {
    const {id} = req.params;
    const body = req.body;
    conversation_id = id;
    body.conversation_id = conversation_id
    db.findConversation(id)
    .then(convo => {
        if (convo) {
            db.addMessage(body)
            .then(addMessage => {
                res.status(200).json(addMessage);
            })
            .catch(err => res.send(err))
        } else {
            res.status(404).json({message: 'no conversation with the given id'})
        }
    })
    .catch(err => {
        res.status(500).json({message: "Failed to add the message."})
    })
})

router.delete('/:id/messages/:mid', (req, res) => {
    const {id} = req.params;
    const {mid} = req.params;

    let deleted = req.body;
    conversation_id = id;
    deleted.conversation_id = conversation_id;

    db.deleteMessage(mid)
    .then(deleted => {
        if (deleted) {
            res.status(200).json({removed: deleted})
        } else {
            res.status(404).json({error: 'Could not find message with that id.'})
        }
    })
    .catch(err => {
        res.status(500).json(err)
    })
})
module.exports = router;