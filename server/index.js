import express from "express";
import cors from "cors";
import dotenv from "dotenv"
import cookieParser from "cookie-parser";
import { pool } from "./config/db.js";
import { protect } from "./middleware/protect.js";
import authRoutes from "./auth-routes/auth.js"

dotenv.config();

const app = express();

app.use(cors({
	origin: process.env.CLIENT_URL || "http://localhost:5173", //default
	credentials: true, // enabling cookies to be sent to requests
}));
app
app.use(express.json());
app.use(cookieParser());
app.use("/api/auth", authRoutes)

app.post("/save-location", protect, async (req, res) => {
  try {
    const { location_name } = req.body;

    const newSavedLocation = await pool.query("INSERT INTO saved_locations(location_name, user_id) VALUES ($1, $2) RETURNING *", [location_name, req.user.user_id]);

    res.status(201).json(newSavedLocation.rows[0]);
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

app.get("/saved-locations", protect, async (req, res) => {
  try {
    const showSavedLocations = await pool.query("SELECT * FROM saved_locations WHERE user_id = $1", [req.user.user_id]);

    res.status(201).json({message: showSavedLocations})
  } catch (err) {
    res.status(500).json({message: "Error on our end"})
  }
})

app.listen(5000, (req, res) => {
  console.log("works")
})