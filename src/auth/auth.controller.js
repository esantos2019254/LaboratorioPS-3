import bcryptjs from 'bcryptjs';
import User from '../users/user.model.js';
import { generateJWT } from '../helpers/generate-jwt.js';

export const login = async (req, res) => {
    
    const { emailOrUserName, password } = req.body;

    try {
        
        const user = await User.findOne({ 
            $or: [{ email: emailOrUserName }, { userName: emailOrUserName }]
        });

        if(!user){
            return res.status(400).json({
                msg: "Incorrect credentials, Email does not exist in the database",
            });
        }

        const validPassword = bcryptjs.compareSync(password, user.password);

        if(!validPassword) {
            return res.status(400).json({
                msg: "Invalid Password!"
            });
        }

        const token = await  generateJWT(user.id);

        res.status(200).json({
            msg: 'Login Successfully',
            user,
            token
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "Contact the admin",
        });
    }
}