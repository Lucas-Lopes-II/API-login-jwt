const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
    const selectedUser = await User.findOne({ email: req.body.email });
    if(selectedUser) return res.status(400).send('Email already exists');

    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password)
    });

    try{
        const savedUser = await user.save();
        res.send(savedUser);
    }catch(err){
        res.status(404).send(err.message);
    };
};

const login = async (req, res) => {
    const selectedUser = await User.findOne({ email: req.body.email });
    if(!selectedUser) return res.status(400).send('Email or Password incorrect');

    const passwordAndUserMatch = bcrypt.compareSync(req.body.password, selectedUser.password);
    if(!passwordAndUserMatch) return res.status(400).send('Email or Password incorrect');

    const token = jwt.sign({ _id: selectedUser._id }, process.env.SECRET_TOKEN);
    res.header('authorization-token', token);

    res.send('User logged');
};

module.exports = { register, login };