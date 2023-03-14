const jwt = require('jsonwebtoken')
const { app_key } = require('../config/env')

const generateAuthToken = (id) => {
    const authToken = jwt.sign({id}, app_key, {
        expiresIn: '7d'
    })
    return authToken
}

module.exports = generateAuthToken

