import express from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import myUserRoute from "./routes/MyUserRoute";

mongoose.connect(process.env.MONGODB_CONNECTIONS_STRING as string).then(() => {
  console.log("Connected to MongoDB");
});

const app = express();

// middleware
app.use(express.json());
app.use(cors());

// Routes
app.use("/api/my/user", myUserRoute);

app.listen(3000, () => {
  console.log("Server is running on PORT: 3000 - http://localhost:3000/");
});
