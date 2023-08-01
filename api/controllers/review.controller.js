import createError from "../utils/createError.js";
import Review from "../models/review.model.js";
import Quid from "../models/quid.model.js";

export const createReview = async (req, res, next) => {
  if (req.isSeller)
    return next(createError(403, "Sellers can't create a review!"));

  const newReview = new Review({
    userId: req.userId,
    quidId: req.body.quidId,
    desc: req.body.desc,
    star: req.body.star,
  });

  try {
    const review = await Review.findOne({
      quidId: req.body.quidId,
      userId: req.userId,
    });

    if (review)
      return next(
        createError(403, "You have already created a review for this quid!")
      );

    //TODO: check if the user purchased the gig using Order model.

    const savedReview = await newReview.save();

    await Quid.findByIdAndUpdate(req.body.quidId, {
      $inc: { totalStars: req.body.star, starNumber: 1 },       //mongodb increment method
    });
    res.status(201).send(savedReview);
  } catch (err) {
    next(err);
  }
};

export const getReviews = async (req, res, next) => {
  try {
    const reviews = await Review.find({ quidId: req.params.quidId });
    res.status(200).send(reviews);
  } catch (err) {
    next(err);
  }
};
export const deleteReview = async (req, res, next) => {
  try {
  } catch (err) {
    next(err);
  }
};