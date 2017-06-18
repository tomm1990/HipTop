var mongoose = require('mongoose'),
  schema = mongoose.Schema,
  userSchema = new schema({
    id : {type: Number, index:1, required:true, unique:true ,default:601, min : 600},
    name: String,
    title: String,
    email: String,
    password: String,
    typeEnum: String,
    albumId: Array,
    likeAlbum: Array,
    follow: Array,
    imgSrc: String,
    googleId: String,
    preferedGenre: String
  }, {collection: 'user'}),
  UserSchema = mongoose.model('UserSchema', userSchema);

module.exports = UserSchema;

// TODO : need to increment auto id
// userSchema.pre('save',(next)=>{
//   UserSchema.findByIdAndUpdate(
//     { id: 'entityId' },
//     { $inc: { seq: 1} }
//   )
// });
