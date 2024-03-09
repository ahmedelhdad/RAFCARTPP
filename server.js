const express = require('express')
const app = express()
const dotenv = require('dotenv')
const cors = require('cors')
const bodyparser = require('body-parser')
const morgan= require('morgan')
const path = require('path')
dotenv.config({
    path:'./config/index.env'
})
app.use(cors())
app.use(morgan('dev'))
app.use(bodyparser.urlencoded({extended:true}))
app.use(bodyparser.json())

app.use(express.static(path.join(__dirname,'uploads')))
const connectDB = require('./config/db')
connectDB()

app.use('/',require('./router/auth_user'))
app.use('/',require('./router/category'))
app.use('/api',require('./router/products'))
app.use('/api',require('./router/counterApp'))
app.use('/',require('./router/order'))








const port = process.env.port

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


app.use((req,res) => {
    res.status(404).json({
        msg:'Page not found'
    })
})
