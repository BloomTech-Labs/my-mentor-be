
exports.seed = function(knex) {
  return knex('menteePosts').del()
    .then(function () {
      return knex('menteePosts').insert([
        {id: 1, mentee_id: 1, image: 'https://images.unsplash.com/photo-1558943518-5c3f12d9b46f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=60', description: 'Recieve my new IPhone spiral notebook in the mail. Can\'t wait to start some wireframes'},

      ]);
    });
};
