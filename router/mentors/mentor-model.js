const db = require('../database/dbconfig.js');
 
module.exports = {
    getMentors,
    getMentor,
    addMentor,
    updateMentor,
    deleteMentor
};

function getMentors() {
    return db('mentor');
}

function getMentor(id) {
    return db('mentor')
    .where({id})
    .first();
}

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