var mongoose = require('mongoose'),
  schema = mongoose.Schema,
  userSchema = new schema({
    // id : {type: Number, index:1, required:true, unique:true ,default:601, min : 600},
    name: String,
    title: String, // Artist Only : Stage Name
    email: {type: String,index:1, required:true, unique:true},
    password: String,
    typeEnum: String, // ENUM { User , Artist }
    albumId: [Number], // Artist Albums, User PlayList
    likeAlbum: [Number], // User Usage Only
    follow: [String], // User Following Artist email, Artist Get follow by User email
    imgSrc: String, // Personal Pic
    googleId: String,
    preferedGenre: [String] // User Usage Only
  }, {collection: 'user'}),
  UserSchema = mongoose.model('UserSchema', userSchema);

module.exports = UserSchema;

userSchema.path('email').set(
  (val)=>{
    return String(val).toLowerCase();
  });
