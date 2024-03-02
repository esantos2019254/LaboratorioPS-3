import { validationResult } from "express-validator";
import Publication from '../posts/publication.model.js';

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