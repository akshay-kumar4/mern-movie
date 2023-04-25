import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from "./routes/user.js";
import mediaRoutes from "./routes/media.js";
import personRoutes from "./routes/person.js";
import reviewRoutes from "./routes/review.js";

const app = express();
dotenv.config();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/api/v1/user", userRoutes);
app.use("/api/v1/person", personRoutes);
app.use("/api/v1/reviews", reviewRoutes);
app.use("/api/v1/:mediaType", mediaRoutes);

const connect = () => {
  try {
    mongoose.set("strictQuery", false);
    mongoose.connect(process.env.MONGODB_URL);
  } catch (error) {
    throw error;
  }
};

app.listen(process.env.PORT, () => {
  connect();
  console.log("Running!");
});
