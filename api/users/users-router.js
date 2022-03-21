// Require the `restricted` middleware from `auth-middleware.js`. You will need it here!
const {restricted} = require('../auth/auth-middleware')

const express = require('express')
const router = express.Router()
const Users = require('./users-model')


router.get('/', restricted, (req, res, next) => {
  Users.find()
    .then(user => {
    res.status(200).json(user)
    })
  .catch(next)
})


module.exports = router
// Don't forget to add the router to the `exports` object so it can be required in other modules
