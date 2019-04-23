var mongoose = require ('mongoose')
var UserSchema = new mongoose.Schema({
    name:{
      type:String,
      // required:true
    },
    token:{
      type:String,
      default:null
    },
    // accessToken:{
    //   type:String,
    //   default:null
    // },
    email:{
      type:String,
      unique:true,
      required:true,
      lowercase:true
    },
    status:{
    type:String,
    enum:['inactive', 'active'],
    default:'inactive'
  },
  password:{
    type:String,
    required:true
  },
  gender:{
    type:String,
    enum:['male', 'female']
  },
  set:{
    type:String,
    default:null
  },
  userType:{
    type:String,
    enum:['student', 'admin'],
    default:'student'
  },
  dateAdded:{
    type:Date,
    default:Date.now()
  }
})
module.exports = mongoose.model('Users', UserSchema)
