const db = require('../../database/dbconfig');

module.exports = {
    find,
    update,
    remove,
    findById,
    add,
    findBy
};

function find() {
    return db('users')
        // .select('id', 'email')
}

function update(id, user) {
    db('users')
        .where('id')
        .update(user)
    return findById(id);
};

function remove(id) {
    return db('users')
        .where({id})
        .del();
};

function findById(id) {
    return db('users')
        .where({id})
        .first();
};

async function add(users) {
    const [id] = await db('users').insert(users);

    return findById(id);
};

function findBy(filter) {
    return db('users')
    .where(filter);
};
