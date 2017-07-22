const mongoose = require('mongoose'),
  schema = mongoose.Schema,
  autoIncrement = require('../database'),

  // Comment Schema
  commentSchema = new schema({
    id: {type: Number, index: 1, required: true, unique: true, default: 801, min: 800},
    userEmail: String,
    message: String,
    date: {type: Date, default: Date.now}
  }, {collection: 'comment'});

// auto increment id function
commentSchema.plugin(autoIncrement.autoIncrement.plugin, {
  model: 'CommentSchema',
  field: 'id',
  startAt: 801,
  incrementBy: 1
});

let CommentSchema = mongoose.model('CommentSchema', commentSchema);

// Validating title
commentSchema.path('userEmail').set(
  (val)=>{
    // this runs first
    return val;
  });

commentSchema.path('userEmail').validate(
  (val)=>{
    let valRaw = val;
    // this runs second
    console.log(`schema :: userEmail : ${val}`);
    return valRaw.length > 0;
  }, `schema :: userEmail is missing`);

commentSchema.pre('save',
  (next) => {
    // this runs last
    return next();
  });

module.exports = CommentSchema;
