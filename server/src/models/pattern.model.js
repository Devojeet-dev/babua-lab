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
        unique: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        enum: ['DSA', 'DBMS', 'Networking', 'OS'],
        default: 'DSA'
    },
    difficulty: {
        type: String,
        enum: ['Beginner', 'Intermediate', 'Advanced', 'Expert'],
        default: 'Beginner'
    },
    karmaPoints: {
        type: Number,
        default: 50,
    },
    content: {
        videoUrl: String,
        theoryMarkdown: String, // Detailed conceptual explanation
        realWorldUseCase: String, // "How Instagram/Netflix uses this"
        projectBrief: String, // "Build a Rate Limiter"
    },
    prerequisites: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Pattern'
    }]
}, { timestamps: true });

const patternModel = mongoose.model("Pattern", patternSchema, "patterns");

export default patternModel;
