import User from "../models/user.model.js";
import createError from "../utils/createError.js";


export const deleteUser = async function(req, res, next) {
    const user = await User.findById(req.params.id);
    
         if(req.userId !== user._id.toString()) {
            return next(createError(403, "You can delete only your account!"));
         }
         await User.findByIdAndDelete(req.params.id);
         return res.status(200).send("User Deleted");                      
     
};

export const getUser = async function(req, res, next) {
   const user = await User.findById(req.params.id);
   
       
        return res.status(200).send(user);                      
    
};
    
    