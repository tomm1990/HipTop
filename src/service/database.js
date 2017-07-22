//------------Connect to mongodbon mLab via Mongoose---------------//
const consts = require('./consts/constring'),
  mongoose = require('mongoose'),
  autoIncrement = require('mongoose-auto-increment'),
  connection = mongoose.createConnection(consts.MLAB_KEY),    //The server option auto_reconnect is defaulted to true
  options = {
    useMongoClient: true,
    server: {
      auto_reconnect: true,
      socketOptions: {keepAlive: 1, connectTimeoutMS: 30000}
    },
    replset: {
      socketOptions: {keepAlive: 1, connectTimeoutMS: 30000}
    }
  };

mongoose.connect(consts.MLAB_KEY, options);
mongoose.Promise = global.Promise;
conn = mongoose.connection;     //get default connection

// Init autoincrement
autoIncrement.initialize(connection);
module.exports.autoIncrement = autoIncrement;

// Event handlers for Mongoose
conn.on('error', function(err) {
  if(err) console.log(`1. err -> ${err}`);
  console.log('Mongoose: Error: ' + err);
});

conn.on('open', function(err) {
  if(err) {
    console.log(`2. err -> ${err}`);
  }
  console.log('Mongoose: Connection established');
});

conn.on('disconnected', function(err){
  if(err) console.log(`3. err -> ${err}`);
  console.log('Mongoose: Connection stopped, recconect');
  mongoose.connect(consts.MLAB_KEY, options);
});

conn.on('reconnected', function(err) {
  if(err) console.log(`4. err -> ${err}`);
  console.info('Mongoose reconnected!');
});
