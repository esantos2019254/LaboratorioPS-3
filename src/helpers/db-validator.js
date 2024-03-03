import User from '../users/user.model.js';
import Publication from '../posts/publication.model.js';
import Comment from '../comments/comment.model.js';

export const existsEmail = async (email = '') => {
    
    const existsEmail = await User.findOne({email});

    if(existsEmail){
        throw new Error(`The email ${email} has already been registered`);
    }
}

export const existsUserById = async (id = '') => {
    
    const existsUser = await User.findById(id);
    
    if(!existsUser){
        throw new Error(`The ID: ${id} does not exist`);
    }
}

export const existsPublicationById = async (id = '') => {
    
    const existsPublication = await Publication.findById(id);
    
    if(!existsPublication){
        throw new Error(`The ID: ${id} does not exist`);
    }
}

export const existsCommentById = async (id = '') => {
    
    const existsComment = await Comment.findById(id);
    
    if(!existsComment){
        throw new Error(`The ID: ${id} does not exist`);
    }
}