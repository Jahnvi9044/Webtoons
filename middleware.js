
const jwt = require('jsonwebtoken');
const jwt_secret = require('./helper');
const zod = require('zod');

function content_check(req,res,next){
    const schema = zod.string().trim();
    const username = req.body.username;

    const c = schema.safeParse(username);
    if(c.success)
    {
        next()
    }
    else {
       res.json({msg:"Username is not valid "});
    }
}

function zod_2(req,res,next){
   const  password_schema =  zod
      .string({
        required_error: 'Required',
      })
      .min(8, { message: 'min 8' });
   
    const password = req.body.password ;
    const password_chk  = password_schema.safeParse(password); 

    const password_confirm = req.body.confirm;
    const password_confirm_chk = password_schema.safeParse(password_confirm);

    if(password_chk.success && password_confirm_chk.success)
        {
            if(password === password_confirm)
                next();
            else 
              res.json({msg:"password should match confirm password "});
                
        }
        else 
        res.json({msg:"Invalid Password "})
  
   
}
function zod_1(req,res,next){
    const  password_schema =  zod
       .string({
         required_error: 'Required',
       })
       .min(8, { message: 'min 8' });

       const password = req.body.password ;
       const password_chk  = password_schema.safeParse(password); 

       if(password_chk.success )
        {
                next();      
        }
        else 
        {
             res.json({msg:"Invalid password"});
        }
    }
    

function middleware(req,res,next){
      
   //here i have to verify the token 
   let token_string ;
try{
   token_string = req.headers.authorization;
  
  
   const token_arr = token_string.split(" ");
   const token  = token_arr[1];
 
   const decode = jwt.decode(token);

   if(decode)
   {
    const verify = jwt.verify(token,jwt_secret);
    if(verify)
    {
        next();
    }
    else 
      res.status(403).json("Admin not authenticated ");
   }
   else 
     res.json("Wrong token - not decodeable");

}
catch(e)
{
    if(token_string==undefined)
        {     
          res.json({msg:"User must signin before adding or deleting post "});
        }
    else{ 
    console.log("Something went wrong");
    res.status(500).json({msg:"Server Error"});
        }
  }



}

module.exports = 
{  content_check,
    zod_1,
    zod_2,
    middleware
}