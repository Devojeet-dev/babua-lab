import mongoose from 'mongoose';
const patternSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    slug: {
        type: String,
        required: true,
        trim: true,
    },
    difficulty: {
        type: String,
        required: true,
        trim: true,
    },
    karma: {
        type: Number,
        default: 0, // Starts with 0, increases by 50 per pattern
    }
})

const patternModel = mongoose.model("Pattern", patternSchema, "patterns");

export default patternModel;