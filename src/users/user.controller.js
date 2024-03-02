import { response, request } from "express";
import bcryptjs from 'bcryptjs';
import User from './user.model.js';

export const usersGet = async (req = request, res = response) => {
    
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

export const usersPost = async (req, res) => {
    
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

export const usersPut = async (req, res) => {
    const { id } = req.params;
    const { oldPassword, ...resto } = req.body;

    try {

        const user = await User.findById(id);
        const validOldPassword = bcryptjs.compareSync(oldPassword, user.password);
        
        if (!validOldPassword) {
            return res.status(401).json({
                msg: "The old password is invalid. You can't update.",
            });
        }

        if (resto.password) {
            const salt = bcryptjs.genSaltSync();
            resto.password = bcryptjs.hashSync(resto.password, salt);
        }

        await User.findByIdAndUpdate(id, resto);
        const updatedUser = await User.findById(id);

        res.status(200).json({
            msg: 'User successfully updated',
            user: updatedUser
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "Contact the admin.",
        });
    }
}