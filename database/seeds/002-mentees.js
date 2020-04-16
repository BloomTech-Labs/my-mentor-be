
exports.seed = function(knex) {
    return knex('mentee').del()
      .then(function () {
        return knex('mentee').insert([
          {id: 1, first_name: 'Aaron', last_name: 'Smith', city: 'Atlanta', state: 'Georgia', password: 'password', email:'Aaron.Smith@email.com', image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=60', description: ''}
        ]);
      });
  };
  