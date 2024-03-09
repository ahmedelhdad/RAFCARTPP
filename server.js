const express = require('express')
const app = express()
const dotenv = require('dotenv')
const cors = require('cors')
const bodyparser = require('body-parser')
const morgan= require('morgan')
const path = require('path')
const mongoose = require('mongoose')

dotenv.config({
    path:'./config/index.env'
})
app.use(cors())
app.use(morgan('dev'))
app.use(bodyparser.urlencoded({extended:true}))
app.use(bodyparser.json())

app.use(express.static(path.join(__dirname,'uploads')))


const connectDB = async() => {
    const connection = await mongoose.connect('mongodb+srv://ahmedelhdad923:RrX9ChI362nzzplt@ProjectApp.6qexalc.mongodb.net/',{
        useNewUrlParser:true,
         useUnifiedTopology:true
    })
    console.log(connection.connection.host)
}
connectDB
app.use('/',require('./router/auth_user'))
app.use('/',require('./router/category'))
app.use('/api',require('./router/products'))
app.use('/api',require('./router/counterApp'))
app.use('/',require('./router/order'))








const port = 3000

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


app.use((req,res) => {
    res.status(404).json({
        msg:'Page not found'
    })
})
