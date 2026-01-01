import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import { connectDb } from "./src/db/db.js";
import AuthRoute from './src/routes/auth.routes.js'
import UserRoute from './src/routes/user.routes.js'
import powRoute from './src/routes/pow.routes.js'
dotenv.config();

const PORT = process.env.PORT || 5000;
const app = express();

// CORS configuration
const allowedOrigins = [
  "http://localhost:5173",
  "http://10.38.46.25:5173","*"
];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps)
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes('*') || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("CORS Error: Origin not allowed"));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"]
}));

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check route
app.get('/', (req, res) => {
  res.status(200).json({ 
    message: 'Server is running',
    status: 'ok',
    timestamp: new Date().toISOString()
  });
});

// Routes
app.use('/auth', AuthRoute);
app.use('/user', UserRoute);  
app.use('/userPow', powRoute);  

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// MongoDB connection
const startServer = async () => {
  try {
    await connectDb(); // Ensure this is an async function
    app.listen(PORT, () => {
      console.log(`✅ Server running at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("❌ Database connection failed:", error);
    process.exit(1); // Stop the process if DB fails
  }
};

startServer();
