const db = require('../../database/dbconfig.js');

module.exports = {
    getMentees,
    getMentee,
    addMentee,
    updateMentee,
    deleteMentee,
    findMentee,
    getMenteesPost,
    getMenteePost,
    addMenteePost,
    updateMenteePost,
    deleteMenteePost
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

function getMenteesPost() {
    return db('menteePosts as mp')
    .join('mentee as m','m.id' ,'mp.mentee_id')
    .select('m.first_name', 'm.last_name', 'mp.description', 'mp.mentee_id', "m.id",'mp.image', 'm.city', 'm.state')
}

function getMenteePost(id) {
    return db('menteePosts')
    .join('mentee', 'mentee.id','menteePosts.mentee_id')
    .select('menteePosts.*', 'mentee.first_name', 'mentee.last_name', 'mentee.city', 'mentee.state')
    .where({'mentee.id': id})
}

function addMenteePost(post) {
    return db('menteePosts')
    .insert(post)
}

function updateMenteePost(id, changes) {
    return db('menteePosts')
    .where({id})
    .update(changes)
}

function deleteMenteePost(id) {
    return db('menteePosts')
    .where({id})
    .del();
}