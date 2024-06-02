const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    firstname:{
        type: String,
        required: true
    },
    lastname:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    status:{
        type: Boolean,
        default: true
    },
    lastseen:{
        type:Date,
        // required: true
    } 
},

{
    timestamps: true,
    toObject: {
        virtuals: true,
    },
    toJSON: {
        virtuals: true,
    }
}
);

const User = mongoose.model('User', UserSchema);

module.exports = User;
