var express = require('express')
var app = express()
var bodyParser = require('body-parser')
var mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const path = require('path')

// mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/portal', { useNewUrlParser: true, useCreateIndex: true }, ()=>{
//   console.log('Connected to the database');
// })
mongoose.connect('mongodb+srv://portal_user:12345@portal-zmlty.mongodb.net/portal?retryWrites=true', { useNewUrlParser: true, useCreateIndex: true }, ()=>{
  console.log('Connected to the database');
})

var Users = require('./models/users');

mongoose.set('useFindAndModify', false);

//middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.post('/api/signUp', (req, res)=>{
  const token = Math.floor((Math.random() * 999999) + 100000)
  req.body.token = token
  Users.create(req.body, (err, data)=>{
    if (err) {
      console.log(err);
    }else{
      console.log("signed up");
      res.json({
        userType:data.userType,
        email:data.email,
        id:data._id,
        token:data.token
      })
    }
  })
})

app.post('/api/login', (req, res)=>{
  Users.find({email:req.body.email, password:req.body.password, status:'active'})
       .exec((err, user)=>{
      if (err) {
        console.log('Error has occurred')
      }else {
          jwt.sign({user:user}, 'secretkey', {expiresIn: '3600s'}, (err, token)=>{
            res.json([{
              'id':user[0]._id,
              'token':token,
              'email':user[0].email,
              'userType':user[0].userType
            }])
          })
      }
    })
})

app.get('/api/verifyAccount/:email/:token', (req, res)=>{
  Users.findOneAndUpdate({status:'inactive', email:req.params.email, token:req.params.token}, {$set: {
    status:'active', token:null
  }}, {upsert:false}, (err, update)=>{
    if (err) {
      console.log('There was an error');
    }else {
      res.send("Account verified")
    }
  })
})

app.get('/students', (req, res)=>{
  Users.find()
    .sort('name')
    .exec((err, users)=>{
      if (err) {
        console.log('Error has occurred')
      }else {
        res.json(users)
      }
    })
})

app.get('/students/:id', (req, res)=>{
  Users.find({_id:req.params.id})
       .exec((err, users)=>{
      if (err) {
        console.log('Error has occurred')
      }else {
          res.json(users)
      }
    })
})

app.put('/updateUser', (req, res)=>{
  Users.findOneAndUpdate({email:req.body.email}, {$set: {
    set: req.body.set,
  }}, {upsert:false}, (err, update)=>{
    if (err) {
      console.log('There was an error');
    }else {
      res.json(update)
    }
  })
})

app.delete('/deleteUser', (req, res)=>{
  Users.findOneAndDelete({email:req.body.email}, (err, deletedData)=>{
    if (err) {
     console.log('There was an error')
   }else {
     res.json(deletedData)
   }
 })
})

if(process.env.NODE_ENV === 'production'){
	app.use(express.static('student-portal/build'))
  app.get('*', (req,res)=>{
    res.sendFile(path.join(__dirname, 'student-portal', 'build', 'index.html'))
  })
}

const port = process.env.PORT || 5000
app.listen(port, _=>{
  console.log(`Server is running on port ${port}`)
})
