var mongoose = require('mongoose'),
  schema = mongoose.Schema,
  userSchema = new schema({
    // id : {type: Number, index:1, required:true, unique:true ,default:601, min : 600},
    name: String,
    title: String, // Artist Only : Stage Name
    email: {type: String,index:1, required:true, unique:true},
    password: String,
    typeEnum: String, // ENUM { User , Artist }
    albumId: [Number], // Artist Albums, User PlayList
    likeAlbum: [Number], // User Usage Only
    follow: [String], // User Following Artist email, Artist Get follow by User email
    imgSrc: String, // Personal Pic
    googleId: String,
    preferedGenre: [String] // User Usage Only
  }, {collection: 'user'}),
  UserSchema = mongoose.model('UserSchema', userSchema);

module.exports = UserSchema;

// TODO : need to verify inputs
// userSchema.pre('save',(next)=>{
//   UserSchema.findByIdAndUpdate(
//     { id: 'entityId' },
//     { $inc: { seq: 1} }
//   )
// });


// userSchema.path('email').validate(
//   (val)=>{
//     // return false;
//     console.log(`validating email : ${val}`);
//     UserSchema.findOne({
//       email : val
//     },(err,result)=>{
//       if(!result){
//         console.log("!result -> "+result);
//         return true;
//       }
//       if(err){
//         console.log(`err -> Cant search for ${val}, err -> ${err}`);
//         //return false;
//       }
//       if(result){
//         console.log(`result -> Email already exists for ${result}`);
//         //return false;
//       }
//       // return true;
//     });
//   },`Unable to create new user with this email`);

userSchema.path('email').set(
  (val)=>{
    return String(val).toLowerCase();
  });
