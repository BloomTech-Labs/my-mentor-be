const request = require('supertest');
const server = require('../../api/server.js');
const db = require('../../database/dbconfig.js');
const Mentor = require('../mentors/mentor-model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// ============================================================
describe('should register a new user', () => {
   it('should return a JSON', async () => {
      const res = await request(server).post('/api/auth/register')
      .send({
         "first_name": "Steve",
         "last_name": "Rogers",
         "city": "Brooklyn",
         "state": "New York",
         "password": "AllDay",
         "email": "Captain@aol.com",
         "profession": "boxer"
      });
      console.log(res.body);
      expect(res.type).toEqual('application/json');
      expect(res.status).toEqual(201);
   })
});
// ============================================================
beforeEach( async () => {
   await db ('mentor').truncate();
})