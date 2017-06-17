
const express = require('express'),
      app = express(),
      bodyParser = require('body-parser'),
      hiptopController = require('./controllers/hiptopController'),
      port = process.env.PORT || 3000,
      path = require("path"),
      mainRoute = __dirname;


// app.set('port',port);
// app.use('/', express.static('./public')); //for API
// app.use(
//     (req,res,next) => {
//     res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept");
//   res.set("Content-Type", "application/json");
//   next();
// });

/*
 * app usages
 */
//app.use(express.static('./public')); //for API
app.use(express.static(mainRoute));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));
app.use( (req,res,next) => {
    // console.log(`mainRoute: ${mainRoute}`);
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept");
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
app.get('/getAllAlbums', hiptopController.getAllAlbums);


app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
