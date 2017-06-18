var mongoose = require('mongoose'),
  schema = mongoose.Schema,
  songSchema = new schema({
    id : {type: Number, index:1, required:true, unique:true ,default:401,min:400},
    author: Array,
    title: String,
    urlSrc: String,
    length: Number
  }, {collection: 'song'}),
  SongSchema = mongoose.model('SongSchema', songSchema);

module.exports = SongSchema;

// TODO : need to increment auto id
// songSchema.pre('save',(next)=>{
//   SongSchema.findByIdAndUpdate(
//     { id: 'entityId' },
//     { $inc: { seq: 1} }
//   )
// });
