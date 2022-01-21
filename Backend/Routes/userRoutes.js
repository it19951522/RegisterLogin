const router = require("express").Router();
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
var mail = null;

router.post("/", async (req,res)=>{
    res.send("Test")
})



//register new user
router.route("/register").post(async(req,res)=>{
   
    try{
        const {email,password,verifyPassword} = req.body;

        //validation
        if(!email || !password || !verifyPassword)
            return res.status(400).json({msg : "please enter all required fill"})

        if(password != verifyPassword)
            return res.status(400).json({msg : "please enter same password twice"})

       
        const existingUser = await User.findOne({email});
        if(existingUser)
            return res.status(400).json({msg : "email already exists"})




        //hash password
        const salt =  await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password,salt);
        // console.log(passwordHash);

        mail = email
        
        //create new user
        const newUser = new User({
            
            email,passwordHash
        });

        await newUser.save().then(()=>{
            // res.status(200).send({status:"User Add Success"})
        }).catch(()=>{
            res.status(500).send({status:"Error"})
        })


        //sign the token
        const token = jwt.sign(
            {
            user : newUser._id,
            },process.env.JWT_SECRET
        );
        console.log(token)
        //send the token in the HTTP-only cookie
        res.cookie("token",token,{
            httpOnly : true
        }).send();


    }catch(err){
        console.error(err);
        res.status(500).send();
    }
   
})







//login
router.route("/login").post(async(req,res)=>{
    try{

        const{email,password} = req.body;

        //validate
        if(!email || !password){
            return res.status(400).send({msg : "Please enter required filled"})
        }

        var existingUser = await User.findOne({email});

        if(!existingUser)
            return res.status(400).send({msg : "invalid mail or password"});

        const passwordIsCorrect = await bcrypt.compare(password,existingUser.passwordHash);

        if(!passwordIsCorrect)
            return res.status(400).send({msg : "Invalid mail or password"});



            mail = email
        //sign the token
        const token = jwt.sign(
            {
            user : existingUser._id,
            },process.env.JWT_SECRET
        );


        //send the token in the HTTP-only cookie
        res.cookie("token",token,{
            httpOnly : true
        }).send();

        
    }catch(err){
        console.error(err);
        res.status(500).send();
    }
})




//log out
router.route("/logout").get(async(req,res)=>{
    res.cookie("token","",{
        httpOnly:true,
        expires: new Date(0)
    }).send();
})







router.get("/loggedIn",(req,res)=>{
    try{
        console.log(req.cookies.token);
        const token = req.cookies.token;

        if(!token)
            res.json(null);

        jwt.verify(token,process.env.JWT_SECRET);
        res.send({mail : mail})

    }catch(err){
        console.error(err);
        res.json(null);
    }
})

//fetch users
userRoute.get(
    '/',
    auth,
    expressAsyncHandler(async (req, res) => { 
        const users = await User.find({});

        if (users) {
            res.status(200).json(users);
        }else{
            res.status(500);

            throw new Error('No users found');
        }

    })
);

//profile route
userRoute.get('/profile', auth, asyncHandler(async (req, res) => {
    try{
        const user = await User.findById(req.user._id);

        if(!user) throw new Error('You don t have any profile')
        res.status(200)
        res.send(user)

    } catch (error){
        res.status(500);
        throw new Error('Server')
    }
}) 
);

module.exports = router;