const express = require('express'),
      app = express(),
      bodyParser = require('body-parser'),
      hiptopController = require('./controllers/hiptopController'),
      itunesController = require('./controllers/itunesController'),
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
     genre    : String
     amount   : Number

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
app.post('/addLikeToAlbum',hiptopController.addLikeToAlbum);

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
app.post('/getAllAlbumsConclusion',hiptopController.getAllAlbumsConclusion);

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
app.post('/getArtistById',hiptopController.getArtistById);

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
app.post('/addCommentToAlbum',hiptopController.addCommentToAlbum);

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
app.post('/getAlbumByIdHybrid',hiptopController.getAlbumByIdHybrid);

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
app.post('/addFollower',hiptopController.addFollower);

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
app.post('/getRandomFromGenre',hiptopController.getRandomFromGenre);

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
app.post('/addPopAlbumByName',itunesController.addPopAlbum);

// app.post('/tempUpdateSongs',hiptopController.tempUpdateSongs);

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
