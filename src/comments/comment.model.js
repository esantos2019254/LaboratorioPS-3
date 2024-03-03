import mongoose from "mongoose";

const commentSchema = mongoose.Schema({
    comment: {
        type: String,
        required: [true, 'Comment is required']
    },
    publicationId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Publication',
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    state: {
        type: Boolean,
        default: true
    }
});

export default mongoose.model('Comment', commentSchema);