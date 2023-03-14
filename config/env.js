const dotenv = require('dotenv').config()

module.exports = {
    app_port: process.env.APP_PORT || 3000,
    app_env: process.env.APP_ENV || 'local',
    app_key: process.env.app_key || 'sldkjfhblskjfdhabjkcflsd',
    
    db_url: process.env.DB_URL
}