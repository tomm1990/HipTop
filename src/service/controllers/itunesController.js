'use strict';

const
  mongoose = require('mongoose'),
  consts = require('../consts/constring'),
  https = require("https"),
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
   addPopAlbum
     This search the album of the specified artist name (Input:String)
     in the iTunes API

     1. Creates New Album
     2. Creates related Songs to the album
     3. Update Album
     4. Creates New User (as the album Artist:User)

   @type
     POST

   @param
     name      : String    // Artist Name separated with '+'
                           // i.e 'Lindsay+Lohan'

   @return
     code 501 : json Error saving - cant save new album
     code 507 : json Cant Update - Album with songs
     code 508 : json Cant Save - Artist as new user
     code 509 : json Cant Update - Album with artist
     code 200 : json ok

   @i.e
     https://hiptop.herokuapp.com/addPopAlbum
       { name : Lindsay+Lohan }
 */
exports.addPopAlbum = (req,res1)=>{
  console.log(`addPopAlbum()`);
  console.log(`req.body.name -> ${req.body.name}`);

  // Search query for itunes api
  https.get(`https://itunes.apple.com/search?term=${req.body.name}&entity=album&limit=1`, (res) => {
    const { statusCode } = res;
    const contentType = 'application/json';

    // Catch errors
    let error;
    if (statusCode !== 200) {
      error = new Error('Request Failed.\n' +
        `Status Code: ${statusCode}`);
    } else if (!/^application\/json/.test(contentType)) {
      error = new Error('Invalid content-type.\n' +
        `Expected application/json but received ${contentType}`);
    }
    if (error) {
      console.error(error.message);
      res.resume();
      return;
    }

    // Parse json data
    res.setEncoding('utf8');
    let rawData = '';
    res.on('data', (chunk) => { rawData += chunk; });
    res.on('end', () => {
      try {
        const parsedData = JSON.parse(rawData);
        console.log(parsedData);
        addAlbumFromItunes(rawData,res1);
      } catch (e) {
        console.error(e.message);
      }
    });
  }).on('error', (e) => {
    console.error(`Got error: ${e.message}`);
  });
};

// Starts adding Albums from Itunes API response
function addAlbumFromItunes(rawData,res1){ // Creates new Album
  const parsedData = JSON.parse(rawData).results[0];

  // New Album Object
  let newAlbum = new Album({
    author: [],
    title: parsedData.collectionName,
    urlSrc: parsedData.artworkUrl100,
    likes: [],
    genre: parsedData.primaryGenreName,
    imgUrl: parsedData.artworkUrl100,
    comment: [],
    songId: [],
    iartistId : parsedData.artistId,
    icollectionId : parsedData.collectionId,
    iamgArtistId : parsedData.amgArtistId
  });

  // Save new album
  newAlbum.save(
    (err,savedAlbum) => {
      if(err) { // Error saving
        console.log(`Error saving :: err -> ${err}`);
        return res.status(501).send(consts.jsonArr[3]);
      }
      else {
        console.log(consts.jsonArr[4]);
        return addSongsToAlbum(savedAlbum,res1);
      }
    }
  ).catch((err,res) => exports.respondError(err,res));
}

// Creates and Add Songs - Part 1
function addSongsToAlbum(newAlbum,res1){
  // Search query for itunes api - by album id
  https.get(`https://itunes.apple.com/lookup?id=${newAlbum.icollectionId}&entity=song`, (res) => {
    const { statusCode } = res;
    const contentType = 'application/json';

    // Catch errors
    let error;
    if (statusCode !== 200) {
      error = new Error('Request Failed.\n' +
        `Status Code: ${statusCode}`);
    } else if (!/^application\/json/.test(contentType)) {
      error = new Error('Invalid content-type.\n' +
        `Expected application/json but received ${contentType}`);
    }
    if (error) {
      console.error(error.message);
      res.resume();
      return;
    }

    // Parse json data
    res.setEncoding('utf8');
    let rawData = '';
    res.on('data', (chunk) => { rawData += chunk; });
    res.on('end', () => {
      try {
        const parsedData = JSON.parse(rawData);
        console.log(parsedData);
        createSongsAndSaveToAlbum(rawData,newAlbum,res1);
      } catch (e) {
        console.error(e.message);
      }
    });
  }).on('error', (e) => {
    console.error(`Got error: ${e.message}`);
  });
}

