'use strict';

const
  mongoose = require('mongoose'),
  consts = require('../consts/constring'),
  Album = require('../models/Album'),
  Song = require('../models/Song'),
  User = require('../models/User'),
  Comment = require('../models/Comment'),
   options = {
     server: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } },
     replset: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } }
   },
  jsonArr = [
    {
      "title":"missing params"
    },
    {
      "title":"already exists"
    },
    {
      "title":"error create"
    },
    {
      "title":"error save"
    },
    {
      "title" : "saved"
    },
    {
      "title" : "cant search"
    },
    {
      "title" : "cant find"
    },
  ];

mongoose.connect(consts.MLAB_KEY,options);
mongoose.Promise = global.Promise;

exports.getAllAlbums = (req,res)=>{
    console.log('getAllAlbums() ::');
    Album.find({},
      (err,albums)=>{
          if(err){
              console.log(jsonArr[5]);
              res.status(503).json(jsonArr[5]);
          } else {
              console.log(albums);
              res.status(200).json(albums);
          }
      });
};

exports.saveNewAlbum = (req,res)=>{
  // Logs
  console.log(`saveNewAlbum() ::`);
  console.log(`id : ${req.body.id}`);
  console.log(`author : ${req.body.author}`);
  console.log(`title : ${req.body.title}`);
  console.log(`urlSrc : ${req.body.urlSrc}`);
  console.log(`likes : ${req.body.likes}`);
  console.log(`genre : ${req.body.genre}`);
  console.log(`imgUrl : ${req.body.imgUrl}`);
  console.log(`comment : ${req.body.comment}`);
  console.log(`songId : ${req.body.songId}`);

  // TODO check songId, commentId, likes

  // Vars
  var _id = req.body.id,
    _author = req.body.author,
    _title = req.body.title,
    _urlSrc = req.body.urlSrc,
    _likes = req.body.likes,
    _genre = req.body.genre,
    _imgUrl = req.body.imgUrl,
    _comment = req.body.comment,
    _songId = req.body.songId,
    newAlbum = new Album({
      id : _id,
      author : _author,
      title : _title,
      urlSrc : _urlSrc,
      likes : _likes,
      genre : _genre,
      imgUrl : _imgUrl,
      comment : _comment,
      songId : _songId
    });

  // Check if already exists
  Album.findOne({
    id : _id
  }, (err,album)=>{
      if(err){ // Server Issue, Internal Problem, Check Documents
        console.log(jsonArr[2]);
        return res.status(500).json(jsonArr[2]);
      }
      if(album){ // If Album Exists
        console.log(jsonArr[1]);
        return res.status(404).json(jsonArr[1]);
      }
      newAlbum.save( // Else save the album
        (err,savedAlbum) => {
          if(err) { // Error saving
            console.log(err);
            return res.status(501).send(jsonArr[3]);
          }
          else { // Success
            console.log(jsonArr[4]);
            return res.status(200).send(savedAlbum);
          }
        }
      );
  });
};

exports.removeAllAlbums = (req,res)=>{
  console.log('removeAllAlbums() ::');
  Album.find({},
    (err,albums)=>{
      if(err){
        console.log(jsonArr[5]); // Cant Search
        return res.status(502).json(jsonArr[5]);
      }
      if(!albums){
        console.log(jsonArr[6]); // Cant Find
        return res.status(503).json(jsonArr[6]);
      }
      Album.remove({}, // Else remove all albums
        (err,result)=>{
          return res.status(200).json(jsonArr[4]);
      });
  });
};
