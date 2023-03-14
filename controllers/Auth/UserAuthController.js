const asyncHandler = require('express-async-handler')
const User = require('../../Models/User')
const bcrypt = require('bcrypt')
const generateAuthToken= require('../../utils/generateAuthToken')

/**
 * @desc Login a user with valid credentials
 * @route POST api/v1/auth/users/login
 * @access PUBLIC
 */
const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body
    if(!email || !password){
        res.status(422)
        throw new Error('make sure to provide email and password fields')
    } 

    const user = await User.findOne({email})

    //check password 
    if(!user || !bcrypt.compareSync(password, user.password)){
        res.status(401)
        throw new Error('Invalid credentials')
    }

    res.json({
        success: true,
        message: 'Login user',
        token: generateAuthToken(user._id)
    })
})

/**
 * @desc register a user
 * @route api/v1/auth/users/register
 * @access PUBLIC
 */
const register = asyncHandler(async (req, res) => {
    const { email, password } = req.body
    if (!email || !password) {
        res.status(422)
        throw new Error('email and password field required')
    }

    const emailTaken = await User.findOne({ email })

    if (emailTaken) {
        res.status(422)
        throw new Error('Email already taken')
    }
    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await User.create({ email, password:hashedPassword })

    if (user) {
        res.status(201).json({
            success: true,
            message: 'User registered',
        })
    } else {
        res.status(500)
        throw new Error('Failed to register user')
    }
})

module.exports = {
    login,
    register
}
