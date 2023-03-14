const asyncHandler = require('express-async-handler')

const details = asyncHandler(async (req, res)=>{
    res.json({
        success: true,
        message: 'Display user detail here'
    })
})

const updateProfile = asyncHandler(async (req, res)=>{
    //validate data

    res.json({
        success: true,
        message: 'User data updated'
    })
})

const deleteUserProfile = asyncHandler(async (req, res)=>{
    res.json({
        success: true,
    })
})

module.exports = {
    details
}