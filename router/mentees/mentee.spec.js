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
token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc2lkIjoxLCJ1c2VycyI6InRlc3QiLCJpYXQiOjE1ODgxODAzNDMsImV4cCI6MTU4ODE4Mzk0M30.v6zHZxjd2jRmqBprhWDDbmST0BnZnnsvD-CyVjEdnQQ'

beforeEach(async() => {
    await db('mentee').truncate;
}) 
describe('Mentee Tests', () => {
    it('Finding mentee tests', async () => {
        await knexCleaner.clean(db)
        expect(1).toBe(1);
    })

    describe('POST /api/mentee', () => {
        it('Register mentee with incomplete credentials', async() => {
            const expectedStatusCode = 501;
            let res = await request(server)
                .post('/api/auth/register/mentee')
                .send(incomplete_creds)
            expect(res.status).toBe(expectedStatusCode)
        })
        it('Register mentee', async() => {
            const expectedStatusCode = 201;
            const res = await request(server)
                .post('/api/auth/register/mentee')
                .send(good_user_creds)
            expect(res.status).toBe(expectedStatusCode)
        })
        it('Registering with the same credentials, expecting failure', async() => {
            const expectedStatusCode = 501;
            const res = await request(server)
                .post('/api/auth/register/mentee')
                .send(good_user_creds)
            expect(res.status).toBe(expectedStatusCode)
        })
    })

    describe('GET /api/mentee', () => {
        it('Returns all mentees', async() => {
            const expectedStatusCode = 200;
            const res = await request(server)
                .get('/api/mentee')
                .set('Authorization', token)
            expect(res.status).toBe(expectedStatusCode)
        })
        it('Returns a JSON', async() => {
            const res = await request(server)
                .get('/api/mentee')
                .set('Authorization', token)
            expect(res.type).toMatch(/json/) 
        })
    })
    describe('GET api/mentee/:id', () => {
        it('Returns all mentees by ID', async() => {
            const expectedStatusCode = 200;
            const res = await request(server)
                .get('/api/mentee/1')
                .set('Authorization', token)
            expect(res.status).toBe(expectedStatusCode)
        })
        it('Returns a JSON', async() => {
            const res = await request(server)
                .get('/api/mentee')
                .set('Authorization', token)
                .set('Content-Type', 'application/json')
                .expect('Content-Type', /json/)
        })
        it('Returns an error if mentee does not exist', async() => {
            const expectedStatusCode = 404;
            const res = await request(server)
                .get('/api/mentee/2')
                .set('Authorization', token)
            expect(res.status).toBe(expectedStatusCode)
        })
    })
    describe('PUT api/mentee/:id', () => {
        it('Modifies an existing mentee by ID', async() => {
            const expectedStatusCode = 200;
            const res = await request(server)
                .put('/api/mentee/1')
                .send(updated_user_creds)
                .set('Authorization', token)
            expect(res.status).toBe(expectedStatusCode)
        })
        it('Returns an error if mentee does not exist', async() => {
            const expectedStatusCode = 404;
            const res = await request(server)
                .put('/api/mentee/2')
                .send(updated_user_creds)
                .set('Authorization', token)
            expect(res.status).toBe(expectedStatusCode)
        })
    })
    describe('DELETE /api/mentee/:id', () => {
        it('Deletes everything dependent on the mentee', async() => {
            const expectedStatusCode = 200;
            const res = await request(server)
                .delete('/api/mentee/1')
                .set('Authorization', token)
            expect(res.status).toBe(expectedStatusCode)
        })
        it('Returns an error if mentee does not exist', async() => {
            const expectedStatusCode = 404;
            const res = await request(server)
                .delete('/api/mentee/5')
                .set('Authorization', token)
            expect(res.status).toBe(expectedStatusCode)
        })
    })
})