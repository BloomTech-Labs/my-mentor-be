const db = require('../../database/dbconfig.js');
 
module.exports = {
    getMentors,
    getMentor,
    addMentor,
    updateMentor,
    deleteMentor
};

function getMentors() {
    return db('mentor')
    .select('first_name', 'last_name', 'city', 'state', 'profession', 'image', 'description', 'email');
}

function getMentor(id) {
    return db('mentor')
    .select('first_name', 'last_name', 'city', 'state', 'profession', 'image', 'description', 'email')
    .where({id})
    .first();
}

//these down will need authentication 
function addMentor(user) {
    return db('mentor')
    .insert(user)
}

function updateMentor(id, changes) {
    return db('mentor')
    .where({id})
    .update(changes);
}

function deleteMentor(id) {
    return db('mentor')
    .where({id})
    .del();
}