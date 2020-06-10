const db = require('../../database/dbconfig.js');
 
module.exports = {
    getMentors,
    getMentor,
    addMentor,
    updateMentor,
    deleteMentor,
    findMentor,
    getMentorsPost,
    getMentorPost,
    addMentorPost,
    updateMentorPost,
    deleteMentorPost
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
function getMentorsPost() {
    return db('mentorPosts as mp')
    .join('mentor as m','m.id' ,'mp.mentor_id')
    .select('m.first_name', 'm.last_name', 'mp.description', 'mp.mentor_id', "mp.id",'mp.image', 'm.city', 'm.state')
}

function getMentorPost(id) {
    return db('mentorPosts')
    .join('mentor', 'mentor.id','mentorPosts.mentor_id')
    .select('mentorPosts.*', 'mentor.first_name', 'mentor.last_name', 'mentor.city', 'mentor.state')
    .where({'mentor.id': id})
}

function addMentorPost(post) {
    return db('mentorPosts')
    .insert(post)
}

function updateMentorPost(id, changes) {
    return db('mentorPosts')
    .where({id})
    .update(changes)
}

function deleteMentorPost(id) {
    return db('mentorPosts')
    .where({id})
    .del();
}