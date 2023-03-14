const { app_env } = require('../config/env')

const errorHandler = (err, req, res, next) => {

    if(err){
        var statusCode = null
        if(!res.statusCode || (res.statusCode == 200))
            statusCode =  500
        else statusCode = res.statusCode
        res.status(statusCode).json({
            error: true,
            message: err.message,
            stack: app_env === 'live' ? null : err.stack
        })
    }
}

module.exports = errorHandler