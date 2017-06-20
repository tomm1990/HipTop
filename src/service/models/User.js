const mongoose = require('mongoose'),
  schema = mongoose.Schema,  // User Schema
  userSchema = new schema({
    // id : {type: Number, index:1, required:true, unique:true ,default:601, min : 600},
    name: String,
    title: String, // Artist Only : Stage Name
    email: {type: String, index: 1, required: true, unique: true},
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

// Validating email
userSchema.path('email').set(
  (val)=>{
    return String(val).toLowerCase();
  });

userSchema.path('email').validate(
  (val)=>{
    let valRaw = val;
    // this runs second
    console.log(`schema :: valRaw : ${valRaw}`);
    return valRaw.length > 0;
  }, `schema :: title is to short`);

userSchema.pre('save',
  (next) => {
    // this runs last
    return next();
  });

module.exports = UserSchema;
