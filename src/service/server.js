const express = require('express'),
      app = express(),
      bodyParser = require('body-parser'),
      hiptopController = require('./controllers/hiptopController'),
      itunesController = require('./controllers/itunesController'),
      youtubeController = require('./controllers/youtubeController'),
      port = process.env.PORT || 3000,
      path = require("path");

/*
 * app usages
 */
app.use('/',express.static(`${__dirname}/html`)); //for API
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));
app.use( (req,res,next) => {
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept");
    res.set("Content-Type", "application/json");
    next();
});

/*
 * default rout
 */
app.all('*', (req,res,next)=>{  // Global handler
  req.next();
});

app.get('/', (req,res,next) => {
  res.send(`${__dirname}/index.html`);
  req.next();
});

/*** All routes ***/

app.post('/getAllAlbums', hiptopController.getAllAlbums);

app.post('/removeAllAlbums',hiptopController.removeAllAlbums);

// app.post('/saveNewAlbum',hiptopController.saveNewAlbum);

app.post('/getAllSongs',hiptopController.getAllSongs);

app.post('/getSongsByAlbumName',hiptopController.getSongsByAlbumName);

app.post('/saveNewSong',hiptopController.saveNewSong);

app.post('/removeAllSongs',hiptopController.removeAllSongs);

app.post('/signUpUser',hiptopController.signUpUser);

app.post('/removeAllUsers',hiptopController.removeAllUsers);

app.post('/getAmountAlbumByGenre',hiptopController.getAmountAlbumByGenre);

app.post('/Login',hiptopController.login);

app.post('/addLikeToAlbum',hiptopController.addLikeToAlbum);

app.post('/getAllAlbumsConclusion',hiptopController.getAllAlbumsConclusion);

app.post('/getArtistById',hiptopController.getArtistById);

app.post('/addCommentToAlbum',hiptopController.addCommentToAlbum);

app.post('/getAlbumByIdHybrid',hiptopController.getAlbumByIdHybrid);

app.post('/addFollower',hiptopController.addFollower);

app.post('/getRandomFromGenre',hiptopController.getRandomFromGenre);

app.post('/addPopAlbumByName',itunesController.addPopAlbum);

app.post('/searchSongsInYoutube',youtubeController.searchSongsInYoutube);

// app.post('/tempUpdateSongs',hiptopController.tempUpdateSongs);

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
