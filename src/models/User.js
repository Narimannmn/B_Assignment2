const mongoose = require('mongoose');
const Schema = mongoose.Schema
const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    role:{type:String, default:"User"},
    creationDate: { type: Date, default: Date.now },
    history: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'RequestHistory',
        },
    ],
});

userSchema.pre('save', async function(next) {
    next();
});

const User = mongoose.model('User', userSchema);
module.exports = User;