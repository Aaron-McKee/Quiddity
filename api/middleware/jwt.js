
import jwt from "jsonwebtoken";
import createError from "../utils/createError.js";

export const verifyToken = function(req, res, next) {

const token = req.cookies.accessToken;               //accessToken is inside cookies 
if(!token) return next(createError(401, "You are not authenticated!"));

jwt.verify(token, process.env.JWT_KEY, async(err, payload) => {   //checking the userId inside the token 
    if(err) return next(createError(403, "Token is not valid!")); 
    req.userId = payload.id;
    req.isSeller = payload.isSeller;
    next()
 });
};