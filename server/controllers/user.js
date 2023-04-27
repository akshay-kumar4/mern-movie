import User from "../models/User.js";
import jsonwebtoken from "jsonwebtoken";
import bcrypt from "bcrypt";
import responseHandler from "../handler/response.js";

export const signup = async (req, res) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    const checkUser = await User.findOne({ username });
    if (checkUser)
      return responseHandler.badrequest(res, "Username already used");

    const user = new User({ username, password: hash, displayName });
    await user.save();

    const token = jsonwebtoken.sign(
      { data: user.id },
      process.env.TOKEN_SECRET_KEY,
      { expiresIn: "24h" }
    );

    responseHandler.created(res, {
      token,
      ...user._doc,
      id: user.id,
    });
  } catch (error) {
    responseHandler.error(res);
  }
};

export const signin = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) return responseHandler.badrequest(res, "User not exist");

    const isCorrect = await bcrypt.compare(password, user.password);
    if (!isCorrect) return responseHandler.badrequest(res, "Wrong Credentials");

    const token = jsonwebtoken.sign(
      { data: user.id },
      process.env.TOKEN_SECRET_KEY,
      { expiresIn: "24h" }
    );

    responseHandler.created(res, {
      token,
      ...user._doc,
      id: user.id,
    });
  } catch (error) {
    responseHandler.error(res);
  }
};

export const updatePassword = async (req, res) => {
  try {
    const { password, newPassword } = req.body;

    const user = await User.findById(req.user.id);
    if (!user) return responseHandler.badrequest(res);

    const isCorrect = await bcrypt.compare(password, user.password);
    if (!isCorrect) return responseHandler.badrequest(res, "Wrong Credentials");

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(newPassword, salt);

    const updatedPassword = await user.updateOne(
      { $set: { ...user, password: hash } },
      { new: true }
    );

    responseHandler.ok(res, {
      updatedPassword,
      ...user._doc,
    });
  } catch (error) {
    responseHandler.error(res);
  }
};

export const getInfo = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return responseHandler.badrequest(res);

    responseHandler.ok(res, user);
  } catch (error) {
    responseHandler.error(res);
  }
};
