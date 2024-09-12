import express, { Request, Response } from "express";
import cors from "cors";
import "dotenv/config";

const app = express();

// middleware
app.use(express.json());
app.use(cors());

app.get("/test", async (req: Request, res: Response) => {
  res.json({
    message: "Hello World",
  });
});

app.listen(3000, () => {
  console.log("Server is running on PORT: 4000 - http://localhost:3000/");
});
