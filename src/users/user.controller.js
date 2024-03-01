import { response, request } from "express";
import bcryptjs from 'bcryptjs';
import User from './user.model.js';

export const usersGet = async () => {
    
    const { limite, desde } = req.query;
    const query = { state: true };

    const [total, users] = await Promise.all([
        User.countDocuments(query),
        User.find(query)
        .skip(Number(desde))
        .limit(Number(limite))
    ]);

    res.status(200).json({
        total,
        users
    });
}

export const usersPost = async () => {
    
    const { name, lastName, userName, email, password } = req.body;
    const user = new User({name, lastName, userName, email, password});

    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync(password, salt);

    await user.save();

    res.status(200).json({
        user
    });
}

export const getUserById = async (req, res) => {
    
    const { id } = req.params;
    const user = await User.findOne({_id: id});

    res.status(200).json({
        user
    });
}

export const usersPut = async (req, res = response) => {

    const { id } = req.params;
    const {_id, email, estado, ...resto} = req.body;

    if(password){
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password, salt);
    }

    await User.findByIdAndUpdate(id, resto);

    const user = await User.findOne({_id: id});

    res.status(200).json({
        msg:'User Successfully Update',
        user
    });
}