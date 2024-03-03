import { validationResult } from "express-validator";
import Publication from '../posts/publication.model.js';
import Comment from '../comments/comment.model.js';

export const validateFields = (req, res, next) => {

    const error = validationResult(req);

    if (!error.isEmpty()) {
        return res.status(400).json(error);
    }

    next();
}

export const validateUserUpdate = async (req, res, next) => {
    
    const authorId = req.user.id;

    try {

        const { id } = req.params;
        const publication = await Publication.findOne({_id: id});

        if (!publication) {
            return res.status(404).json({
                msg: 'The post not exists.'
            });
        }

        if (publication.author.toString() !== authorId) {
            return res.status(401).json({
                msg: 'You are not authorized to edit or delete this post.'
            });
        }

        next();
    } catch (error) {
        console.error(error);
        res.status(500).json({
            msg: 'contact the admin'
        });
    }
}

export const validateCommentUpdate = async (req, res, next) => {
    
    const userId = req.user.id;

    try {

        const { id } = req.params;
        const comment = await Comment.findOne({_id: id});

        if (!userId) {
            return res.status(404).json({
                msg: 'The comment not exists.'
            });
        }

        if (comment.userId.toString() !== userId) {
            return res.status(401).json({
                msg: 'You can only modify or delete your comments.'
            });
        }

        next();
    } catch (error) {
        console.error(error);
        res.status(500).json({
            msg: 'contact the admin'
        });
    }
}