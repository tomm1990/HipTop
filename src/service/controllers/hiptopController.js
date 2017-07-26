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

/*
   getAllAlbums
     This endpoint retrieves all albums.

   @type
     POST

   @param
     -

   @return
     code 503 : json Unable to Find documents
     code 200 : json All Albums
*/
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

/*
   saveNewAlbum

   @type
   POST

   @param
   id : Number {700 < id < 800}
   author: Array,
   title: String,
   urlSrc: String,
   likes: [Number],
   genre: String,
   imgUrl: String,
   comment: [Number],
   songId: [Number]

   @return
   code 500 : json Unable to create document
   code 404 : json Already Exists
   code 501 : json Unable to save document
   code 200 : json Album

   @i.e
   https://hiptop.herokuapp.com/saveNewAlbum
   [id][701]
   [author][Shlomi Shabat]
   [author][Rita] // send twice to extend the array
   [title][Yesh Lach]
   [urlSrc][]
   [likes][401] // users ID
   [likes][402]
   [likes][402]
   [genre][pop]
   [imgUrl][http://www.jewishagency.org/he/sites/default/files/styles/blog_slider/public/VOICES_RITA_32014.jpg?itok=RhoUD449]
   [comment][801] // comments ID
   [comment][802]
   [comment][803]
   [songId][402] // songs ID
   [songId][403]
   [songId][404]
 */
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

/*
   getAllSongs
     This endpoint retrieves all songs.

   @type
     POST

   @param
     -

   @return
     code 503 : json Unable to Find documents
     code 200 : json All Songs
*/
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

/*
   getSongsByAlbumName
      This endpoint gets album by a given name

   @type
     POST

   @param
     name

   @return
     code 502 : json Unable to Search Albums documents
     code 503 : json Unable to Find Albums documents
     code 504 : json Unable to Search Songs documents
     code 505 : json Unable to Find Songs documents
     code 200 : json Songs

   @i.e
     https://hiptop.herokuapp.com/getSongsByAlbumName
     [name][Lady Gaga]
*/
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

/*
   saveNewSong
     saves new song

   @type
     POST

   @param
     author: [String],
     title: String,
     urlSrc: String,
     length: String

   @return
     code 502 : json Unable to Search documents
     code 501 : json Unable to save document
     code 404 : json Already Exists
     code 200 : json Song

   @i.e
     https://hiptop.herokuapp.com/saveNewSong
     [author][Lady Gaga]
     [author][Maroon 5]
     [urlSrc][http://www] // Song Url
     [imgSrc][http://www]
     [length][03:20]
*/
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

/*
   removeAllAlbums
     This endpoint removes all albums.

   @type
     POST

   @param
     -

   @return
     code 502 : json Unable to Search documents
     code 503 : json Unable to Find documents
     code 200 : json Action Saved
*/
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

/*
   removeAllSongs
     This endpoint removes all songs.

   @type
     POST

   @param
     -

   @return
     code 502 : json Unable to Search documents
     code 503 : json Unable to Find documents
     code 200 : json Action Saved

   @i.e
     https://hiptop.herokuapp.com/removeAllSongs
*/
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

/*
   removeAllUsers
     This endpoint removes all users.

   @type
     POST

   @param
     -

   @return
     code 502 : json Unable to Search documents
     code 503 : json Unable to Find documents
     code 200 : json Action Saved

   @i.e
     https://hiptop.herokuapp.com/removeAllUsers
*/
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

/*
   getAmountAlbumByGenre
     This endpoint retrieves specific amount of Albums by genre

   @type
     POST

   @param
     genre    : String
     amount   : Number

   @return
     code 502 : json Unable to Search documents
     code 200 : json albums

   @i.e
     https://hiptop.herokuapp.com/getAmountAlbumByGenre
*/
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

/*
   signUpUser
    sings new User

   @type
     POST

   @param
     name: String,
     email: String,
     password: String

   @return
     code 502 : json Unable to Search documents
     code 404 : json Already Exists
     code 501 : json Unable to save document
     code 200 : json User

   @i.e
     https://hiptop.herokuapp.com/signUpUser
     [name][Tom Goldberg]
     [email][tom@goldberg.com]
     [password][1234]
*/
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

