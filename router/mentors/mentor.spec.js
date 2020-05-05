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
const login = {
    email: 'test',
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
           let res = await request(server)
            .post('/api/auth/login/mentor')
            .send(login)
            token = res.body.token;
            console.log(token)
            let response = await request(server)
                .get('/api/mentor')
                .set('authorization', token)
            expect(response.status).toBe(expectedStatusCode)
           
        })
        // it('Returns a JSON', async() => {
        //     await request(server)
        //     .post('/api/auth/login/mentor')
        //     .send(login)
        //     token = res.body.token;
        //     const res = await request(server)
        //         .get('/api/mentor')
        //         .set('Authorization', token)
        //     expect(res.type).toMatch(/json/)
        // })
    })
    // describe('GET api/mentor/:id', () => {
    //     it('Returns all mentors by ID', async() => {
    //         const expectedStatusCode = 200;
    //         const res = await request(server)
    //             .get('/api/mentor/1')
    //             .set('Authorization', token)
    //         expect(res.status).toBe(expectedStatusCode)
    //     })
    //     it('Returns a JSON', async() => {
    //         const res = await request(server)
    //             .get('/api/mentor')
    //             .set('Content-Type', 'application/json')
    //             .set('Authorization', token)
    //             .expect('Content-Type', /json/)
    //     })
    // })
    // describe('PUT api/mentor/:id', () => {
    //     it('Modifies an existing mentor by ID', async() => {
    //         const expectedStatusCode = 201;
    //         const res = await request(server)
    //             .put('/api/mentor/1')
    //             .send(updated_user_creds)
    //             .set('Authorization', token)
    //         expect(res.status).toBe(expectedStatusCode)
    //     })
    //     it('Returns an error if mentor does not exist', async() => {
    //         const expectedStatusCode = 404;
    //         const res = await request(server)
    //             .put('/api/mentor/2')
    //             .send(updated_user_creds)
    //             .set('Authorization', token)
    //         expect(res.status).toBe(expectedStatusCode)
    //     })
    // })
    // describe('DELETE /api/mentor/:id', () => {
    //     it('Deletes everything dependent on the mentor', async() => {
    //         const expectedStatusCode = 200;
    //         const res = await request(server)
    //             .delete('/api/mentor/1')
    //             .set('Authorization', token)
    //         expect(res.status).toBe(expectedStatusCode)
    //     })
    //     it('Returns an error if mentor does not exist', async() => {
    //         const expectedStatusCode = 404;
    //         const res = await request(server)
    //             .delete('/api/mentor/2')
    //             .set('Authorization', token)
    //         expect(res.status).toBe(expectedStatusCode)
    //     })
    // })
})