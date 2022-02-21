const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true, minLength: 3, maxLength: 50 },
    email: { type: String, required: true, minLength: 3, maxLength: 100 },
    password: { type: String, required: true, minLength: 6, maxLength: 200 },
    createsdAt: { type: Date, default: Date.now },
    admins: { type: Boolean, default: false }
});

module.exports = mongoose.model('User', userSchema);