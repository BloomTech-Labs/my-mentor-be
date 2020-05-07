const db = require('../../database/dbconfig.js');
 
module.exports = {
    getMentors,
    getMentor,
    addMentor,
    updateMentor,
    deleteMentor,
    findMentor,
    findByMentorId
};

function getMentors() {
    return db('mentor')
    .select('id', 'first_name', 'last_name', 'city', 'state', 'profession', 'image', 'description', 'email');
}

function getMentor(id) {
    return db('mentor')
    .select('id', 'first_name', 'last_name', 'city', 'state', 'profession', 'image', 'description', 'email')
    .where({id})
    .first();
}

function findMentor(filter) {
    return db('mentor')
    .where(filter);
}

 
async function addMentor(mentor) {
    const [id] = await db('mentor').insert(mentor);

    return findByMentorId(id);
}

function findByMentorId(id) {
    return db('mentor')
        .where({ id })
        .first();
};

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