// Require `checkUsernameFree`, `checkUsernameExists` and `checkPasswordLength`
// middleware functions from `auth-middleware.js`. You will need them here!


/**
  2 [POST] /api/auth/login { "username": "sue", "password": "1234" }

  response:
  status 200
  {
    "message": "Welcome sue!"
  }

  response on invalid credentials:
  status 401
  {
    "message": "Invalid credentials"
  }
 */


/**
  3 [GET] /api/auth/logout

  response for logged-in users:
  status 200
  {
    "message": "logged out"
  }

  response for not-logged-in users:
  status 200
  {
    "message": "no session"
  }
 */


const express = require('express')
const router = express.Router()
const { checkPasswordLength, checkUsernameExists, checkUsernameFree } = require('./auth-middleware')
const User = require('../users/users-model')
const bcrypt = require('bcryptjs')



router.post('/register', checkPasswordLength, checkUsernameFree, async (req, res, next) => {
  try {
    const { username, password } = req.body
    const hash = bcrypt.hashSync(password, 10)

    const newUser = await User.add({ username: username, password: hash })
    res.status(201).json(newUser)
  }
  catch (err) {
    next(err)
  }
})


router.post('/login',checkUsernameExists, (req, res) => {
  const { username, password } = req.body
  
  if (bcrypt.compareSync(password, req.user.password)) {
    req.session.user = req.user
    res.status(200).json({message: `welcome ${username}`})
  } else {
    res.status(401).json({message: 'invalid credentials'})
  }
})

router.get('/logout', (req, res) => {})



module.exports = router