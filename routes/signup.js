const createUser = require('../controllers/createUser')

const route = require('express').Router()


route.post("/signup", createUser)



module.exports = route