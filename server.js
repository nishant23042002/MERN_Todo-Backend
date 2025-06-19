import express from "express"
import dotenv from "dotenv"
import todoRoutes from "./routes/todoRoutes.route.js";
import connectDB from "./DB.js";
import cors from "cors"
dotenv.config();

// Validate required environment variables
if (!process.env.MONGO_URI) {
    console.error("❌ MONGO_URI not found in environment variables.");
    process.exit(1);
}


const app = express();
app.use(express.json());
app.use(cors());

connectDB();

app.use("/api/todo", todoRoutes)
app.use((req, res) => {
    res.status(404).json({ error: "Route not found" });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    error: err.message || "Internal Server Error",
  });
});



const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
})