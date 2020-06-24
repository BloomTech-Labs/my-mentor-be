// const db = require('../../database/dbconfig.js');

// module.exports = {
//     getMessages, 
//     getMessage,
//     addMessage,
//     deleteMessage
// };

// function getMessages() {
//     return db('messages as m')
// }

// function getMessage(id){
//     return db('messages')
//     .where({id})
//     .first();
// }

// function addMessage(message) {
//     return db('messages')
//     .insert(message);
// }

// function deleteMessage(id) {
//     return db('messages')
//     .where({id})
//     .del();
// }