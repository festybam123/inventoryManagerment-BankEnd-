// const {findone} = require('../model/userModel');
const user = require('../model/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


exports.createUser = async (req, res) => {
   try{
    const {name,email,password,role,phone} = req.body;

    // Check if user already exists
    const existingUser = await user.findOne({ email });
    if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
    }

    const existingPhone = await user.findOne({ phone });
    if (existingPhone) {
        return res.status(400).json({ message: 'Phone number already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the user
    const User = await user.create({
        name,
        email,
        password: hashedPassword,
        role,
        phone,
    });

    res.status(201).json({message: 'User created successfully'});
   }
   catch(error)
   {
    res.status(500).json({message: 'unable to create user'});
   }
};

//login user
exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await user.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }
        // Compare passwords
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        //generate token
        const token = jwt.sign(
            {
            userId: user._id,
            role: user.role
        }, 
        process.env.JWT_SECRET, //jsonwebtoken
         { expiresIn: '1h' });

        res.json({
            message: 'Login successful',
            token,
            user: {
                id: user._id,
                name: user.name,
                role: user.role,
            }
        });

    } catch (error) {
        res.status(500).json({ message: 'error message' });
    }
};