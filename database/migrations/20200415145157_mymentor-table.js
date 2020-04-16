
exports.up = function(knex) {
  return knex.schema
    .createTable('mentee', users => {
        users.increments();
        users.string('first_name', 25)
            .notNullable();
        users.string('last_name', 25)
            .notNullable();
        users.string('city', 25)
            .notNullable();
        users.string('state', 25)
            .notNullable();
        users.string('password', 20)
            .notNullable();
        users.string('email', 50)
            .notNullable()
            .unique();
        users.string('image', 255)
        users.string('description', 255);
    })
    .createTable('menteePosts', posts => {
        posts.increments();
        posts.integer('mentee_id')
            .unsigned()
            .notNullable()
            .references('id')
            .inTable('mentee')
            .onDelete('RESTRICT')
            .onUpdate('CASCADE');
        posts.string('image', 255)
        posts.string('description', 255)
        posts.timestamps(true, true)
    })
    .createTable('menteeComments', comments => {
        comments.increments();
        comments.integer('post_id')
            .unsigned()
            .notNullable()
            .references('id')
            .inTable('menteePosts')
            .onDelete('RESTRICT')
            .onUpdate('CASCADE');
        comments.string('message', 255)
            .notNullable()
        comments.timestamps(true, true)
    })
    .createTable('mentor', users => {
        users.increments();
        users.string('first_name', 25)
            .notNullable()
        users.string('last_name', 25)
            .notNullable()
        users.string('city', 25)
            .notNullable()
        users.string('state', 25)
            .notNullable()
        users.string('email', 50)
            .notNullable()
            .unique()
        users.string('password', 20)
            .notNullable()
        users.string('profession', 30)
            .notNullable()
        users.string('image', 255)
        users.string('description', 255)
    })
    .createTable('mentorPosts', posts => {
        posts.increments();
        posts.integer('mentor_id')
            .unsigned()
            .notNullable()
            .references('id')
            .inTable('mentor')
            .onDelete('RESTRICT')
            .onUpdate('CASCADE');
        posts.string('image', 255)
        posts.string('description', 255)
        posts.timestamps(true, true)
    })
    .createTable('mentorComments', comments => {
        comments.increments();
        comments.integer('post_id')
            .unsigned()
            .notNullable()
            .references('id')
            .inTable('mentorPosts')
            .onDelete('RESTRICT')
            .onUpdate('CASCADE');
        comments.string('message', 255)
            .notNullable()
        comments.timestamps(true, true)
    })
    .createTable('Users', users => {
        users.integer('menteeID')
            .unsigned()
            .notNullable()
            .references('id')
            .inTable('mentee')
            .onDelete('RESTRICT')
            .onUpdate('CASCADE');
        users.integer('mentorID')
            .unsigned()
            .notNullable()
            .references('id')
            .inTable('mentor')
            .onDelete('RESTRICT')
            .onUpdate('CASCADE');
    })
};

exports.down = function(knex) {
    return knex.schema
        .dropTableIfExists('Users')
        .dropTableIfExists('mentorComments')
        .dropTableIfExists('mentorPosts')
        .dropTableIfExists('mentor')
        .dropTableIfExists('menteeComments')
        .dropTableIfExists('menteePosts')
        .dropTableIfExists('mentee');
};
