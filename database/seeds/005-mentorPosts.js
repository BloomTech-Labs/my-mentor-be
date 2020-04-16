
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('mentorPosts').del()
    .then(function () {
      // Inserts seed entries
      return knex('mentorPosts').insert([
        {id: 1, mentor_id: 1, image: 'https://images.unsplash.com/photo-1576153192396-180ecef2a715?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=60', description: 'Useful tips for planning a wireframe'}
      ]);
    });
};
