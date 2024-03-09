const mongoose = require("mongoose")


const UserSchema = mongoose.Schema({
    name:{type:String},
    email:{type:String },
    password:{type:String},
    img:{type:String},
    role:{
        type:Boolean,
        default:false
    },
    history: {
        type: Array,
        default: [],
      },
},
{
    timestamps: true,
}
)

const User =mongoose.model('User',UserSchema)

module.exports = User