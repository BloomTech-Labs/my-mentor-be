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
const updated_user_creds = {
    first_name: 'testuser',
    last_name: 'testuser',
    city: 'tester',
    state: 'tester',
    profession: 'tester',
    image: 'tester',
    description: 'tester',
    email: 'tester',
    password: 'tester'
}
token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vyc2lkIjoxLCJ1c2VycyI6InRlc3QiLCJpYXQiOjE1ODgxODg4OTEsImV4cCI6MTU4ODE5MjQ5MX0.V7o_BmJAkDqwtp9w2xFk4V98X5PM7F_XQVbNi4r8c2c"


beforeEach(async() => {
    await db('mentor').truncate;

})
describe('Mentor Tests', () => {
 
    it('Finding mentor tests', async () => {
        await knexCleaner.clean(db)
        expect(1).toBe(1)
    })
    
    describe('Registering a mentor', () => {
        it('Register mentor with incomplete credentials', async() => {
            const expectedStatusCode = 501;
            let res = await request(server)
                .post('/api/auth/register/mentor')
                .send(incomplete_creds)
            expect(res.status).toBe(expectedStatusCode)
        })
        it('Register mentor', async() => {
            const expectedStatusCode = 201;
            const res = await request(server)
                .post('/api/auth/register/mentor')
                .send(good_user_creds)
            expect(res.status).toBe(expectedStatusCode)
        })
        it('Registering with the same credentials, expecting failure', async() => {
            const expectedStatusCode = 501;
            const res = await request(server)
                .post('/api/auth/register/mentor')
                .send(good_user_creds)
            expect(res.status).toBe(expectedStatusCode)
        })
    })

    describe('GET api/mentor', () => {
        it('Returns all mentors', async() => {
            const expectedStatusCode = 200;
            const res = await request(server)
                .get('/api/mentor')
                .set('Authorization', token)
            expect(res.status).toBe(expectedStatusCode)
        })
        it('Returns a JSON', async() => {
            const res = await request(server)
                .get('/api/mentor')
                .set('Authorization', token)
            expect(res.type).toMatch(/json/)
        })
    })
    describe('GET api/mentor/:id', () => {
        it('Returns all mentors by ID', async() => {
            const expectedStatusCode = 200;
            const res = await request(server)
                .get('/api/mentor/1')
                .set('Authorization', token)
            expect(res.status).toBe(expectedStatusCode)
        })
        it('Returns a JSON', async() => {
            const res = await request(server)
                .get('/api/mentor')
                .set('Content-Type', 'application/json')
                .set('Authorization', token)
                .expect('Content-Type', /json/)
        })
    })
    describe('PUT api/mentor/:id', () => {
        it('Modifies an existing mentor by ID', async() => {
            const expectedStatusCode = 201;
            const res = await request(server)
                .put('/api/mentor/1')
                .send(updated_user_creds)
                .set('Authorization', token)
            expect(res.status).toBe(expectedStatusCode)
        })
        it('Returns an error if mentor does not exist', async() => {
            const expectedStatusCode = 404;
            const res = await request(server)
                .put('/api/mentor/2')
                .send(updated_user_creds)
                .set('Authorization', token)
            expect(res.status).toBe(expectedStatusCode)
        })
    })
    describe('DELETE /api/mentor/:id', () => {
        it('Deletes everything dependent on the mentor', async() => {
            const expectedStatusCode = 200;
            const res = await request(server)
                .delete('/api/mentor/1')
                .set('Authorization', token)
            expect(res.status).toBe(expectedStatusCode)
        })
        it('Returns an error if mentor does not exist', async() => {
            const expectedStatusCode = 404;
            const res = await request(server)
                .delete('/api/mentor/2')
                .set('Authorization', token)
            expect(res.status).toBe(expectedStatusCode)
        })
    })
})