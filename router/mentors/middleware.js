const db = require('./mentor-model')
module.exports = {
    validateUserId,
    validateUser
}
function validateUserId(req, res, next) {
    const id = req.params.id;
    db.getMentor(id)
    .then(id => {
        if(!id) {
            res.status(404).json({error: 'The specified ID does not exist'})
        } else {
            next();
        }
    })
}

function validateUser(req, res, next) {
    const data = req.body;
    if(!data){
        res.status(400).json({message: 'missing mentor data'})
    } else {
        next();
    }
}