
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('messages').del()
    .then(function () {
      // Inserts seed entries
      return knex('messages').insert([
        {id: 1, conversation_id: 1, user_to: 'Aaron', user_from: 'Jane', body: 'Hey Aaron, thanks for the call yesterday. So pleased that you found the topics we covered useful. Looking forward to seeing what you create.'},
        {id: 2, conversation_id: 1, user_to: 'Jane', user_from: 'Aaron', body: 'Thanks, will do! Figma looks awesome.'}
      ]);
    });
};
