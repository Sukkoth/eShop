const adminMiddleware = (req, res, next) => {
    if (!req.authUser) {
        res.status(401)
        throw new Error('User login required')
    }

    if(req.authUser.isAdmin) next()
    else{
        res.status(401)
        throw new Error('Access Denied')
    }
}

module.exports = adminMiddleware