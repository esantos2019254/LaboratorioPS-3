import { response, request } from "express";
import Publication from "../posts/publication.model.js";
import User from "../users/user.model.js";
import Comment from "./comment.model.js"

export const commentsGet = async (req = request, res = response) => {

    const { limite, desde } = req.query;
    const query = { state: true };

    const [total, comments] = await Promise.all([
        Comment.countDocuments(query),
        Comment.find(query)
            .skip(Number(desde))
            .limit(Number(limite))
    ]);

    res.status(200).json({
        total,
        comments
    });
}

export const commentsPost = async (req, res) => {

    const { publicationId ,comment } = req.body;
    const userId = req.user.id;

    const comments = new Comment({comment, publicationId, userId: userId});

    await comments.save();

    res.status(200).json({
        comments
    });
}

export const getCommentById = async (req, res) => {

    const { id } = req.params;
    const comments = await Comment.findOne({_id: id});

    res.status(200).json({
        comments
    });
}

export const commentsPut = async (req, res) => {

    const { id } = req.params;
    const { _id, state, publicationId, userId, ...resto} = req.body;

    await Comment.findByIdAndUpdate(id, resto);
    const comments = await Comment.finOne({_id: id});

    res.status(200).json({
        msg: 'Comment successfully updated',
        comments
    });
}

export const commentDelete = async (req, res) => {

    const { id } = req.params;
    
    await Comment.findByIdAndUpdate(id, { state: false });
    const comments = await Comment.findOne({ _id: id });

    res.status(200).json({
        msg: 'Comment successfully delete',
        comments
    });

}