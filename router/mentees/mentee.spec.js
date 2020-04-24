const server = require('../../api/server');
const request = require('supertest');
const db = require('../../database/dbconfig');
const knexCleaner = require('knex-cleaner');

const good_user_creds = {
    first_name: 'testuser',
    last_name: 'testuser',
    city: 'test',
    state: 'test',
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
    image: 'test',
    description: 'test',
    email: null,
    password: 'test'
}
const updated_user_creds = {
    first_name: 'testuser',
    last_name: 'testuser',
    city: 'tester',
    state: 'tester',
    image: 'tester',
    description: 'tester',
    email: 'tester',
    password: 'tester'
}

beforeEach(async() => {
    await db('mentee').truncate;
})
describe('Mentee Tests', () => {
    it('Finding mentee tests', async () => {
        await knexCleaner.clean(db)
        expect(1).toBe(1)
    })

    describe('POST /api/mentee', () => {
        it('Register mentee with incomplete credentials', async() => {
            const expectedStatusCode = 500;
            let res = await request(server)
                .post('/api/mentee')
                .send(incomplete_creds)
            expect(res.status).toBe(expectedStatusCode)
        })
        it('Register mentee', async() => {
            const expectedStatusCode = 201;
            const res = await request(server)
                .post('/api/mentee')
                .send(good_user_creds)
            expect(res.status).toBe(expectedStatusCode)
        })
        it('Registering with the same credentials, expecting failure', async() => {
            const expectedStatusCode = 500;
            const res = await request(server)
                .post('/api/mentee')
                .send(good_user_creds)
            expect(res.status).toBe(expectedStatusCode)
        })
    })
    describe('GET /api/mentee', () => {
        it('Returns all mentees', async() => {
            const expectedStatusCode = 200;
            const res = await request(server)
                .get('/api/mentee')
            expect(res.status).toBe(expectedStatusCode)
        })
        it('Returns a JSON', async() => {
            const res = await request(server)
                .get('/api/mentee')
            expect(res.type).toMatch(/json/) 
        })
    })
    describe('GET api/mentee/:id', () => {
        it('Returns all mentees by ID', async() => {
            const expectedStatusCode = 200;
            const res = await request(server)
                .get('/api/mentee/1')
            expect(res.status).toBe(expectedStatusCode)
        })
        it('Returns a JSON', async() => {
            const res = await request(server)
                .get('/api/mentee')
                .set('Content-Type', 'application/json')
                .expect('Content-Type', /json/)
        })
    })
})