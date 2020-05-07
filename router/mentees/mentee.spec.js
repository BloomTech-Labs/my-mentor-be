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
const second_creds = {
    first_name: 'test',
    last_name: 'test',
    city: 'test',
    state: 'test',
    image: 'test',
    description: 'test',
    email: 'testing',
    password: 'test'
}

const updated_user_creds = {
    first_name: 'testuser',
    last_name: 'testuser',
    city: 'tester',
    state: 'tester',
    image: 'tester',
    description: 'tester',
    email: 'test',
    password: 'test'
}
const login ={
    email: 'test',
    password: 'test'
}

beforeEach(async() => {
    await db('mentee').truncate;
}) 
describe('Mentee Tests', () => {
    it('Finding mentee tests', async () => {
        await knexCleaner.clean(db)
        expect(1).toBe(1);
    })
    it('Register mentee', async() => {
        const expectedStatusCode = 201;
        const res = await request(server)
            .post('/api/auth/register/mentee')
            .send(good_user_creds)
        expect(res.status).toBe(expectedStatusCode)
    })

    describe('GET /api/mentee', () => {
        it('Returns all mentees', async() => {
            const expectedStatusCode = 200;
            let res = await request(server)
             .post('/api/auth/login/mentee')
             .send(login)
             token = res.body.token;
             let response = await request(server)
                 .get('/api/mentee')
                 .set('Authorization', token)
             expect(response.status).toBe(expectedStatusCode)
        })
        it('Returns a JSON', async() => {
            let res = await request(server)
            .post('/api/auth/login/mentee')
            .send(login)
            token = res.body.token;
            const response = await request(server)
                .get('/api/mentee')
                .set('Authorization', token)
            expect(response.type).toMatch(/json/)
        })
    })
    describe('GET api/mentee/:id', () => {
        it('Returns all mentees by ID', async() => {
            const expectedStatusCode = 200;
            let res = await request(server)
            .post('/api/auth/login/mentee')
            .send(login)
            token = res.body.token;
            const response = await request(server)
                .get('/api/mentee/1')
                .set('Authorization', token)
            expect(response.status).toBe(expectedStatusCode)
        })
        it('Returns a JSON', async() => {
            let res = await request(server)
            .post('/api/auth/login/mentee')
            .send(login)
            token = res.body.token;
            await request(server)
                .get('/api/mentee')
                .set('Content-Type', 'application/json')
                .set('Authorization', token)
                .expect('Content-Type', /json/)
        })
        it('Returns an error if mentee does not exist', async() => {
            const expectedStatusCode = 404;
            let res = await request(server)
            .post('/api/auth/login/mentee')
            .send(login)
            token = res.body.token;
            const response = await request(server)
                .get('/api/mentee/2')
                .set('Authorization', token)
            expect(response.status).toBe(expectedStatusCode)
        })
    })
    describe('PUT api/mentee/:id', () => {
        it('Modifies an existing mentee by ID', async() => {
            const expectedStatusCode = 200;
            const res = await request(server)
                 .post('/api/auth/login/mentee')
                 .send(login)
            token = res.body.token
            const response = await request(server)
                .put('/api/mentee/1')
                .send(updated_user_creds)
                .set('Authorization', token)
            expect(response.status).toBe(expectedStatusCode)
        })
    }) 
    describe('DELETE /api/mentee/:id', () => {
        it('Deletes everything dependent on the mentee', async() => {
            const expectedStatusCode = 200;
            await request(server)
            .post('/api/auth/register/mentee')
            .send(second_creds)
                const res = await request(server)
                 .post('/api/auth/login/mentee')
                 .send({   
                    email: 'testing',
                    password: 'test'
                })
                token = res.body.token
            const response = await request(server)
                .delete('/api/mentee/1')
                .set('Authorization', token)
            expect(response.status).toBe(expectedStatusCode)
        })
        it('Returns a JSON', async() => {
            let res = await request(server)
            .post('/api/auth/login/mentee')
            .send({
                email: 'testing',
                password: 'test'
            })
            token = res.body.token
            const response = await request(server)
                .delete('/api/mentee/2')
                .set({Authorization: token})
                expect(response.type).toMatch(/json/)
        })
    })
})