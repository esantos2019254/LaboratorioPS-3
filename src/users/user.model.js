import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
    name: {
        type: String,
        require: [true, 'firstName is required']
    },
    lastName: {
        type: String,
        require: [true, 'lastName is required']
    },
    userName: {
        type: String,
        lowercase: true,
        required: [true, 'userName is required']
    },
    email: {
        type: String,
        required: [true, 'emial is required']
    },
    password: {
        type: String,
        required: [true, 'password is required'],
    },
    state: {
        type: Boolean,
        default: true
    }
});

/*UserSchema.methods.toJSON = function(){
    const { __v, password, _id, ...user} = this.toObject();
    user.uid = _id;
    return user;
  }*/

export default mongoose.model('User', userSchema);