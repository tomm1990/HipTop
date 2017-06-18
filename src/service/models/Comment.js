var mongoose = require('mongoose'),
  schema = mongoose.Schema,
  commentSchema = new schema({
    id : {type: Number, index:1, required:true, unique:true ,default:801, min:800},
    userId: Number,
    message: String,
    date : { type: Date, default: Date.now }
  }, {collection: 'comment'}),
  CommentSchema = mongoose.model('CommentSchema', commentSchema);

module.exports = CommentSchema;

// TODO : need to increment auto id
// commentSchema.pre('save',(next)=>{
//   CommentSchema.findByIdAndUpdate(
//     { id: 'entityId' },
//     { $inc: { seq: 1} }
//   )
// });
