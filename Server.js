const express = require('express')
const app = express()
const env = require('./config/env')
const connectDb = require('./database/connectDb')
const morgan = require('morgan')
connectDb()

//!Middlewares


app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(morgan('dev'))


//!ROUTES

//*auth route
app.use('/api/v1/auth/users', require('./routes/authRoutes'))


//*user route
app.use('/api/v1/users', require('./routes/userRoutes'))


//* admin routes
app.use('/api/v1/admin/categories', require('./routes/Admin/categoryRoutes'))


//!ERROR HANDLER MIDDLEWARE
app.use(require('./middlewares/errorHandler'))

app.listen(env.app_port, ()=>{
    console.log(`Server running on port ${env.app_port}`, )
})