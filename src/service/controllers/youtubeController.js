'use strict';

const
  mongoose = require('mongoose'),
  consts = require('../consts/constring'),
  https = require("https"),
  Song = require('../models/Song'),
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
   searchSongsInYoutube
     This will build search strings to look for YouTube API
     updates each song for [urlSrc] videoID and [imgSrc] image source

     1. Finds all songs
     2. Creates array of search strings
     3. Updates all songs

   @type
     POST

   @param
     -

   @return
     code 504 : json Error Search - cant search songs
     code 507 : json Cant Update - cant update songs
     code 200 : json ok

   @i.e
     https://hiptop.herokuapp.com/searchSongsInYoutube
 */
exports.searchSongsInYoutube = (req,res)=>{
  console.log(`searchSongsInYoutube`);

  let namesRaw = [];

  // Find All Songs for update
  Song.find({

  },collectionFound,
    getArtistAndSongNames,
    lookForYoutube)
    .catch((err,res) => exports.respondError(err,res));

  // Check if exists
  function collectionFound(err,results){
    if(err){
      console.log(`err -> ${err}`);     // Cant search
      console.log(consts.jsonArr[5]);   // Cant search
      res.status(504).json(consts.jsonArr[5]);
    } else {
      console.log(results);
      getArtistAndSongNames(results,res);
    }
  }

  // Merge strings for future search
  function getArtistAndSongNames(results,res){
    for(let i=0 ; i< results.length ; i++){
      let author = results[i].author[0];
      author = author.replace(/ /g,"+");
      console.log(`author -> ${author}`);

      let songName = results[i].title;
      songName = songName.replace(/ /g,"+");
      console.log(`songName -> ${songName}`);

      namesRaw.push(author+"+"+songName);
    }
    lookForYoutube(results, res);
  }

  // Will look in youtube for the modified strings and updates each song
  function lookForYoutube(results, res){
    let collection =[] ;

    // Looking for songs
    for(let i=0 ; i < namesRaw.length ; i++) {
      https.get(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=${namesRaw[i]}&key=AIzaSyDGuqJ6fz8kS_S0IRi2yDc-f2wpEWhVYUg`, (res) => {
            const {statusCode} = res;
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
            res.on('data', (chunk) => {
              rawData += chunk;
            });
            res.on('end', () => {
              try {
                const parsedData = JSON.parse(rawData);
                console.log(parsedData.items[0].id.videoId);
                console.log(parsedData.items[0].snippet.thumbnails.high.url);
                collection.push(parsedData.items[0].id.videoId);

                // Updates Songs
                console.log(`Updating songId -> ${results[i]._id}`);
                let conditions = { _id : results[i]._id }
                  , update = {  urlSrc : parsedData.items[0].id.videoId ,
                                imgSrc : parsedData.items[0].snippet.thumbnails.high.url }
                  , options = { multi: true };
                Song.update(
                  conditions,
                  update,
                  options,
                  (err, result) => {
                    if (err) {
                      console.log(`Cant update song :: err -> ${err}`);
                      return res.status(507).json(consts.jsonArr[9]);
                    } else {
                      console.log(consts.jsonArr[4]);
                    }
                  });
              } catch (e) {
                console.error(e.message);
              }
            });
          }).on('error', (e) => {
            console.error(`Got error: ${e.message}`);
          });
      }

    res.status(200).json(collection);
  }
};
