const express = require ('express')
const User = require('../models/user')
const route=express.Router()

//I have checked all the Api's by using postman


//to get the rating form on client side
route.get('/rate',(req,res,next)=>{
    return res.render('post',{title: 'sorted list'})
})

//post request for rating from
route.post('/rate',(req,res,next)=>{
    
    //validation
    if(req.body.email && req.body.rating && req.body.movie_name && req.body.comments  ){
        var userData={
            email:req.body.email,
            movie:req.body.movie_name,
            rate:req.body.rating,
            comments:req.body.comments
        }
        User.create(userData,(err,user)=>{
            if(err) return next(err)
            res.redirect('/')
        })

    }
    else{
        let err = new Error('Please enter all the details to rate the movie')
        err.status = 400
        return next(err)
    }
})

//get all the collection in database Users
route.get('/',(req,res,next)=>{
    User.find().exec((err,user)=>{
        if(err) 
            return next(err);
        
       res.send(user)
    })

})

//this is to calculate the total ratings and average rating
route.get('/calculateCount',(req,res,next)=>{
   
    //this will give the Total count of rating in db
    User.find({"rate": {$gt : 1}}).count().exec((err,user)=>{
        res.send(`Total rating in collection is ${user}`)
    
       
      })
    })

     //this will give the average rating according to the matching movie names
    route.get('/calculateAverage',(req,res,next)=>{

        const agg= User.aggregate(
            [
                {$match: {} },
                {$group: { _id: "$movie" , avg:{ $avg : "$rate"}}}
            ]
        )
            res.send(agg)
    })


//this will give us sorted rating in descending order with comments and movie name
route.get('/list',(req,res,next)=>{
   
   User.find().sort({"rate":-1}).exec((err,user)=>{
       res.send(user)
   })
})





module.exports = route