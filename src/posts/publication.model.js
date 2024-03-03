import mongoose from "mongoose";

const publicationSchema = mongoose.Schema({
    tittle: {
        type: String,
        require: [true, 'title is required']
    },
    mainText: {
        type: String,
        require: [true, 'the main text is required']
    },
    category: {
        type: String,
        require: [true, 'the category is required']
    },
    author: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', required: true
    },
    comments: [{ 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
    }],
    state: {
        type: Boolean,
        default: true
    }
});

export default mongoose.model('Publication', publicationSchema);