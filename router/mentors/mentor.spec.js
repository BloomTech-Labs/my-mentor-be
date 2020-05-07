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
const second_user_creds = {
    first_name: 'testinguser',
    last_name: 'testinguser',
    city: 'testing',
    state: 'testing',
    profession: 'testing',
    image: 'test',
    description: 'test',
    email: 'testing',
    password: 'testing'
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
const login = {
    email: 'test',
    password: 'test'
}
const log = {
    email: 'tester',
    password: 'tester'
}


beforeEach(async() => {
    await db('mentor').truncate;

})
describe('Mentor Tests', () => {
 
    it('Finding mentor tests', async () => {
        await knexCleaner.clean(db)
        expect(1).toBe(1)
    })
    
    it('Register mentor', async() => {
        const expectedStatusCode = 201;
        const res = await request(server)
            .post('/api/auth/register/mentor')
            .send(good_user_creds)
        expect(res.status).toBe(expectedStatusCode)
    })

    describe('GET api/mentor', () => {
        it('Returns all mentors', async() => {
            const expectedStatusCode = 200;
           let res = await request(server)
            .post('/api/auth/login/mentor')
            .send(login)
            token = res.body.token;
            let response = await request(server)
                .get('/api/mentor')
                .set('Authorization', token)
            expect(response.status).toBe(expectedStatusCode)
           
        })
        it('Returns a JSON', async() => {
            let res = await request(server)
            .post('/api/auth/login/mentor')
            .send(login)
            token = res.body.token;
            const response = await request(server)
                .get('/api/mentor')
                .set('Authorization', token)
            expect(response.type).toMatch(/json/)
        })
    })
    describe('GET api/mentor/:id', () => {
        it('Returns all mentors by ID', async() => {
            const expectedStatusCode = 200;
            let res = await request(server)
            .post('/api/auth/login/mentor')
            .send(login)
            token = res.body.token;
            const response = await request(server)
                .get('/api/mentor/1')
                .set('Authorization', token)
            expect(response.status).toBe(expectedStatusCode)
        })
        it('Returns a JSON', async() => {
            let res = await request(server)
            .post('/api/auth/login/mentor')
            .send(login)
            token = res.body.token;
            await request(server)
                .get('/api/mentor')
                .set('Content-Type', 'application/json')
                .set('Authorization', token)
                .expect('Content-Type', /json/)
        })
    })
    describe('PUT api/mentor/:id', () => {
        it('Modifies an existing mentor by ID', async() => {
            const expectedStatusCode = 201;
            let res = await request(server)
            .post('/api/auth/login/mentor')
            .send(login)
          
            const response = await request(server)
                .put('/api/mentor/1')
                .send(updated_user_creds)
                .set('Authorization', res.body.token)
                console.log(response.body)
            expect(response.status).toBe(expectedStatusCode)
        })
    })
    describe('DELETE /api/mentor/:id', () => {
        it('Deletes everything dependent on the mentor', async() => {
            const expectedStatusCode = 200;
              await request(server)
            .post('/api/auth/register/mentor')
            .send(second_user_creds)
     
            let res = await request(server)
            .post('/api/auth/login/mentor')
            .send({
                email: 'testing',
                password: 'testing'
            })
         
            const response = await request(server)
                .delete('/api/mentor/1')
                .set('Authorization', res.body.token)
            expect(response.status).toBe(expectedStatusCode)
        })
        it('Returns a JSON', async() => {
            let res = await request(server)
            .post('/api/auth/login/mentor')
            .send({
                email: 'testing',
                password: 'testing'
            })
            token = res.body.token
            const response = await request(server)
                .delete('/api/mentor/2')
                .set({Authorization: token})
                expect(response.type).toMatch(/json/)
        })
    })
})