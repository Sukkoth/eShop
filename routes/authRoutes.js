const router = require('express').Router()
const UserAuthController = require('../controllers/Auth/UserAuthController')

/*** @route POST api/v1/auth/users/login */
router.post('/login', UserAuthController.login)

/*** @route POST api/v1/auth/users/register */
router.post('/register', UserAuthController.register)


// /user/auth/login

module.exports = router