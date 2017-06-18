const express = require('express'),
      app = express(),
      bodyParser = require('body-parser'),
      hiptopController = require('./controllers/hiptopController'),
      port = process.env.PORT || 3000,
      path = require("path"),
      mainRoute = __dirname+'/html';


/*
 * app usages
 */
app.use('/',express.static('./public')); //for API
app.use(express.static(mainRoute));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));
app.use( (req,res,next) => {
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept");
    res.set("Content-Type", "application/json");
    next();
});

/*
 * default rout
 */
app.get('/', (req,res,next) => {
  res.sendFile(path.join((__dirname,'index.html')));
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
app.post('/getAllAlbums', hiptopController.getAllAlbums);

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


app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
