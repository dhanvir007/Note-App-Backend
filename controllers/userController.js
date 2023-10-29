const User = require('../models/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
//@desc User Register
//@route /user/Register
//@access public

const userRegister = async (req, res) => {
    try {

        const { username, email, mobile, password } = req.body;
        if (!username || !email || !mobile || !password) {
            return res.status(404).json({ message: "All feilds are mandatory" })
        }

        const userAvailable = await User.findOne({ email })
        if (userAvailable) {
            return res.status(400).json({ message: "User already exist" })
        }

        const hashPassword = await bcrypt.hash(password, 10)
        const user = await User.create({
            username,
            email,
            mobile,
            password: hashPassword
        })

        res.status(200).json(user)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}


//@desc User Login
//@route /user/Login
//@access public

const userLogin = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(404).json({ message: "All feilds are required..!" })
    }
    const user = await User.findOne({ email })
    if (user && (await bcrypt.compare(password, user.password))) {
        accessTokken = jwt.sign({
            id: user._id,
            name: user.username
        }, process.env.SECRET_TOKKEN,
            {
                expiresIn: "20m"
            })
    } else {
        return res.status(400).json({ message: "Invalid Credentails" })
    }

    res.status(200).json(accessTokken)
}


module.exports = { userRegister, userLogin }