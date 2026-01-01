import { handleError } from "../utils/handleError.js";
import POWModel from '../models/pow.model.js'

export const addPow = async (req, res, next ) => {
    try {
        // 1. Change 'desc' to 'description' to match frontend & schema
        const { title, description, tags, githubLink, projectLink } = req.body;

        const newPow = new POWModel({
            title,
            description, 
            tags,
            githubLink,
            projectLink,
            user: req.user._id // 2. IMPORTANT: Attach the user ID from auth middleware
        });

        await newPow.save();
        
        // 3. Return a consistent object structure
        res.status(201).json({
            success: true,
            project: newPow
        });
    } catch (error) {
       next(handleError(500, error.message));
    }
}

export const getPow = async (req, res, next) => {
    try {
        // 1. Filter by the user ID attached by your verifyJWT middleware
        // 2. Sort by 'createdAt' descending so newest projects appear first
        const projects = await POWModel.find({ user: req.user._id })
            .sort({ createdAt: -1 })
            .lean()
            .exec();

        // 3. Return 'projects' to match the frontend state update logic
        res.status(200).json({
            success: true,
            message: 'Engineering registry synchronized',
            projects, // Changed from 'pows' to 'projects'
        });
    } catch (error) {
        console.error("Fetch POW Error:", error);
        // Ensure handleError sends a valid response to prevent "Pending" status
        if (typeof handleError === 'function') {
            next(handleError(500, error.message));
        } else {
            next(handleError(500, error.message));
        }
    }
}