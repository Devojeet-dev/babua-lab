import User from '../models/user.model.js'
import { handleError } from '../utils/handleError.js'
export const getUser = async (req, res, next) => {
    try {
        const userid = req.user._id
        const user = await User.findOne({ _id: userid }).lean().exec()
        if (!user) {
            next(handleError(404, 'user not found.'))
        }
        res.status(200).json({
            success: true,
            user
        })
    } catch (error) {
        next(handleError(500, error.message))
    }
}

export const updateUser = async (req, res, next) => {
    try {
        const userid = req.user._id;
        const { name, githubProfile } = req.body;

        // findByIdAndUpdate takes the ID, the update data, and options
        const updatedUser = await User.findByIdAndUpdate(
            userid,
            { name, githubProfile },
            { new: true, runValidators: true } // 'new: true' returns the modified document
        );

        if (!updatedUser) {
            return next(handleError(404, 'User not found'));
        }

        res.status(200).json({
            success: true,
            message: 'User updated',
            updatedUser
        });
    } catch (error) {
        // It's better to pass the error object directly
        next(handleError(500, error.message));
    }
};

export const getLeaderboard = async (req, res, next) => {
    try {
        const topUsers = await User.find()
            .sort({ karma: -1 })
            .limit(10)
            .select('name karma githubProfile') // Select only necessary fields
            .lean();

        res.status(200).json({
            success: true,
            leaderboard: topUsers
        });
    } catch (error) {
        next(handleError(500, error.message));
    }
};
