import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import createError from "../utils/createError.js";

export const register = async function(req, res, next) {
    
    try {
        const hash = bcrypt.hashSync(req.body.password, 5);

       const newUser = new User({
           ...req.body,                  //spread - take everything inside req.body and override password with hash
           password: hash,
        });   
       

    await newUser.save();
    res.status(201).send("User has been created!");
    
    }  
   catch (err){
        next(err)
    }
};

export const login = async function(req, res, next) {
    try {
      const user = await User.findOne({username: req.body.username});

      if(!user) return next(createError(404, "User not found!"));

      const isCorrect = bcrypt.compareSync(req.body.password, user.password);
      if(!isCorrect) return next(createError(400, "Incorrect password or username!"));

      const token = jwt.sign(
        {
        id: user._id,                            //use user id to determine if isSeller
        isSeller: user.isSeller,                 //can delete quid if isSeller only
        }, 
        process.env.JWT_KEY
      );

      const {password, ...info} = user._doc;       //using cookies helps us reach information that we set with 
      res.cookie("accessToken", token, {           //the token to use everywhere in our app. 
        httpOnly: true,
    })                                             
      
     .status(200).send(info);
  }
    catch (err){
        next(err);
  }
};

export const logout = async function(req, res) {
    res.clearCookie("accessToken", {
      sameSite: "none",
      secure: true,
     }) 
     .status(200).send("User has been logged out!");
   
};