/*
   login
     This endpoint retrieves specific amount of Albums by genre

   @type
     POST

   @param
     email: String
     password: String

   @return
     code 502 : json Unable to Search documents
     code 403 : json of email not exists
     code 404 : json of wrong password
     code 200 : json User

   @i.e
     https://hiptop.herokuapp.com/removeAllUsers
*/
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

/*
   addLikeToAlbum
     Adds like to an existing album

   @type
     POST

   @param
     email      : String    // This email add to (USER EMAIL ONLY)
     albumid    : String    // this album

   @return
     code 504 : json Unable to search Email
     code 404 : json Cant find Email
     code 505 : json Unable to search Album
     code 405 : json Cant find Album
     code 406 : json already exists
     code 507 : json cant update
     code 200 : json ok

   @i.e
     https://hiptop.herokuapp.com/addLikeToAlbum
*/
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

/*
   getAllAlbumsConclusion
     gets all albums by amount and genre

   @type
     POST

   @param
     limit       : Integer     // amount of results
     genre       : String

   @return
     code 504 : json Unable to Search Albums documents
     code 200 : json Album

   @i.e
     https://hiptop.herokuapp.com/getAllAlbumsConclusion
*/
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

/*
   getArtistById
     get Artist By mLab ID

   @type
     POST

   @param
     id       : Integer     // Artist mLab ID ONLY

   @return
     code 401 : json Missing Params
     code 404 : json Cant search
     code 505 : json Album :: Cant find followers
     code 506 : json Album :: Cant find likesAlbum
     code 507 : json Album :: Cant find albumId
     code 200 : json Artist

   @i.e
     https://hiptop.herokuapp.com/getArtistById
*/
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

/*
   addCommentToAlbum
     Creates new Comment and place it into Album comment

   @type
     POST

   @param
     userId         : String     // User ID who wrote the comment
     message        : String     // User's message
     albumId        : String     // Album to put the message within

   @return
     code 502 : json Missing Params
     code 501 : json Error save
     code 405 : json Cant find album to put comment within
     code 406 : json Already Exists - comment already within
     code 507 : json Cant Update album comments
     code 200 : json ok

   @i.e
     https://hiptop.herokuapp.com/addCommentToAlbum
*/
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

/*
   getAlbumByIdHybrid
     Gets Albums by specific (String:) mLab ID or Original (Int:) ID

   @type
     POST

   @param
     albumId        : String for mLab ID or Int for Original ID

   @return
     code 404 : json Missing Params
     code 505 : json Cant find authors to this album
     code 506 : json Cant find likes to this album
     code 507 : json Cant find comments to this album
     code 508 : json Cant find songs to this album
     code 200 : json ok

   @i.e
     https://hiptop.herokuapp.com/getAlbumByIdHybrid
*/
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

/*
   getRandomFromGenre
     gets 5 random songs from each genre from
     { Pop , Adult Contemporary , Britpop , Pop/Rock , Teen Pop }

   @type
     POST

   @param
      -

   @return
     code 505 : json Cant Find - Pop song is missing
     code 506 : json Cant Find - Adult Contemporary song is missing
     code 507 : json Cant Find - Britpop song is missing
     code 508 : json Cant Find - Pop/Rock song is missing
     code 509 : json Cant Find - Teen Pop song is missing
     code 200 : json ok

   @i.e
      https://hiptop.herokuapp.com/getRandomFromGenre
*/
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

/*
   addFollower
     adds follower to artist
     both sides gets updated

   @type
     POST

   @param
     userId      : String  // User mLabID | This user will follow
     artistId    : String  //Artist mLabID  | this Artist

   @return
     code 505 : json Cant Search for user id
     code 404 : json Already Exists - this user already follows this artist
     code 506 : json Cant Update User - Server Issue
     code 507 : json Cant Search for artist id
     code 508 : json Cant Update Artist - Server Issue
     code 200 : json ok

   @i.e
     https://hiptop.herokuapp.com/addFollower
*/
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
