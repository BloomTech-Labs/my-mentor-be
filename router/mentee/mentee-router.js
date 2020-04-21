const router = require('express').Router();
const Mentees = require('./mentee-model');

router.get('/', (req, res) => {
    Mentees.getMentees()
        .then(mentees => {
            res.json(mentees);
        })
        .catch(err => res.send(err));
});

router.put('/:id', (req, res) => {

    const {id} = req.params;
    const changes = req.body;

    Mentees.getMentee(id)
        .then(mentee => {
            if (mentee) {
                Mentees.updateMentee(id, changes)
                .then(updatedMentee => {
                    res.status(200).json(updatedMentee);
                });
            } else {
                res.status(404).json({message: "Sorry no Mentee with the given id"});
            }
        })
        .catch(err => {
            res.status(500).json({message: "Failed to update Mentee information"})
        })
})

router.delete('/:id', (req,res) => {
    
    const id = req.params.id;

    if (!id) {
        res.status(404).json({message: "Mentee id not valid"})
    }
    Mentees.deleteMentee(id)
        .then(mentee => {
            res.json(mentee)
        })
        .catch(err => {
            res.status(500).json({message: "Not able to delete mentee"})
        })
})

module.exports = router;