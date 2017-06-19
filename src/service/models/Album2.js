var mongoose = require('mongoose'),
  schema = mongoose.Schema,
  albumSchema = new schema({
    id : {type: Number, index:1, required:true, unique:true ,default:701, min:700},
    author: Array,
    title: String,
    urlSrc: String,
    likes: [Number],
    genre: String,
    imgUrl: String,
    comment: [Number],
    songId: [Number]
  }, {collection: 'album'}),
  AlbumSchema = mongoose.model('AlbumSchema', albumSchema);

module.exports = AlbumSchema;

// TODO : need to increment auto id
// albumSchema.pre('save',(next)=>{
//   AlbumSchema.findByIdAndUpdate(
//     { id: 'entityId' },
//     { $inc: { seq: 1} }
//   )
// });


albumSchema.path('id').validate(
  (val)=>{
    console.log(`validating id : ${val}`);
    let iVal = Number(val);
    return iVal>700 && iVal<800;
  },"Unable to create new album with this id");
