const mongoose = require('mongoose')
const { db_url } = require('../config/env')

const connectDb = () => {
    mongoose.connect(db_url, {useNewUrlParser: true})
    .then(()=>console.log('DB Connected'))
    .catch((err)=>console.log("FAILED TO CONNECT TO DB", err.message))
}

module.exports = connectDb