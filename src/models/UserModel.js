const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username: { type: String, required: true},
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    accountNumber: { type: Number, required: true },
    identityNumber: { type: String, required: true },
});

module.exports = mongoose.model("User",userSchema);