const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/userModel');

exports.signing = async (req, res) => {
    console.log("signing",req.body);
    try {
        const { username, password } = req.body;
        
        const user = await User.findOne({ username }).select('+password');
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

        res.status(200).json({ token });
    } catch (error) {
        console.log("error",error);
        res.status(500).json({ message: error.message });
    }
};


exports.signup = async (req, res) => {
   
    try {
        const { username, password, role } = req.body;
       

        const user = await User.create({ username, password, role });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

        res.status(201).json({ token });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
