const db = require('../../database/dbconfig');

module.exports = {
    find,
    update,
    remove,
    findById
};

function find() {
    return db('users')
        // .select('id', 'username')
}

function update(id, user) {
    db('users')
        .where('id')
        .update(user)
    return findById(id);
}

function remove(id) {
    return db('users')
        .where({id})
        .del();
}

function findById(id) {
    return db('users')
        .where({id})
        .first();
}