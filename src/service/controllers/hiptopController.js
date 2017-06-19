'use strict';

const
  mongoose = require('mongoose'),
  consts = require('../consts/constring'),
  Album = require('../models/Album2'),
  Song = require('../models/Song'),
  User = require('../models/User'),
  Comment = require('../models/Comment'),
  IdentityCounters = require('../models/Identitycounters'),
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
  ],
  removeCounterIdentity = (schema) => {
      console.log('removeCounterIdentity()');
      console.log('schema -> '+schema );
      var toCount = schema=="SongSchema"?400:400,
        conditions = { model : schema },
        update     = { count : toCount },
        opts       = { multi : true };

      IdentityCounters.findOne({
        model : schema
      }, (err,identity)=>{
        if(err){
          console.log(jsonArr[5]); // Cant Search
        }
        if(!identity){
          console.log(jsonArr[6]); // Cant Find
        }
        else {
          IdentityCounters.update(conditions,update,opts,
            (err)=>{
              if(err)
                console.log(`Can't update counter of ${schema}`);
              else
                console.log(`counter reset ${schema}`);
            });
        }
      });
};

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

exports.getAllSongs = (req,res)=>{
    console.log('getAllSongs() ::');
    Song.find({},
      (err,songs)=>{
        if(err){
          console.log(jsonArr[6]); // Cant Find
          return res.status(503).json(jsonArr[6]);
        } else {
          console.log(songs); // OK
          res.status(200).json(songs);
        }
      });
};

exports.getSongsByAlbumName = (req,res)=>{
    console.log('getAllSongs() ::');
    console.log(`req.body.name -> ${req.body.name}`);
    Album.findOne({
      name : req.body.name
    },(err,albums)=>{
      if(err){
        console.log(err); // Cant Search
        return res.status(502).json(jsonArr[5]);
      }
      if(!albums){
        console.log(jsonArr[6]); // Cant Find
        return res.status(503).json(jsonArr[6]);
      }
      Song.find({
        id : { $in : albums.songId }
      },(err,songs)=>{
        if(err){
          console.log(err); // Cant Search
          return res.status(504).json(jsonArr[5]);
        }
        if(!songs){
          console.log(jsonArr[6]); // Cant Find
          return res.status(505).json(jsonArr[5]);
        }
        else {
          console.log(jsongs); // OK
          return res.status(200).json(songs);
        }
      });
    });
};

exports.saveNewSong = (req,res)=>{
  console.log(`saveNewAlbum() ::`);
  console.log(`id : ${req.body.id}`);
  console.log(`author : ${req.body.author}`);
  console.log(`title : ${req.body.title}`);
  console.log(`urlSrc : ${req.body.urlSrc}`);
  console.log(`length : ${req.body.length}`);

  // Vars
  var newSong = new Song({
      // id : 401,
      author : req.body.author,
      title : req.body.title,
      urlSrc : req.body.urlSrc,
      imgSrc : req.body.imgSrc,
    // TODO : Need to change the date
      length : req.body.length
    });

  Song.findOne({ // Find if exists
    author : { $in : req.body.author },
    title : req.body.title
  },(err,result)=>{
    if(err){
      console.log(jsonArr[5]); // Cant Search
      return res.status(502).json(jsonArr[5]);
    }
    if(result){
      console.log(jsonArr[1]); // Already Exists
      return res.status(404).json(jsonArr[1]);
    }
    newSong.save( // Save newSong
      (err,savedSong) => {
        if(err) { // Error saving
          console.log(err);
          return res.status(501).send(jsonArr[3]);
        }
        else { // Success
          console.log(jsonArr[4]);
          return res.status(200).send(savedSong);
        }
      }
    );
  });
};

exports.removeAllSongs = (req,res)=>{
  console.log('saveNewSong() ::');
  Song.find({}, // If exists
    (err,song) => {
      if(err){
        console.log(jsonArr[5]); // Cant Search
        return res.status(502).json(jsonArr[5]);
      }
      if(!song){
        console.log(jsonArr[6]); // Cant Find
        return res.status(503).json(jsonArr[6]);
      }
      Song.remove({}, // update counter
        (err,result)=>{
          return res.status(200).json(jsonArr[4]);
        });
    });
  removeCounterIdentity("SongSchema");
};

exports.signUpUser = (req,res)=>{
  console.log('signUp() ::');
  console.log(`id : ${req.body.email}`);
  console.log(`id : ${req.body.name}`);
  console.log(`id : ${req.body.password}`);

  // TODO : Change to adaptive
  var newUser = new User({
    //id : 601,
    name: req.body.name,
    title: "",
    email: req.body.email,
    password: req.body.password,
    typeEnum: "User",
    albumId: [703,704,705],
    likeAlbum: [701,702,703,704,705], // User Usage Only
    follow: [],
    imgSrc: "",
    googleId: "",
    preferedGenre: ["pop"]
  });

  User.findOne({ // Find exists
    email : req.body.email
  },(err,result)=>{
    if(err){
      console.log(jsonArr[5]); // Cant Search
      return res.status(502).json(jsonArr[5]);
    }
    if(result){
      console.log(jsonArr[1]); // Already Exists
      return res.status(404).json(jsonArr[1]);
    }
    newUser.save( // Save new document
      (err,savedUser) => {
        if(err) { // Error saving
          console.log(err);
          return res.status(501).send(jsonArr[3]);
        }
        else { // Success
          console.log(jsonArr[4]);
          return res.status(200).send(savedUser);
        }
      }
    );
  });
};
