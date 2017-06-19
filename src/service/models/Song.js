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

module.exports = SongSchema;
