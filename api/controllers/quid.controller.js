

// import Quid from "../models/quid.model.js";
// import createError from "../utils/createError.js";

// export const createQuid = async function(req, res, next) {
//     if(!req.isSeller) return next(createError(403, "Only sellers can create a quid!"));
    
//     const newQuid = new Quid ({
//         userId: req.userId,
//         ...req.body,
//     });

//     try{
//         const savedQuid = await newQuid.save();
//         res.status(201).json(savedQuid);
//     }
//     catch(err) {
//         next(err);
//     }
// };

// export const deleteQuid = async function(req, res, next) {
//     try{
//         const quid = await Quid.findById(req.params.id);

//         if(quid.userId !== req.userId) return next(createError(403, "You can only delete your quid!"));

//         await Quid.findByIdAndDelete(req.params.id);
//         res.status(200).send("Quid has been deleted!");
//     }
//     catch(err){
//         next(err);
//     }

// };

// export const getQuid = async function (req, res, next) {
//     try {
//       const quid = await Quid.findById(req.params.id);
//       if (!quid) next(createError(404, "Quid not found!"));
//       res.status(200).send(quid);
//     } catch (err) {
//       next(err);
//     }
//   };

// export const getAllQuids = async function(req, res, next) {
//     const q = req.query;
//     const filters = {
//         ...(q.userId && { userId: q.userId }),
//         ...(q.cat && {cat:  { $regex: q.cat, $options: "i" }}),
//         ...(q.search && {title: { $regex: q.search, $options: "i" }})
//     };

//     try{
//        const quids = await Quid.find(filters).sort({ [q.sort]: -1 });
//        res.status(200).send(quids);
//     }
//     catch(err){
//         next(err);
//     }

// };

import Quid from "../models/quid.model.js";
import createError from "../utils/createError.js";

export const createQuid = async (req, res, next) => {
  if (!req.isSeller)
    return next(createError(403, "Only sellers can create a Quid!"));

  const newQuid = new Quid({
    userId: req.userId,        //userId from JWT
    ...req.body,
  });

  try {
    const savedQuid = await newQuid.save();
    res.status(201).json(savedQuid);
  } catch (err) {
    next(err);
  }
};
export const deleteQuid = async (req, res, next) => {
  try {
    const quid = await Quid.findById(req.params.id);
    if (quid.userId !== req.userId)
      return next(createError(403, "You can delete only your Quid!"));

    await Quid.findByIdAndDelete(req.params.id);
    res.status(200).send("Quid has been deleted!");
  } catch (err) {
    next(err);
  }
};
export const getQuid = async (req, res, next) => {
  try {
    const quid = await Quid.findById(req.params.id);
    if (!quid) next(createError(404, "Quid not found!"));
    res.status(200).send(quid);
  } catch (err) {
    next(err);
  }
};
export const getAllQuids = async (req, res, next) => {
  const q = req.query;
  const filters = {
    ...(q.userId && { userId: q.userId }),
    ...(q.cat && { cat: q.cat }),
    ...((q.min || q.max) && {
      price: {
        ...(q.min && { $gt: q.min }),
        ...(q.max && { $lt: q.max }),
      },
    }),
    ...(q.search && { title: { $regex: q.search, $options: "i" } }),
  };
  try {
    const quids = await Quid.find(filters).sort({ [q.sort]: -1 });
    res.status(200).send(quids);
  } catch (err) {
    next(err);
  }
};