// Creates and Add Songs - Part 2
function createSongsAndSaveToAlbum(rawData,newAlbum,res){
  const parsedData = JSON.parse(rawData);
  console.log(`createSongsAndSaveToAlbum(parsedData) -> ${parsedData.results[1].trackName}`);

  let wrapper = [];

  // Creates new songs and push them into array -> wrapper
  for(let i=1 ; i < parsedData.results.length-1 ; i++){
    //wrapper.push(JSON.stringify(parsedData.results[i]));
    // console.log(`artistId -> ${parsedData.results[i].artistId}`);
    // console.log(`collectionId -> ${parsedData.results[i].collectionId}`);
    // console.log(`trackId -> ${parsedData.results[i].trackId}`);
    // console.log(`trackName -> ${parsedData.results[i].trackName}`);
    // console.log(`artistName -> ${parsedData.results[i].artistName}`);
    // console.log(`collectionName -> ${parsedData.results[i].collectionName}`);
    // console.log(`artworkUrl100 -> ${parsedData.results[i].artworkUrl100}`);
    // console.log(`primaryGenreName -> ${parsedData.results[i].primaryGenreName}`);
    // console.log(`trackTimeMillis -> ${parsedData.results[i].trackTimeMillis}`);

    let time = msToTime(parsedData.results[i].trackTimeMillis),

     newSong = new Song({
      // id : _id, // Auto Generated
      author:   [parsedData.results[i].artistName],
      title:    parsedData.results[i].trackName,
      urlSrc:   parsedData.results[i].artworkUrl100,
      imgSrc:   parsedData.results[i].artworkUrl100,
      length:   time,
      genre :   parsedData.results[i].primaryGenreName
    });

    wrapper.push(newSong);
  }

  // Saves the array in the Songs collection
  Song.create(wrapper, (err, result) => {
    if(err){
      console.log(err);
      return res.status(501).send(consts.jsonArr[3]);
    } else {
      console.log(consts.jsonArr[4]);
    }
  });

  // Collects songsId to put into Album
  let songsIds = [];
  for(let i=0;i<wrapper.length;i++){
    songsIds.push(wrapper[i]._id);
  }

  // Updates Album
  let conditions = { _id : newAlbum._id }
    , update = {  songId : songsIds }
    , options = {multi: true};
  Album.update(
    conditions,
    update,
    options,
    (err, result) => {
      if (err) {
        console.log(`Cant update albumid ${newAlbum._id} :: err -> ${err}`);
        return res.status(507).json(consts.jsonArr[9]);
      } else {
        console.log(consts.jsonArr[4]);
      }
    });

  // Parse email address and password to init Artist as User
  let emailAdressRaw = String(parsedData.results[0].artistName);
  emailAdressRaw = emailAdressRaw.replace(" ","");
  let password, emailAdress = String(emailAdressRaw).toLowerCase();
  password = emailAdress;
  emailAdress = emailAdress+"@"+emailAdress+".com";

  // New Artist as User object
  let newUser = new User({
    name:           parsedData.results[0].artistName,
    title:          parsedData.results[0].artistName,
    email:          emailAdress,
    password:       password,
    typeEnum:       "Artist",
    albumId:        [newAlbum._id],
    likeAlbum:      [],
    follow:         [],
    imgSrc:         parsedData.results[0].artworkUrl100,
    googleId:       "",
    preferedGenre:  [parsedData.results[0].primaryGenreName]
  });

  // Saves the new Artist
  newUser.save({

  },(err,result)=>{
    if(err){
      console.log(`Cant Save Artist ${parsedData.results[0].artistName}:: err -> ${err}`);
      return res.status(508).json(consts.jsonArr[3]);
    } else {
      console.log(consts.jsonArr[4]);
      let conditions = { _id : newAlbum._id }
        , update = {  $push : {author : result._id} }
        , options = {multi: true};
      Album.update(
        conditions,
        update,
        options,
        (err, result) => {
          if (err) {
            console.log(`Cant update Album ${newAlbum._id} with Aritst ${result._id} :: err -> ${err}`);
            return res.status(509).json(consts.jsonArr[9]);
          } else {
            console.log(consts.jsonArr[4]);
            return res.status(200).send(result);
          }
        });
    }
  });
}

function msToTime(s) {
  let ms = s % 1000;
  s = (s - ms) / 1000;
  let secs = s % 60;
  s = (s - secs) / 60;
  let mins = s % 60;
  let hrs = (s - mins) / 60;

  return mins + ':' + secs;
}
