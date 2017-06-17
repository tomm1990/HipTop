'use strict';

const //data = require('./data/news.json'),
  //mongoose = require('mongoose'),
  //consts = require('../consts/constring'),
  Album = require('../models/album')
  // options = {
  //   server: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } },
  //   replset: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } }
  // }
  ;

//mongoose.connect(consts.MLAB_KEY,options);

exports.getAllAlbums = (req,res)=>{
    console.log('getAllAlbums() ::');
    Album.find({},
      (err,albums)=>{
          if(err){
              console.log('err ->'+err);
              res.status(404).json({"err" : err});
          } else {
              console.log(albums);
              res.status(200).json(albums);
          }
      });
};
