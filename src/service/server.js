const express = require('express'),
      app = express(),
      bodyParser = require('body-parser'),
      hiptopController = require('./controllers/hiptopController'),
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
app.post('/getAllAlbums', hiptopController.getAllAlbums); // V

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
app.post('/removeAllAlbums',hiptopController.removeAllAlbums);

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
app.post('/saveNewAlbum',hiptopController.saveNewAlbum);

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
app.post('/getAllSongs',hiptopController.getAllSongs);

/*
 getSongsByAlbumName

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
app.post('/getSongsByAlbumName',hiptopController.getSongsByAlbumName);

/*
 saveNewSong

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
app.post('/saveNewSong',hiptopController.saveNewSong);

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
app.post('/removeAllSongs',hiptopController.removeAllSongs);

/*
 signUpUser

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
app.post('/signUpUser',hiptopController.signUpUser);

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
app.post('/removeAllUsers',hiptopController.removeAllUsers);

/*
 getAmountAlbumByGenre
     This endpoint retrieves specific amount of Albums by genre

 @type
     POST

 @param
     genre: String
     amount: Number

 @return
     code 502 : json Unable to Search documents
     code 200 : json albums

 @i.e
     https://hiptop.herokuapp.com/getAmountAlbumByGenre
 */
app.post('/getAmountAlbumByGenre',hiptopController.getAmountAlbumByGenre);

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
app.post('/Login',hiptopController.login);

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
