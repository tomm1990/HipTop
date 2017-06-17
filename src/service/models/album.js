var mongoose = require('mongoose');

var schema = mongoose.Schema,
  albumSchema = new schema({
    // name : { type:String, index:1, required:true, unique:true},
    // likes:Number
  }, {collection: 'album'}),
  AlbumSchema = mongoose.model('AlbumSchema', albumSchema);

module.exports = AlbumSchema;
