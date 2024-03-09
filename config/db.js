
const mongoose = require('mongoose')


const connectDB = async() => {
    const connection = await mongoose.connect(process.env.URL,{
        useNewUrlParser:true,
         useUnifiedTopology:true
    })
    console.log(connection.connection.host)
}
module.exports = connectDB