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
  removeCounterIdentity = (schema) => {
      console.log('removeCounterIdentity()');
      console.log('schema -> '+schema );
      let toCount = schema == "SongSchema" ? 400 :
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

//mongoose.connect(consts.MLAB_KEY,options);
//mongoose.Promise = global.Promise;

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

// exports.addLikeToAlbum = (req,res)=>{
//   console.log('addLikeToAlbum()');
//   console.log(`req.body.email : ${req.body.email}`);
//   console.log(`req.body.albumid : ${req.body.albumid}`);
//
//   User.find({
//     email : req.body.email
//   }, verifyEmail,
//     verifyAlbum,
//     updateAlbum
//   ).catch((err,res) => exports.respondError(err,res));
//
//   // Album.findOne({
//   //   id : req.body.albumid
//   // },(err,resultAlbum)=>{
//   //   if(err){
//   //     console.log(`Cant Search :: err -> ${err}`);
//   //     return res.status(504).json(consts.jsonArr[5]);
//   //   }
//   //     if (resultAlbum.likes.indexOf(req.body.email) > -1) {
//   //       //In the array!
//   //       console.log(consts.jsonArr[1]);
//   //       return res.status(404).json(consts.jsonArr[1]);
//   //     } else {
//   //       //Not in the array -> need to update
//   //       var conditions = { id: req.body.albumid }
//   //         , update = { $push: { likes : req.body.email }  }
//   //         , options = { multi: true };
//   //       Album.update(
//   //         conditions,
//   //         update,
//   //         options,
//   //         (err,result)=>{
//   //           if(err){
//   //             console.log(`Cant update :: err -> ${err}`);
//   //             return res.status(507).json(consts.jsonArr[9]);
//   //           } else{  // Success
//   //             console.log(consts.jsonArr[4]);
//   //             return res.status(200).send(result);
//   //           }
//   //         });
//   //     }
//   // });
//
//   function verifyEmail(err,user){
//     if(err){
//       console.log(`Cant search email address :: err -> ${err}`);     // Cant search
//       console.log(consts.jsonArr[5]);
//       res.status(504).json(consts.jsonArr[5]);
//     }
//     if(user.length == 0) {
//       console.log(`Cant find email address :: err -> ${err}`);      // Cant find
//       console.log(consts.jsonArr[6]);
//       res.status(504).json(consts.jsonArr[6]);
//     }
//     console.log(user);
//     return verifyAlbum(err,user);
//   }
//
//   function verifyAlbum(err,user) {
//     Album.findOne({
//       id: req.body.albumid
//     }, (err, album) => {
//       if (err) {
//         console.log(`Cant find album address :: err -> ${err}`);     // Cant search
//         console.log(consts.jsonArr[5]);                              // Cant search
//         res.status(504).json(consts.jsonArr[5]);
//       }
//       console.log(album);
//       return updateAlbum(err, album);
//     });
//   }
//
//   function updateAlbum(err,album) {
//       if (err) {
//         console.log(`Cant Search :: err -> ${err}`);
//         return res.status(504).json(consts.jsonArr[5]);
//       }
//       if (album.likes.indexOf(req.body.email) > -1) {
//         //In the array!
//         console.log(consts.jsonArr[1]);
//         return res.status(404).json(consts.jsonArr[1]);
//       } else {
//         //Not in the array -> need to update
//         var conditions = {id: req.body.albumid}
//           , update = {$push: {likes: req.body.email}}
//           , options = {multi: true};
//         Album.update(
//           conditions,
//           update,
//           options,
//           (err, result) => {
//             if (err) {
//               console.log(`Cant update :: err -> ${err}`);
//               return res.status(507).json(consts.jsonArr[9]);
//             } else {  // Success
//               console.log(consts.jsonArr[4]);
//               return res.status(200).send(result);
//             }
//           });
//       }
//     }
// };

exports.getAllAlbumsConclusion = (req,res)=>{
  console.log('getAllAlbumsConclusion()');
  console.log(`genre :: -> ${req.body.genre}`);

  Album.find({
      genre : req.body.genre
  },populateAuthor,
    populateLikes,
    populateComment,
    populateSongs).limit(Number(req.body.limit)).catch((err,res) => exports.respondError(err,res));

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
