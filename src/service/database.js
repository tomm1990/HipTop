//------------Connect to mongodbon mLab via Mongoose---------------//
const consts = require('./consts/constring'),
    mongoose = require('mongoose'),
    //The server option auto_reconnect is defaulted to true
     options = {
      server: {
        auto_reconnect:true,
        socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 }
      },
      replset: {
        socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 }
      }
    };

// mongoose.Promise = global.Promise;
mongoose.connect(consts.MLAB_KEY, options);

const conn = mongoose.connection;//get default connection
// Event handlers for Mongoose
conn.on('error', function (err) {
  console.log('Mongoose: Error: ' + err);
});

conn.on('open', function() {
  console.log('Mongoose: Connection established');
});

conn.on('disconnected', function() {
  console.log('Mongoose: Connection stopped, recconect');
  mongoose.connect(consts.MLAB_KEY, options);
});

conn.on('reconnected', function () {
  console.info('Mongoose reconnected!');
});
