var mongoose = require('mongoose'),
  schema = mongoose.Schema,
  identitySchema = new schema({
    model: String,
    field: String,
    count: Number
  }, {collection: 'identitycounters'}),
  IdentitySchema = mongoose.model('IdentitySchema', identitySchema);

module.exports = IdentitySchema;
