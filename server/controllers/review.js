import Review from "../models/Review.js";
import responseHandler from "../handler/response.js";

export const create = async (req, res) => {
  try {
    const { movieId } = req.params;
    const review = new Review({
      user: req.user.id,
      movieId,
      ...req.body,
    });

    await review.save();

    responseHandler.created(res, {
      ...review._doc,
      id: review.id,
      user: req.user,
    });
  } catch {
    responseHandler.error(res);
  }
};

export const remove = async (req, res) => {
  try {
    const { reviewId } = req.params;
    const review = await Review.findOne({
      _id: reviewId,
      user: req.user.id,
    });

    await review.deleteOne();

    responseHandler.ok(res);
  } catch {
    responseHandler.error(res);
  }
};

export const reviewsList = async (req, res) => {
  try {
    const reviews = await Review.find({
      user: req.user.id,
    }).sort("-createdAt");

    responseHandler.ok(res, reviews);
  } catch {
    responseHandler.error(res);
  }
};
