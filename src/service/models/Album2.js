const mongoose = require('mongoose'),
  Song = require('./Song'),
  Comment = require('./Comment'),
  User = require('./User'),

  schema = mongoose.Schema,
  autoIncrement = require('../database'),  // Album Schema
  albumSchema = new schema({
    id:       {type: Number, index: 1, required: true, unique: true, default: 701, min: 700},
    author:   { type:[schema.ObjectId] , ref: User },
    title:    String,
    urlSrc:   String,
    likes:    { type:[schema.ObjectId] , ref: User },
    genre:    String,
    imgUrl:   String,
    comment:  { type:[schema.ObjectId] , ref: Comment },
    songId:   { type:[schema.ObjectId] , ref: Song }
  }, {collection: 'album'});

// auto increment id function
albumSchema.plugin(autoIncrement.autoIncrement.plugin, {
  model: 'AlbumSchema',
  field: 'id',
  startAt: 701,
  incrementBy: 1
});

let AlbumSchema = mongoose.model('AlbumSchema', albumSchema);

// Validating id
albumSchema.path('id').set(
  (val)=>{
    // this runs first
    return val;
  });

albumSchema.path('id').validate(
  (val)=>{
    // this runs second
    console.log(`schema :: validating id : ${val}`);
    let iVal = Number(val);
    return true;
  },"schema :: Unable to create new album with this id");

albumSchema.pre('save',
  (next) => {
    // this runs last
    return next();
  });

module.exports = AlbumSchema;
