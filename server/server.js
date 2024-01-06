import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "../server/config/db.js";
import userRoutes from "./routes/userRoutes.js";
dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/users", userRoutes);

app.get("/", (req, res) => {
  res.send("API is running....");
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, console.log(`Server running  on port ${PORT}`));
