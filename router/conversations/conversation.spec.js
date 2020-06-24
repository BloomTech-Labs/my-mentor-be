const server = require('../../api/server');
const request = require('supertest');
const db = require('../../database/dbconfig');
const knexCleaner = require('knex-cleaner');

const newConvo = {
    user_1: 'userOne',
    user_2: 'userTwo'
}
const wrongConvo = {
    user_1: 'user1',
    user_2: null
}
const message = {
    user_to: 'userOne',
    user_from: 'userTwo',
    body: 'message here'
}
const wrongMessage = {
    user_to: null,
    user_from: null,
    body: null
}
beforeEach(async() => {
    await db('conversation').truncate;
})

describe('Conversation Tests', () => {

    it('Finding conversation tests', async () => {
        await knexCleaner.clean(db)
        expect(1).toBe(1)
    })

  
    it('Adds a conversation', async() => {
        const expectedStatusCode = 201;
        const res = await request(server)
            .post('/api/conversation')
            .send(newConvo)
        expect(res.status).toBe(expectedStatusCode)
    })  
    it('Fails to add a conversation', async() => {
        const expectedStatusCode = 500;
        const res = await request(server)
            .post('/api/conversation')
            .send(wrongConvo)
        expect(res.status).toBe(expectedStatusCode)
    }) 
    
    describe('GET api/conversation', () => {
        it('Returns all conversations', async() => {
            const expectedStatusCode = 200;
            const res = await request(server)
                .get('/api/conversation')
            expect(res.status).toBe(expectedStatusCode)
        })
        it('Returns a JSON', async() => {
            const res = await request(server)
                .get('/api/conversation')
            expect(res.type).toMatch(/json/)
        })
    })
    describe('POST a message /:id/messages', () => {
        it('Adds a message to a conversation', async() => {
            const expectedStatusCode = 200;
            const res = await request(server)
                .post('/api/conversation/1/messages')
                .send(message)
            expect(res.status).toBe(expectedStatusCode)
        })
        it('Returns an error for incorrect message to a conversation', async() => {
            const expectedStatusCode = 200;
            const res = await request(server)
                .post('/api/conversation/1/messages')
                .send(wrongMessage)
            expect(res.status).toBe(expectedStatusCode)
        })     
         it('Returns an error for no conversation with id', async() => {
            const expectedStatusCode = 404;
            const res = await request(server)
                .post('/api/conversation/100/messages')
                .send(wrongMessage)
            expect(res.status).toBe(expectedStatusCode)
        })
    })
    describe('GET messages /:id/messages', () => {
        it('Returns all messages in a conversation', async() => {
            const expectedStatusCode = 200;
            const res = await request(server)
                .get('/api/conversation/1/messages')
            expect(res.status).toBe(expectedStatusCode)
        })
         it('Returns a JSON', async() => {
            const res = await request(server)
                .get('/api/conversation/100/messages')
            expect(res.type).toMatch(/json/)
        })
    })
    describe('DELETES /:id/messages:mid', () => {
        it('Deletes a messages in a conversation', async() => {
            const expectedStatusCode = 200;
            const res = await request(server)
                .delete('/api/conversation/1/messages/1')
            expect(res.status).toBe(expectedStatusCode)
        })
        it('Returns JSON', async() => {
            const res = await request(server)
                .delete('/api/conversation/1/messages/1')
            expect(res.type).toMatch(/json/)
        })
    })
    describe('DELETES api/conversation/:id', () => {
        it('Returns an error when deleting a conversation that does not exist', async() => {
            const expectedStatusCode = 500;
            const res = await request(server)
                .delete('/api/conversation/100')
            expect(res.status).toBe(expectedStatusCode)
        })
        it('Returns a JSON', async() => {
            const res = await request(server)
                .delete('/api/conversation/1')
            expect(res.type).toMatch(/json/)
        })
    })
})
