const router = require('express').Router();
const db = require('./mentor-model');
middleware = require('./middleware');

//change to not show password and email
// GET mentor/
router.get('/', (req, res) => {
    db.getMentors()
    .then(mentors => {
        res.status(200).json(mentors)
    })
    .catch(err => {
        res.status(500).json(err)
    })
})


module.exports = router;