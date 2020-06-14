const db = require('../../database/dbconfig.js');

module.exports = {
    getAllConversation,
    addConversation,
    deleteConversation
}

function getAllConversation() {
    return db('conversation')
}

function addConversation(convo) {
    return db('conversation')
    insert(convo)
}

function deleteConversation(id) {
    return db('conversation')
    .where({id})
    .del()
}