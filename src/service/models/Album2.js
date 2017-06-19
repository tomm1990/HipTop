var mongoose = require('mongoose'),
  schema = mongoose.Schema,
  autoIncrement = require('../database'),

  // Album Schema
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
  }, {collection: 'album'});

// auto increment id function
albumSchema.plugin(autoIncrement.autoIncrement.plugin, {
  model: 'AlbumSchema',
  field: 'id',
  startAt: 701,
  incrementBy: 1
});

var AlbumSchema = mongoose.model('AlbumSchema', albumSchema);

// Validating id
albumSchema.path('id').set(
  (val)=>{
    // this runs first
    return val;
  });

albumSchema.path('id').validate(
  (val)=>{
    // this runs second
    console.log(`validating id : ${val}`);
    let iVal = Number(val);
    return iVal>700 && iVal<800;
  },"Unable to create new album with this id");

albumSchema.pre('save',
  (next) => {
    // this runs last
    return next();
  });

module.exports = AlbumSchema;
