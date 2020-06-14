const db = require('../../database/dbconfig.js');

module.exports = {
    getAllConversation,
    findConversation,
    addConversation,
    deleteConversation,
    getMessages,
    addMessage,
    deleteMessage
}

function getAllConversation() {
    return db('conversation')
}

function findConversation(id) {
    return db('conversation')
    .where({id})
    .first()
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

function getMessages(id) {
    return db('messages as m')
    .join('conversation as c', 'c.id', 'm.conversation_id')
    .select('m.*')
    .where({'c.id': id})
}


function addMessage(message) {
    return db('messages')
    .insert(message);
}

function deleteMessage(id) {
    return db('messages')
    .where({id})
    .del();
}