const asyncHandler = require('express-async-handler')
const User = require('../../Models/User')
/**
 * @desc display user daetails to the user itself
 * @route GET api/v1/users/profile
 * @access User/Auth
 */
const details = asyncHandler(async (req, res)=>{
    res.json({
        success: true,
        data: {
            user: req.authUser
        }
    })
})

/**
 * @desc update user details
 * @route PUT api/v1/users/profile
 * @access User/Auth
 */
const updateProfile = asyncHandler(async (req, res)=>{
    if(!req.body.email){
        res.status(422)
        throw new Error('email field is required')
    }
   
    const updatedInfo = await User.findByIdAndUpdate(req.authUser._id, req.body, {new:true}).select('-password')

    res.json({
        success: true,
        message: 'User data updated',
        data: {
            user: updatedInfo
        }
    })
})

const deleteUserProfile = asyncHandler(async (req, res)=>{
    const deletedUser = await User.findByIdAndDelete(req.authUser._id)
    res.json({
        success: true,
        message: 'User data deleted Successfully',
        id: deletedUser._id
    })
})

module.exports = {
    details,
    updateProfile,
    deleteUserProfile
}