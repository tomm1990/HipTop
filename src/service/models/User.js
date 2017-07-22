const mongoose = require('mongoose'),
  Album = require('../models/Album2'),
  schema = mongoose.Schema,  // User Schema
  userSchema = new schema({
    name:           String,
    title:          String,  // Artist Only : Stage Name
    email:          {type: String, index: 1, required: true, unique: true},
    password:       String,
    typeEnum:       String, // ENUM { User , Artist }
    albumId:        { type:[schema.ObjectId] , ref: Album }, // Artist Albums, User PlayList
    likeAlbum:      [Array], // User Usage Only
    follow:         { type:[schema.ObjectId] , ref: this }, // User Following Artist email, Artist Get follow by User email
    imgSrc:         String, // Personal Pic
    googleId:       String,
    preferedGenre:  [Array] // User Usage Only
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
