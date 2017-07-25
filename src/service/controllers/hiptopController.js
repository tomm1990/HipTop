'use strict';

const
  mongoose = require('mongoose'),
  consts = require('../consts/constring'),
  Album = require('../models/Album2'),
  Song = require('../models/Song'),
  User = require('../models/User'),
  Comment = require('../models/Comment'),
  IdentityCounters = require('../models/Identitycounters'),
  removeCounterIdentity = (schema) => {
      console.log('removeCounterIdentity()');
      console.log('schema -> '+schema );
      let toCount = schema == "SongSchema" ? 100 :
                  schema == "AlbumSchema" ? 700 :
                  schema == "CommentSchema" ? 800 : 0,
        conditions = { model : schema },
        update     = { count : toCount },
        opts       = { multi : true };

      IdentityCounters.findOne({
        model : schema
      }, (err,identity)=>{
        if(err){
          console.log(consts.jsonArr[5]); // Cant Search
        }
        if(!identity){
          console.log(consts.jsonArr[6]); // Cant Find
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

exports.respondError = (err,res) => {
  console.log(`respondError -> ${ err }`);
  return res.status(506).send(err);
};

exports.getAllAlbums = (req,res)=>{
    console.log('getAllAlbums() ::');
    Album.find({},
      (err,albums)=>{
          if(err){
              console.log(consts.jsonArr[5]); // Cant search
              res.status(504).json(consts.jsonArr[5]);
          } else {
              console.log(albums);
              res.status(200).json(albums);
          }
      }).catch((err,res) => exports.respondError(err,res));
};

exports.saveNewAlbum = (req,res)=>{
  // Logs
  console.log(`saveNewAlbum() ::`);
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
  let newAlbum = new Album({
    // id : _id, // Auto Generated
    author: req.body.author,
    title: req.body.title,
    urlSrc: req.body.urlSrc,
    likes: req.body.likes,
    genre: req.body.genre,
    imgUrl: req.body.imgUrl,
    comment: req.body.comment,
    songId: req.body.songId
  });

  // Check if already exists
  Album.findOne({
    id : req.body.id
  }, (err,album)=>{
      if(err){ // Server Issue, Internal Problem, Check Documents
        console.log(consts.jsonArr[2]);
        return res.status(500).json(consts.jsonArr[2]);
      }
      if(album){ // If Album Exists
        console.log(consts.jsonArr[1]);
        return res.status(404).json(consts.jsonArr[1]);
      }
      newAlbum.save( // Else save the album
        (err,savedAlbum) => {
          if(err) { // Error saving
            console.log(err);
            return res.status(501).send(consts.jsonArr[3]);
          }
          else { // Success
            console.log(consts.jsonArr[4]);
            return res.status(200).send(savedAlbum);
          }
        }
      ).catch((err,res) => exports.respondError(err,res));
  }).catch((err,res) => exports.respondError(err,res));
};

exports.getAllSongs = (req,res)=>{
    console.log('getAllSongs()');
    Song.find({},
      (err,songs)=>{
        if(err){
          console.log(consts.jsonArr[6]); // Cant Find
          return res.status(503).json(consts.jsonArr[6]);
        } else {
          console.log(songs); // OK
          res.status(200).json(songs);
        }
      }).catch((err,res) => exports.respondError(err,res));
};

exports.getSongsByAlbumName = (req,res)=>{
    console.log('getAllSongs()');
    console.log(`req.body.name -> ${req.body.name}`);
    Album.findOne({
      name : req.body.name
    },(err,albums)=>{
      if(err){
        console.log(err); // Cant Search
        return res.status(504).json(consts.jsonArr[5]);
      }
      if(!albums){
        console.log(consts.jsonArr[6]); // Cant Find
        return res.status(503).json(consts.jsonArr[6]);
      }
      Song.find({
        id : { $in : albums.songId }
      },(err,songs) => {
        if(err){
          console.log(err); // Cant Search
          return res.status(504).json(consts.jsonArr[5]);
        }
        if(!songs){
          console.log(consts.jsonArr[6]); // Cant Find
          return res.status(503).json(consts.jsonArr[6]);
        }
        else {
          console.log(songs); // OK
          return res.status(200).json(songs);
        }
      }).catch((err,res) => exports.respondError(err,res));
    }).catch((err,res) => exports.respondError(err,res));
};

exports.saveNewSong = (req,res)=>{
  console.log(`saveNewAlbum() ::`);
  console.log(`id : ${req.body.id}`);
  console.log(`author : ${req.body.author}`);
  console.log(`title : ${req.body.title}`);
  console.log(`urlSrc : ${req.body.urlSrc}`);
  console.log(`length : ${req.body.length}`);

  // Vars
  let newSong = new Song({
    // id : 401,
    author: req.body.author,
    title: req.body.title,
    urlSrc: req.body.urlSrc,
    imgSrc: req.body.imgSrc,
    // TODO : Need to change the date
    length: req.body.length
  });

  Song.findOne({ // Find if exists
    author : req.body.author ,
    title : req.body.title
  },(err,result)=>{
    if(err){
      console.log(consts.jsonArr[5]); // Cant Search
      return res.status(504).json(consts.jsonArr[5]);
    }
    if(result){
      console.log(consts.jsonArr[1]); // Already Exists
      return res.status(404).json(consts.jsonArr[1]);
    }

    newSong.save( // Save newSong
      (err,savedSong) => {
        if(err) { // Error saving
          console.log(err);
          return res.status(501).send(consts.jsonArr[3]);
        }
        else { // Success
          console.log(consts.jsonArr[4]);
          return res.status(200).send(savedSong);
        }
      }
    ).catch( (err,res) => exports.respondError(err,res) );
  }).catch( (err,res) => exports.respondError(err,res) );
};

exports.removeAllAlbums = (req,res)=>{
  console.log('removeAllAlbums()');
  Album.find({}, // If exists
    (err,albums) => {
      if(err){
        console.log(consts.jsonArr[5]); // Cant Search
        return res.status(504).json(consts.jsonArr[5]);
      }
      if(!albums){
        console.log(consts.jsonArr[6]); // Cant Find
        return res.status(503).json(consts.jsonArr[6]);
      }
      Album.remove({}, // Else remove all albums
        (err,result)=>{
          return res.status(200).json(consts.jsonArr[4]);
        });
    }).catch((err,res) => exports.respondError(err,res));
  removeCounterIdentity("AlbumSchema");
};

exports.removeAllSongs = (req,res)=>{
  console.log('removeAllSongs()');
  Song.find({}, // If exists
    (err,song) => {
      if(err){
        console.log(consts.jsonArr[5]); // Cant Search
        return res.status(504).json(consts.jsonArr[5]);
      }
      if(!song){
        console.log(consts.jsonArr[6]); // Cant Find
        return res.status(503).json(consts.jsonArr[6]);
      }
      Song.remove({}, // update counter
        (err,result)=>{
          return res.status(200).json(consts.jsonArr[4]);
        });
    }).catch((err,res) => exports.respondError(err,res));
  removeCounterIdentity("SongSchema");
};

exports.removeAllUsers = (req,res)=>{
  console.log('removeAllUsers()');
  User.find({}, // If exists
    (err,user) => {
      if(err){
        console.log(consts.jsonArr[5]); // Cant Search
        return res.status(504).json(consts.jsonArr[5]);
      }
      if(!user){
        console.log(consts.jsonArr[6]); // Cant Find
        return res.status(503).json(consts.jsonArr[6]);
      }
      User.remove({}, // update counter
        (err,result)=>{
          return res.status(200).json(consts.jsonArr[4]);
        }).catch((err,res) => exports.respondError(err,res));
    }).catch((err,res) => exports.respondError(err,res));
};

exports.getAmountAlbumByGenre = (req,res)=>{
  console.log('getAmountAlbumByGenre()');
  console.log(`req.body.genre -> ${req.body.genre} `);
  console.log(`req.body.amount -> ${req.body.amount} `);
  Album.find({
    genre : req.body.genre,
  },(err,albums)=>{
    if(err){
      console.log(`Cant search :: err -> ${err}`);
      return res.status(504).json(consts.jsonArr[5]);
    } else {
      console.log(`All Albums :\n -> ${albums}`);
      return res.status(200).json(albums);
    }
  }).limit(Number(req.body.amount))
    .catch((err,res) => exports.respondError(err,res));
};

exports.signUpUser = (req,res)=>{
  console.log('signUp() ::');
  console.log(`req.body.name : ${req.body.name}`);
  console.log(`req.body.title : ${req.body.title}`);
  console.log(`req.body.email : ${req.body.email}`);
  console.log(`req.body.password : ${req.body.password}`);
  console.log(`req.body.typeEnum : ${req.body.typeEnum}`);
  console.log(`req.body.albumId : ${req.body.albumId}`);
  console.log(`req.body.likeAlbum : ${req.body.likeAlbum}`);
  console.log(`req.body.follow : ${req.body.follow}`);
  console.log(`req.body.imgSrc : ${req.body.imgSrc}`);
  console.log(`req.body.googleId : ${req.body.googleId}`);
  console.log(`req.body.preferedGenre : ${req.body.preferedGenre}`);

  let keys = req.body;
  console.log(`JSON.stringify(keys) -> ${JSON.stringify(keys)}`);

  let newUser = new User({
    name: req.body.name,
    title: req.body.title?req.body.title:"No Title",
    email: req.body.email,
    password: req.body.password,
    typeEnum: req.body.typeEnum=="Artist"?"Artist":"User",
    albumId: req.body.albumId?req.body.albumId:[],
    likeAlbum: req.body.likeAlbum?req.body.likeAlbum:[], // User Usage Only
    follow: req.body.follow?req.body.follow:[],
    imgSrc: req.body.imgSrc?req.body.imgSrc:"https://cdn2.iconfinder.com/data/icons/ios-7-icons/50/user_male2-512.png",
    googleId: req.body.googleId?req.body.googleId:"No googleId",
    preferedGenre: req.body.preferedGenre?req.body.preferedGenre:[]
  });

  User.findOne({ // Find exists
    email : String(req.body.email).toLowerCase()
  },(err,result)=>{
    if(err){
      console.log(consts.jsonArr[5]); // Cant Search
      return res.status(504).json(consts.jsonArr[5]);
    }
    if(result){
      console.log(consts.jsonArr[1]); // Already Exists
      return res.status(404).json(consts.jsonArr[1]);
    }
    newUser.save( // Save new document
      (err,savedUser) => {
        if(err) { // Error saving
          console.log(err);
          return res.status(501).send(consts.jsonArr[3]);
        }
        else { // Success
          console.log(consts.jsonArr[4]);
          return res.status(200).send(savedUser);
        }
      }
    ).catch((err,res) => exports.respondError(err,res));
  }).catch((err,res) => exports.respondError(err,res));
};

exports.login = (req,res)=>{
  console.log('login()');
  console.log(`req.body.email : ${req.body.email}`);
  console.log(`req.body.password : ${req.body.password}`);

  User.findOne({
    email : req.body.email
  }, (err,userJson) => {
    if(err){ // Cant Search
      console.log(`Cant search :: err -> ${err}`);
      return res.status(504).json(consts.jsonArr[5]);
    }
    if(!userJson){
      console.log(`Cant find :: userJson -> ${userJson}`);
      return res.status(403).json(consts.jsonArr[7]);
    }
    else {
      if(userJson.password!=req.body.password){
        console.log(`Password is wrong :: error -> ${req.body.password}`);
        return res.status(402).json(consts.jsonArr[8]);
      } else {
        console.log(userJson); // OK
        res.status(200).json(userJson);
      }
    }
  }).catch((err,res) => exports.respondError(err,res));
};

exports.addLikeToAlbum = (req,res)=>{
  console.log('addLikeToAlbum()');
  console.log(`req.body.email : ${req.body.email}`);
  console.log(`req.body.albumid : ${req.body.albumid}`);

  let userToAdd;

  User.find({
    email : req.body.email
  }, verifyEmail,
    verifyAlbum,
    updateAlbum,
    updateUser
  ).catch((err,res) => exports.respondError(err,res));

  function verifyEmail(err,user){
    console.log(`verifyEmail()...`);
    if(err){
      console.log(`Cant search email address :: err -> ${err}`);     // Cant search
      console.log(consts.jsonArr[5]);
      return res.status(504).json(consts.jsonArr[5]);
    }
    if(user.length == 0) {
      console.log(`Cant find email address :: user -> ${user}`);      // Cant find
      console.log(consts.jsonArr[6]);
      return res.status(404).json(consts.jsonArr[6]);
    } else {
      userToAdd = user;
      return verifyAlbum(err,user);
    }
  }

  function verifyAlbum(err,user) {
    console.log(`verifyAlbum()...`);
    Album.findOne({
      _id: req.body.albumid
    }, (err, album) => {
      if (err) {                                                      // Cant search
        console.log(`Cant search album address :: err -> ${err}`);
        console.log(consts.jsonArr[5]);
        return res.status(505).json(consts.jsonArr[5]);
      }
      if(album == null ){                                        // Cant find
        console.log(`Cant find album  :: album -> ${album}`);
        console.log(consts.jsonArr[6]);
        return res.status(405).json(consts.jsonArr[6]);
      } else {
        console.log(album);
        return updateAlbum(err, album);
      }
    });
  }

  function updateAlbum(err,album) {
    console.log(`updateAlbum()...`);
    if (album.likes.indexOf(userToAdd[0]._id) > -1) {
        //In the array!
        console.log(consts.jsonArr[1]);
        return res.status(406).json(consts.jsonArr[1]);
    } else {
      //Not in the array -> need to update
        var conditions = {_id: req.body.albumid}
          , update = {$push: { likes : userToAdd[0].id }}
          , options = {multi: true};
        Album.update(
          conditions,
          update,
          options,
          (err, result) => {
            if (err) {
              console.log(`Cant update :: err -> ${err}`);
              return res.status(507).json(consts.jsonArr[9]);
            } else {  // Success
              console.log(consts.jsonArr[4]);
              return updateUser(err,album);
              // return res.status(200).send(result);
            }
          });
      }
    }

    function updateUser(err,album) {
      User.find({
        email: req.body.email
      }, (err,user)=>{
        if (err) {                                                      // Cant search
          console.log(`Cant find user :: err -> ${err}`);
          return res.status(505).json(consts.jsonArr[6]);
        } else {
          if (user[0].likeAlbum.indexOf(album._id) > -1) {
            //In the array!
            console.log(consts.jsonArr[1]);
            return res.status(406).json(consts.jsonArr[1]);
          } else {
            //Not in the array -> need to update
            var conditions = { email: req.body.email}
              , update = {$push: { likeAlbum : album._id }}
              , options = {multi: true};
            User.update(
              conditions,
              update,
              options,
              (err, result) => {
                if (err) {
                  console.log(`Cant update :: err -> ${err}`);
                  return res.status(507).json(consts.jsonArr[9]);
                } else {  // Success
                  console.log(consts.jsonArr[4]);
                  return res.status(200).send(result);
                }
              });
          }
        }
      }).catch((err, res) => exports.respondError(err, res));
    }
};

exports.getAllAlbumsConclusion = (req,res)=>{
  console.log('getAllAlbumsConclusion()');
  console.log(`genre :: -> ${req.body.genre}`);

  Album.find({
      genre : req.body.genre
  },populateAuthor,
    populateLikes,
    populateComment,
    populateSongs)
      .limit(Number(req.body.limit))
      .catch((err,res) => exports.respondError(err,res));

  function populateAuthor(err,albums) {
    if(err){
      console.log(`err -> ${err}`);     // Cant search
      console.log(consts.jsonArr[5]);   // Cant search
      res.status(504).json(consts.jsonArr[5]);
    } else {
      console.log(`looking for authors..`);
      Album.populate(albums, {
          path: 'author',
          model: User
        },
        function(err, albums) {
          if(err){
            console.log(`err -> ${err}`); // Cant search
            res.status(504).json(consts.jsonArr[5]);
          }
          console.log(albums);
          return populateLikes(err,albums);
        });
    }
  }

  function populateLikes(err,albums) {
    if(err){
      console.log(`err -> ${err}`); // Cant search
      console.log(consts.jsonArr[5]); // Cant search
      res.status(504).json(consts.jsonArr[5]);
    } else {
      console.log(`looking for likes..`);
      Album.populate(albums, {
          path: 'likes',
          model: User
        },
        function(err, albums) {
          if(err){
            console.log(`err -> ${err}`); // Cant search
            res.status(504).json(consts.jsonArr[5]);
          }
          console.log(albums);
          return populateComment(err,albums);
        });
    }
  }

  function populateComment(err,albums) {
    if(err){
      console.log(`err -> ${err}`); // Cant search
      console.log(consts.jsonArr[5]); // Cant search
      res.status(504).json(consts.jsonArr[5]);
    } else {
      console.log(`looking for comments..`);
      Album.populate(albums, {
          path: 'comment',
          model: Comment
        },
        function(err, albums) {
          if(err){
            console.log(`err -> ${err}`); // Cant search
            res.status(504).json(consts.jsonArr[5]);
          }
          console.log(albums);
          return populateSongs(err,albums);
        });
    }
  }

  function populateSongs(err,albums) {
      if(err){
        console.log(`err -> ${err}`); // Cant search
        console.log(consts.jsonArr[5]); // Cant search
        res.status(504).json(consts.jsonArr[5]);
      } else {
        console.log(`looking for songs..`);
        Album.populate(albums, {
            path: 'songId',
            model: Song
          },
          function(err, albums) {
            if(err){
              console.log(`err -> ${err}`); // Cant search
              res.status(504).json(consts.jsonArr[5]);
            }
            console.log(albums);
            res.status(200).json(albums);
          });
      }
  }
};

exports.getArtistById = (req,res)=>{
  console.log('getArtistById()');
  console.log(`req.body.id :: -> ${req.body.id}`);
  if(isNaN(req.body.id)){
    getByMlabId(req.body.id);
  } else {
    getByOriginalId(req.body.id);
  }

  function getByMlabId(id) {
    User.findOne({
        typeEnum: "Artist",
        _id: id
      }, callBack
    ).catch((err, res) => exports.respondError(err, res));
  }

  function getByOriginalId(id){
    if(id<700||id>750){
      console.log(`out of range`);
      return res.status(401).send(consts.jsonArr[0]);
    } else {
      User.findOne({
        typeEnum: "Artist",
        id: id
      },
        callBack,
        populateFollow,
        popilateLikeAlbum,
        populateAlbumId)
        .catch((err,res) => exports.respondError(err,res));
    }
  }

  function callBack(err,result){
    if(err) {
      console.log(`err -> ${err}`); // Cant search
      return res.status(404).json(consts.jsonArr[5]);
    } else {
      return populateFollow(result);
    }
  }

  function populateFollow(result){
    User.populate(result, {
        path: 'follow',
        model: User
      },
      (err, result) => {
        if(err){
          console.log(`err -> ${err}`); // Cant search
          res.status(505).json(consts.jsonArr[6]);
        } else {
          return popilateLikeAlbum(result);
        }
      });
  }

  function popilateLikeAlbum(result){
    User.populate(result, {
        path: 'likeAlbum',
        model: Album
      },
      (err, result) => {
        if(err){
          console.log(`err -> ${err}`); // Cant search
          res.status(506).json(consts.jsonArr[6]);
        } else {
          return populateAlbumId(result);
        }
      });
  }

  function populateAlbumId(result){
    User.populate(result, {
        path: 'albumId',
        model: Album
      },
      (err, result) => {
        if(err){
          console.log(`err -> ${err}`); // Cant search
          res.status(507).json(consts.jsonArr[6]);
        } else {
          console.log(result);
          res.status(200).json(result);
        }
      });
  }
};

exports.addCommentToAlbum = (req,res)=>{
  console.log('addCommentToAlbum()');
  console.log(`req.body.userId :: -> ${req.body.userId}`);
  console.log(`req.body.message :: -> ${req.body.message}`);
  console.log(`req.body.albumId :: -> ${req.body.albumId}`);
  let newComment;
  if(userExsists(req.body.userId) || req.body.message.length!=0){
    // Vars
    let comment = new Comment({
      user : req.body.userId,
      message : req.body.message
    });

    comment.save(
      saveNewComment,
      updateAlbumsComments
    ).catch((err,res) => exports.respondError(err,res));
  } else {
    console.log(`err -> ${err}`);         // Params Missing
    res.status(502).json(consts.jsonArr[0]);
  }

  function userExsists(id){
    User.find({
      id : id
    },(err,result)=>{
      return !(err || result.length==0);
    });
  }

  function saveNewComment(err,result){
    if(err){
      console.log(err);
      return res.status(501).send(consts.jsonArr[3]);
    } else {
      console.log(consts.jsonArr[4]);
      newComment = result;
      return updateAlbumsComments(newComment);
    }
  }

  function updateAlbumsComments(newCommentt){
    Album.findOne({
      _id : req.body.albumId
    },(err,album) => {
        if(err || album.length==0){
            console.log(`Cant find album  :: album -> ${album}`);
            console.log(consts.jsonArr[6]);
            return res.status(405).json(consts.jsonArr[6]);
        } else {
            console.log(`newComment._id -> ${newComment.id}`);
            if (album.comment.indexOf(newComment._id) > -1) {
              //In the array!
              console.log(consts.jsonArr[1]);
              return res.status(406).json(consts.jsonArr[1]);
            } else {
              //Not in the array -> need to update
              var conditions = { _id : req.body.albumId }
                , update = {$push: { comment : newComment._id }}
                , options = {multi: true};
              Album.update(
                conditions,
                update,
                options,
                (err, result) => {
                  if (err) {
                    console.log(`Cant update :: err -> ${err}`);
                    return res.status(507).json(consts.jsonArr[9]);
                  } else {  // Success
                    console.log(consts.jsonArr[4]);
                    return res.status(200).send(result);
                  }
                });
            }
        }
    });
  }

};

exports.getAlbumByIdHybrid = (req,res)=>{
  console.log('getAlbumById()');
  console.log(`req.body.albumId :: -> ${req.body.albumId}`);
  if(isNaN(req.body.albumId)){
    Album.find({
        _id : req.body.albumId
      },
      callBack,
      populateAuthor,
      populateLikes,
      populateComment,
      populateSong).catch((err,res) => exports.respondError(err,res));
  } else {
    Album.find({
        id : req.body.albumId
      },
      callBack,
      populateAuthor,
      populateLikes,
      populateComment,
      populateSong).catch((err,res) => exports.respondError(err,res));
  }

  function callBack(err,result){
    if(err) {
      console.log(`err -> ${err}`);
      return res.status(404).json(consts.jsonArr[0]);
    } else {
      return populateAuthor(result);
    }
  }

  function populateAuthor(result){
    Album.populate(result, {
        path: 'author',
        model: User
      },
      (err, result) => {
        if(err){
          console.log(`err -> ${err}`);
          return res.status(505).json(consts.jsonArr[6]);
        } else {
          return populateLikes(result);
        }
      });
  }

  function populateLikes(result){
    // console.log(`result[0].likes -> ${result[0].likes}`);
    // console.log(`result[0].likes[0] -> ${result[0].likes[0]}`);

    Album.populate(result, {
        path: 'likes',
        model: User
      },
      (err, result) => {
        if(err){
          console.log(`err -> ${err}`);
          return res.status(506).json(consts.jsonArr[6]);
        } else {
          return populateComment(result);
        }
      });
  }

  function populateComment(result){
    Album.populate(result, {
        path: 'comment',
        model: Comment
      },
      (err, result) => {
        if(err){
          console.log(`err -> ${err}`);
          return res.status(508).json(consts.jsonArr[6]);
        } else {

          Comment.populate(result[0].comment, {
              path: 'user',
              model: User
            },
            (err, result) => {
              if (err) {
                console.log(`err -> ${err}`);
                return res.status(508).json(consts.jsonArr[6]);
              } else {
                // return populateSong(result);
              }
            });

          return populateSong(result);
        }
      });
  }

  function populateSong(result){
    Album.populate(result, {
        path: 'songId',
        model: Song
      },
      (err, result) => {
        if(err){
          console.log(`err -> ${err}`); // Cant search
          return res.status(508).json(consts.jsonArr[6]);
        } else {
          console.log(consts.jsonArr[4]);
          console.log(result);
          return res.status(200).send(result);
        }
      });
  }
};

exports.getRandomFromGenre = (req,res)=>{
  console.log('getRandomFromGenre()');

  let array = [],
   rand = Math.floor(Math.random() * 50);

  getRandomOfPop();

  function getRandomOfPop() {
    Song.findOne({
      genre : 'Pop'
    },(err,result)=>{
      if(err){
        console.log(`Cant find 'Pop' :: err -> ${err}`);
        return res.status(505).json(consts.jsonArr[6]);
      } else {
        array.push(result);
        getRandomAdultContemporary();
      }
    }).skip(rand).catch((err,res) => exports.respondError(err,res));
  }

  function getRandomAdultContemporary(){
    rand = Math.floor(Math.random() * 50);

    Song.findOne({
      genre : 'Adult Contemporary'
    },(err,result)=>{
      if(err){
        console.log(`Cant find 'Adult Contemporary' :: err -> ${err}`);
        return res.status(506).json(consts.jsonArr[6]);
      } else {
        array.push(result);
        getRandomBritpop();
      }
    }).skip(rand).catch((err,res) => exports.respondError(err,res));
  }

  function getRandomBritpop(){
    rand = Math.floor(Math.random() * 50);

    Song.findOne({
      genre : 'Britpop'
    },(err,result)=>{
      if(err){
        console.log(`Cant find 'Britpop' :: err -> ${err}`);
        return res.status(507).json(consts.jsonArr[6]);
      } else {
        array.push(result);
        getRandomPopRock();
      }
    }).skip(rand).catch((err,res) => exports.respondError(err,res));
  }

  function getRandomPopRock(){
    rand = Math.floor(Math.random() * 50);

    Song.findOne({
      genre : 'Pop/Rock'
    },(err,result)=>{
      if(err){
        console.log(`Cant find 'Pop/Rock' :: err -> ${err}`);
        return res.status(508).json(consts.jsonArr[6]);
      } else {
        array.push(result);
        console.log(`result -> ${result}`);
        getRandomTeenPop();
      }
    }).skip(rand).catch((err,res) => exports.respondError(err,res));
  }

  function getRandomTeenPop(){
    rand = Math.floor(Math.random() * 50);

    Song.findOne({
      genre : 'Teen Pop'
    },(err,result)=>{
      if(err){
        console.log(`Cant find 'Teen Pop' :: err -> ${err}`);
        return res.status(509).json(consts.jsonArr[6]);
      } else {
        array.push(result);
        console.log(`getRandomFromGenre():: result -> ${result}`);
        return res.status(200).json(array);
      }
    }).skip(rand).catch((err,res) => exports.respondError(err,res));
  }
};

exports.addFollower = (req,res)=>{
  console.log(`addFollower()`);
  console.log(`req.body.userId -> ${req.body.userId}`);
  console.log(`req.body.artistId -> ${req.body.artistId}`);

  updateUser();

  function updateUser(){
    User.findOne({
      _id : req.body.userId
    },(err,user)=>{
      if(err){
        console.log(`err -> ${err}`);
        return res.status(505).json(consts.jsonArr[5]); // cant search
      } else {
        if (user.follow.indexOf(req.body.artistId) > -1) {
          //In the array!
          console.log(consts.jsonArr[1]);
          return res.status(404).json(consts.jsonArr[1]);
        } else {
          //Not in the array -> need to update
          var conditions = { _id : req.body.userId }
            , update = {$push: { follow : req.body.artistId }}
            , options = {multi: true};
          User.update(
            conditions,
            update,
            options,
            (err, result) => {
              if (err) {
                console.log(`Cant update :: err -> ${err}`);
                return res.status(506).json(consts.jsonArr[9]);
              } else {  // Success
                console.log(consts.jsonArr[4]);
                updateArtist();
              }
            });
        }
      }
    });
  }

  function updateArtist(){
    User.findOne({
      _id : req.body.artistId
    },(err,user)=>{
      if(err){
        console.log(`err -> ${err}`);
        return res.status(507).json(consts.jsonArr[5]);
      } else {
        if (user.follow.indexOf(req.body.userId) > -1) {
          //In the array!
          console.log(consts.jsonArr[1]);
          return res.status(405).json(consts.jsonArr[1]);
        } else {
          //Not in the array -> need to update
          var conditions = { _id : req.body.artistId }
            , update = {$push: { follow : req.body.userId }}
            , options = {multi: true};
          User.update(
            conditions,
            update,
            options,
            (err, result) => {
              if (err) {
                console.log(`Cant update :: err -> ${err}`);
                return res.status(508).json(consts.jsonArr[9]);
              } else {  // Success
                console.log(consts.jsonArr[4]);
                return res.status(200).send(result);
              }
            });
        }
      }
    });
  }
};

// exports.tempUpdateSongs = (req,res)=>{
//   console.log('tempUpdateSongs()');
//   var conditions = {  }
//     , update = { "imgSrc" : "http://freeiconbox.com/icon/256/26804.png" }
//     , options = {multi: true};
//   Song.update(
//     conditions,
//     update,
//     options,
//     (err, result) => {
//       if (err) {
//         console.log(`Cant update :: err -> ${err}`);
//         return res.status(507).json(consts.jsonArr[9]);
//       } else {  // Success
//         console.log(consts.jsonArr[4]);
//         return res.status(200).send(result);
//       }
//     });
// };
