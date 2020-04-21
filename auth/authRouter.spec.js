const request = require('supertest');
const server = require('../api/server');
const db = require('../database/dbconfig');
const User = require('../users/users-model');
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
         "Password": "AllDay",
         "email": "Captain@aol.com"
      });
      console.log(res.body);
      expect(res.type).toEqual('application/json');
      expect(res.status).toEqual(201);
   })
});
// ============================================================
beforeEach( async () => {
   await db ('mentee').truncate();
})