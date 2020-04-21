const db = require('../../database/dbconfig.js');

module.exports = {
    getMentees,
    getMentee,
    addMentee,
    updateMentee,
    deleteMentee
};

function getMentees() {
    return db('mentee')
    .select('first_name', 'last_name', 'city', 'state', 'profession', 'image', 'description', 'email');
};

function getMentee(id) {
    return db('mentee')
    .select('first_name', 'last_name', 'city', 'state', 'profession', 'image', 'description', 'email')
    .where({id})
    .first();
}

 
function addMentee(user) {
    return db('mentee')
    .insert(user)
}

function updateMentee(id, changes) {
    return db('mentee')
    .where({id})
    .update(changes);
}

function deleteMentee(id) {
    return db('mentee')
    .where({id})
    .del();
}