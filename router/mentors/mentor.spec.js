const server = require('../../api/server');
const request = require('supertest');
const db = require('../../database/dbconfig');
const knexCleaner = require('knex-cleaner');
const Mentors = require('./mentor-model');

const good_user_creds = {
    first_name: 'testuser',
    last_name: 'testuser',
    city: 'test',
    state: 'test',
    profession: 'test',
    image: 'test',
    description: 'test',
    email: 'test',
    password: 'test'
}
const incomplete_creds = {
    first_name: 'testuser',
    last_name: 'testuser',
    city: 'test',
    state: 'test',
    profession: 'test',
    image: 'test',
    description: 'test',
    email: null,
    password: 'test'
}
beforeEach(async() => {
    await db('mentor').truncate;

})
describe('Mentor Tests', () => {
 
    it('Finding mentor tests', async () => {
        await knexCleaner.clean(db)
        expect(1).toBe(1)
    })
    
    describe('POST /mentor', () => {
        it('Register mentor with incomplete credentials', async() => {
            const expectedStatusCode = 500;
            let res = await request(server)
                .post('/api/mentor/')
                .send(incomplete_creds)
            expect(res.status).toBe(expectedStatusCode)
        })
        it('Register mentor', async() => {
            const expectedStatusCode = 201;
            const res = await request(server)
                .post('/api/mentor')
                .send(good_user_creds)
            expect(res.status).toBe(expectedStatusCode)
        })
        it('Registering with the same credentials, expecting failure', async() => {
            const expectedStatusCode = 500;
            const res = await request(server)
                .post('/api/mentor')
                .send(good_user_creds)
            expect(res.status).toBe(expectedStatusCode)
        })
    })

    describe('GET /mentor', () => {
        it('Returns all mentors', async() => {
            const expectedStatusCode = 200;
            const res = await request(server)
                .get('/api/mentor')
            expect(res.status).toBe(expectedStatusCode)
        })
        it('Returns a JSON', async() => {
            const res = await request(server)
                .get('/api/mentor')
            expect(res.type).toMatch(/json/)
        })
    })
    describe('GET /mentor/:id', () => {
        it('Returns all mentors by ID', async() => {
            const expectedStatusCode = 200;
            const res = await request(server)
                .get('/api/mentor/1')
            expect(res.status).toBe(expectedStatusCode)
        })
        it('Returns a JSON', async() => {
            const res = await request(server)
                .get('/api/mentor')
            expect(res.type).toMatch(/json/)
        })
    })
})