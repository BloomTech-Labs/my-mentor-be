const db = require('../database/dbconfig.js');
 
module.exports = {
    getMentor,
    getMentorById,
    updateMentor,
    deleteMentor
};

function getMentor() {
    return db('mentor');
}

function getMentorById(id) {
    return db('mentor')
    .where({id})
    .first();
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