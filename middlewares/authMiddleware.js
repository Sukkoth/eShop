const asyncHandler = require('express-async-handler')
const jwt = require('jsonwebtoken')
const User = require('../Models/User')

const api_auth = asyncHandler(async (req, res, next) => {
    if (!(req.headers.authorization && req.headers.authorization.startsWith('Bearer'))) {
        res.status(401)
        throw new Error('No auth token provided')
    }

    const token = req.headers.authorization.split(' ')[1]

    const decodedId = jwt.decode(token).id
    const authUser = await User.findById(decodedId)

    if (authUser) {
        if (!authUser.isBlocked) {
            req.authUser = authUser
            next()
        }else{
            res.status(401)
            throw new Error('User account blocked, contact system Admin')
        }
    }
    else {
        res.status(401)
        throw new Error('User not found')
    }
})


module.exports = api_auth