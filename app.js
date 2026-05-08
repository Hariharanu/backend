/* eslint-disable no-undef */
import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import authRoute from "./Routes/authRoute.js";
import doctorRoute from "./Routes/doctorRoute.js";

dotenv.config();

console.log("Environment:", process.env.NODE_ENV);
const app = express();
app.use(cors());
app.use(helmet());
app.use(bodyParser.json());
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms")
);
app.get("/", (req, res, next) => {
  res.status(200).json({
    message: "API is working hello word",
  });
});
app.use("/auth", authRoute);
app.use("/api/doctor", doctorRoute);

app.delete("/auth", (req, res) => {
  res.status(200).json({ message: "Delete request received" });
});


app.use((err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }
  if (err.statusCode) {
    return res.status(err.statusCode).json({ message: err.message });
  }
  console.error(err);
  return res.status(500).json({ message: "Internal server error" });
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log("Server is running on port 3000");
    });
  })
  .catch((err) => {
    console.log(err);
  });
