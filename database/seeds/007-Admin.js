
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('Admin').del()
    .then(function () {
      // Inserts seed entries
      return knex('Admin').insert([
        {menteeID: 1, mentorID: 1}
      ]);
    });
};
