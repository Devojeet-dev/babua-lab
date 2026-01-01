import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  // Babua Special: Engineering Growth Tracking
  karma: {
    type: Number,
    default: 0, // Starts with 0, increases by 50 per pattern
  },
  githubProfile: {
    type: String, // Link to their GitHub for "Proof of Work"
    trim: true,
  },
  masteredPatterns: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Pattern", // Links to the Pattern collection
    },
  ],
  role: {
    type: String,
    enum: ["student", "admin"],
    default: "student",
  }
}, { timestamps: true }); // Tracks when the Babua joined

const User = mongoose.model("User", userSchema, "users");

export default User;