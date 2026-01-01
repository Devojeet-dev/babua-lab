import mongoose from 'mongoose';   
const POWSchema = new mongoose.Schema({
    title: {
        type: String,
        trim: true,
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", // Links to the User collection
    },
    githubLink: {
        type: String,
        trim: true,
        required: true,
    },
    description: {
        type: String,
        trim: true,
        required: true,
    },
    tags:{
        type: [String],
        trim: true,
        required: true,
    },
    likes: {
        type: Number,
        default: 0,
    },
    projectLink:{
        type: String,
        trim: true,
        required: false,
    }
})

const POWModel = mongoose.model("POW", POWSchema, "POWs");

export default POWModel;    