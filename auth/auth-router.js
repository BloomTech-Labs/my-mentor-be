const router = require('express').Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const secrets = require('../config/secret');
const Users = require('../users/users-model');
// ======================================================================
router.post('/register', (req,res) => {
  let data = req.body;
  const hash = bcrypt.hashSync(data.password,12);
  data.password = hash;

  Users.add(data)
    .then(saved => {
      const token = genToken(saved);
      res.status(201).json({ created_user: saved, token: token });
    })
    .catch(error => {
      console.log(error);
      res.status(501).json(error);
    });
});
// ====================================================================
router.post('/login', (req,res) => {
  // I am not showing "username" in the tables. So i am using Email for now
  const { email, password } = req.body;

  Users.findBy({ email })
    .first()
    .then(log => {
      if (log && bcrypt.compareSync(password, log.password)) {
        const token = genToken(log);
          res.status(200).json({ email: log.email, token: token });
      } else {
        res.status(401).json({ message: 'Invalid Credentials '});
      }
    })
    .catch (err => {
      console.log(err);
      res.status(500).json({ message: 'user error', err });
    });
});
// ==========================================================================================
function genToken(user) {
  const payload = {
    usersid: users.id,
    users: users.email
  };
  
  const options = { expiresIn: '1h' };
  const token = jwt.sign(payload, secrets.jwtSecret, options);

  return token;
}
// ==========================================================================================
module.exports = router;