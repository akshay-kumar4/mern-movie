import User from "../models/User.js";
import jwt from "jsonwebtoken";
import responseHandler from "../handler/response.js";

const tokenDecode = (req) => {
  try {
    const bearerHeader = req.headers["authorization"];
    if (bearerHeader) {
      const token = bearerHeader.split(" ")[1];
      return jwt.verify(token, process.env.TOKEN_SECRET_KEY);
    }
    return false;
  } catch (error) {
    return false;
  }
};

const auth = async (req, res, next) => {
  const tokenDecoded = tokenDecode(req);
  if (!tokenDecoded) return responseHandler.unauthorize(res);
  const user = await User.findById(tokenDecoded.data);
  if (!user) return responseHandler.unauthorize(res);
  req.user = user;
  next();
};

export default { auth, tokenDecode };
