var mongoose = require ('mongoose')
var ScoreSchema = new mongoose.Schema({
    student:{
      type:mongoose.Schema.Types.ObjectId,
      ref:'Users'
    },
    admin:{
      type:mongoose.Schema.Types.ObjectId,
      ref:'Users'
    },
    math:{
      type:Number,
      default:null
    },
    eng:{
      type:Number,
      default:null
    },
    phy:{
      type:Number,
      default:null
    },
    session:{
      type:String,
      required:true
    },
    set:{
      type:String,
      required:true
    },
    dateAdded:{
      type:Date,
      default:Date.now()
    }
})
module.exports = mongoose.model('Scores', ScoreSchema)
