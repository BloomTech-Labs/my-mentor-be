
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
        users.string('title', 30)
        users.string('image')
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
        posts.string('image')
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
        users.string('image')
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
        posts.string('image')
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
    .createTable('Admin', users => {
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
    .createTable('conversation', conversation => {
        conversation.increments()
        conversation.string('user_1')
            .notNullable()
        conversation.string('user_2')
            .notNullable()
    })
    .createTable('messages', message => {
        message.increments()
        message.integer('conversation_id')
            .unsigned()
            .notNullable()
            .references('id')
            .inTable('conversation')
            .onDelete('RESTRICT')
            .onUpdate('CASCADE');
        message.string('user_to')
            .notNullable()
        message.string('user_from')
            .notNullable()
        message.string('body', 255)
        message.timestamps(true, true)
    })
};

exports.down = function(knex) {
    return knex.schema
        .dropTableIfExists('Messages')
        .dropTableIfExists('Conversation')
        .dropTableIfExists('Admin')
        .dropTableIfExists('mentorComments')
        .dropTableIfExists('mentorPosts')
        .dropTableIfExists('mentor')
        .dropTableIfExists('menteeComments')
        .dropTableIfExists('menteePosts')
        .dropTableIfExists('mentee');
};
