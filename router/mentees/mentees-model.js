const db = require('../../database/dbconfig.js');

module.exports = {
    getMentees,
    getMentee,
    addMentee,
    updateMentee,
    deleteMentee,
    findMentee
};

function getMentees() {
    return db('mentee')
    .select('id', 'first_name', 'last_name', 'city', 'state', 'email', 'image', 'description');
};

function getMentee(id) {
    return db('mentee')
    .select('id', 'first_name', 'last_name', 'city', 'state', 'email', 'image', 'description')
    .where({id})
    .first();
};

function findMentee(filter) {
    return db('mentee')
    .where(filter);
};

 
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