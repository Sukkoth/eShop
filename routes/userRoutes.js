const router = require('express').Router()
const api_auth = require('../middlewares/authMiddleware')
const UserController = require('./../controllers/User/UserController')

/*** @route GET api/v1/users/details */
router.get('/profile', api_auth, UserController.details)

/*** @route PUT api/v1/users/profile */
router.put('/profile', api_auth, UserController.updateProfile)

/*** @route DELETE api/v1/users/profile */
router.delete('/profile', api_auth, UserController.deleteUserProfile)

module.exports = router