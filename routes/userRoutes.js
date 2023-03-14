const router = require('express').Router()
const api_auth = require('../middlewares/authMiddleware')
const UserController = require('./../controllers/User/UserController')

/*** @route GET api/v1/users/details */
router.get('/details', api_auth, UserController.details)

module.exports = router