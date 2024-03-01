import User from '../users/user.model.js';

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