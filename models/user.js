const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    email:{
        required:true,
        type:String,
        unique:true,
        trim:true //trim  whitespaces from front
    },
    movie:{
        required:true,
        type:String,
        
        trim:true //trim  whitespaces from front

    },
    rate:{
        required:true,
        type:Number,
        
        trim:true

    },
    comments:{
        type:String
    }
})
const User = mongoose.model('User',UserSchema)
module.exports = User
