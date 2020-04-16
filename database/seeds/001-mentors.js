
exports.seed = function(knex) {
    return knex('mentor').del()
      .then(function () {
        return knex('mentor').insert([
          {id: 1, first_name: 'Jane', last_name: 'Doe', city: 'Queens', state: 'New York', email: 'janedoe@email.com', password: 'janedoe', profession: 'UX Designer', image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=60', description: 'Hello, my name is Jane Doe. I\'m a UX Designer from New York, and have been in the industry for over 6 years. I specialize in Graphic Design and am passionate about sharing everything that I \'ve learned on my journey over the last 6 years.Ultimately, my goal is to help teach you everything about designing.'},
          {id: 2, first_name: 'Lucy', last_name: 'Lee', city: 'Atlanta', state: 'Georgia', email: 'lucylee@gmail.com', password: 'lucylee', profession: 'Graphic Designer', image: 'https://images.unsplash.com/photo-1541779408-c355f91b42c9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=60', description: ''},
          {id: 3, first_name: 'Zac', last_name: 'Burns', city: 'Bronx', state: 'New York', email: 'zacburns@email.com', password: 'zacburns', profession: 'UX Designer', image: 'https://images.unsplash.com/photo-1525748822304-6807cb1348ab?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=60', description: ''}
        ]);
      });
  };
  