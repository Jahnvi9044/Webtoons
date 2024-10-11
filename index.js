
const express = require('express');
const app = express();
const cors = require("cors")
const zod = require('zod');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

const {content_check,zod_1,zod_2,middleware} = require('./middleware');

const {jwt_secret = require('./helper');

//for rate-limiting :
const rate_limiting = require('express-rate-limit');
const { Webtoon, User } = require('./db');

//set rate Limit 
// 1 IP cam make not more than 100 requests in  1 second 
//  if they exceed for more that 100 requests per minute then they will
// receive HTTP 429 Too Many Requests

const limiter = rate_limiting({
    windowsMs: 1*60*1000 , //1 minute = 60 seconds
    max:100,//limit each IP to 100 requests per second
    message:"Too many requests please try again later."
});

//Allpy the rate_limiting middleware to all routes 
app.use(limiter);
app.use(express.json());
app.use(cors());


//routes

app.post('/signup',content_check,zod_2,async function(req,res){
   //Person should typin 
    // username ,password and confirmpassword
    //signup logic 

    try {
      const username = req.body.username;
      const password = req.body.password;
  
      const user = await User.findOne({ username });
      
      if (user) {
        return res.json({ msg: "User Already Exists - you must sign in" });
      } 
      else {
        const hashedPassword = await bcrypt.hash(password, 10);
        await User.create({ username, password: hashedPassword });
  
        //signing up jwt
        const jwt_token = jwt.sign({ username }, jwt_secret);  
        return res.json({ token: jwt_token });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ msg: "Something went wrong", error: error.message });
    }
            
});

app.post('/signin',content_check,zod_1,async function(req,res){
     //signin logic  
     try {
      const username = req.body.username;
      const password = req.body.password;
      
      // Check if the user already exists
      const user = await User.findOne({ username });
      
      if (user) 
      {
        // Assuming password is hashed, use bcrypt for comparison
        const isPasswordValid = await bcrypt.compare(password, user.password);
        
        if (isPasswordValid) 
        {
        
          // Sign JWT token
          const jwt_token = jwt.sign({ username }, jwt_secret);
          res.json({ token: jwt_token });
        } 
        else
        {
          res.json({ msg: "Incorrect password" });
        }
      } 
      else 
      {
        res.json({ msg: "User does not exist, user must signup" });
      }
    } catch (e) {
      console.error(e); 
      res.json({ msg: "Something went wrong", error: e.message });
    }
      //sign jwt token 
            
 });

app.get('/webtoons',async function(req,res){
      //get all the webtoons
     try{
      const toons = await Webtoon.find({});
      
      res.status(200).json({webtoons:toons});
     }
     catch(error)
     {
      res.json({msg:"Server Issue", error:error.message});
     }
});

app.post('/webtoons',middleware,async function(req,res){
      //add a webtoon 
    //   title:String,
    //   description:String,
    //   character:String
  try{
    const title  = req.body.title;
    const description  = req.body.description;
    const character  = req.body.character;
  
    const webtoon = await Webtoon.create({
        title,
        description,
        character,
    });
    
    res.json({msg:"Webtoons added successfully"});
}
catch(error)
{
    console.log("Error in adding a webtoon character");
    res.json({msg:"Server issue",error:error.message});
}
    

});

app.get('/webtoons/:id',async function(req,res){

    try{
     const id = req.params.id;
     const webtoon = await Webtoon.findOne({_id:id});
     res.json({webtoon:webtoon});
    }
    catch(e)
    {
     console.log(e);

     res.json({msg:"Could'nt get",error:e.message});
    }


       //get a specific webtoon 
});

app.delete('/webtoons/:id',middleware,async function(req,res){
       //delete a webtoon 
       try{
       const id = req.params.id;
       const webtoon = await Webtoon.deleteOne({_id:id});
  
       res.json({msg:"Deleted Successfully "  });
       }
       catch(e)
       {
        console.log("Could'nt delete ");
        res.json({msg:"Could'nt get",error:e.message});
       }

});

app.listen(3000);