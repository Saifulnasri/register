const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const UserSchema = new Schema({
    email: {
        type: String,
        required: [true, 'กรุณาระบุอีเมล']
    },
    password: {
        type: String,
        required: [true, 'กรุณาระบุรหัสผ่าน']
    }
});

UserSchema.pre('save', function(next) {
    const user = this;

    bcrypt.hash(user.password, 10).then(hash => {
        user.password = hash;
        next();
    }).catch(error => {
        console.error(error);
    });
});

const User = mongoose.model('User', UserSchema);
module.exports = User;
