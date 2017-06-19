var mongoose = require('mongoose'),
  schema = mongoose.Schema,
  autoIncrement = require('../database'),

  // Song Schema
  songSchema = new schema({
    id : {type: Number, index:1, required:true, unique:true ,default:401,min:400},
    author: [String],
    title: String,
    urlSrc: String,
    imgSrc: String,
    length: String
  }, {collection: 'song'});

// auto increment id function
songSchema.plugin(autoIncrement.autoIncrement.plugin, {
  model: 'SongSchema',
  field: 'id',
  startAt: 401,
  incrementBy: 1
});

var SongSchema = mongoose.model('SongSchema', songSchema);

// Validating title
songSchema.path('title').set(
  (val)=>{
    // this runs first
    return val;
  });

songSchema.path('title').validate(
  (val)=>{
    let valRaw = val;
    // this runs second
    console.log(`valRaw.length : ${valRaw.length}`);
    return valRaw.length > 0;
  }, `title is to short`);

songSchema.pre('save',
  (next) => {
    // this runs last
    return next();
  });

module.exports = SongSchema;
