const request = require('supertest');
const server = require('../api/server');
const db = require('../database/dbconfig');
const Mentor = require('../router/mentors/mentor-model');
const Mentee = require('../router/mentees/mentees-model')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

//======= Function to create a User and test my middleware ===
async function createMentor(email, password) {
  const mentor = {
    email: email,
    password: bcrypt.hashSync(password, 8)
  };
  await Mentor.addMentor(mentor)
}
// ==================== genToken ==============================
function genToken(user) {
  const payload = {
    userid: user.id,
    email: user.email,

    roles: ['mentor', 'mentee']
  };

  const options = { expiresIn: '1h' };
  const token = jwt.sign(payload, secrets.jwtSecret, options);

  return token;
}
// ============= Mentor Register Test =================================
describe('should register a new mentor', () => {
   it('should return a JSON', async () => {
      const res = await request(server).post('/api/auth/register/mentor')
      .send({
         "first_name": "Natasha",
         "last_name": "Romanoff",
         "city": "Budapest",
         "state": "Hungary",
         "password": "spider",
         "email": "widow@aol.com",
         "profession": "spy"
      });
      console.log(res.body);
      expect(res.type).toEqual('application/json');
      expect(res.status).toEqual(201);
   })
});
// ================= Mentor Login Test ================================
describe('POST /login', () => {
  it('should accept valid credentials', async () => {
      await createMentor("Hawkeye","arrow");
      const res = await request(server).post('/api/auth/login/mentor')
      .send({
          "email": "Hawkeye@gmail.com",
          "password": "arrow"
      });
      console.log(res.body);
      expect(res.type).toEqual('application/json');
      expect(res.status).toEqual(200);
  });
}); 

// ================= Mentee Register Test ================================
describe('should register a new mentee', () => {
  it('should return a JSON', async () => {
     const res = await request(server).post('/api/auth/register/mentee')
     .send({
      "first_name": "James",
      "last_name": "Buchanan",
      "city": "Brooklyn",
      "state": "New York",
      "password": "bucky",
      "email": "Wintersoldier@aol.com",
     });
     console.log(res.body);
     expect(res.type).toEqual('application/json');
     expect(res.status).toEqual(201);
  })
});
// ============================================================================
beforeEach( async () => {
   await db ('mentor', 'mentee').truncate();
});

