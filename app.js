const express = require('express')
const app=express()
const cors= require('cors')
const route = require('./routes/index')
const mongoose= require('mongoose')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:false}))

//used templating language to render my pages
app.set('view engine','hbs')

//REstful paths are defined in the routes
app.use('/',route)

//connectin mongoDb using mongoose
mongoose.connect('mongodb://localhost:27017/ratings')
const db=mongoose.connection
db.on('error',err=>{
    console.error(err)
})

app.listen(4444,()=>{
    console.log('server started at http://localhost:4444')
})
















// const {MongoClient} = require('mongodb')
// const DB_PATH = 'mongodb://localhost:27017'

// MongoClient.connect(DB_PATH,(err,client)=>{
//     if(err) throw err

//     console.log('connected successfully')
//     const ratings=client.db(ratings)


// })