const user = require('../models/UserModel');
const redisClient = require('../db/redis')
const bcrypt = require('bcrypt');
const { generateToken } = require('../utils/jwt')
const CreateUser = async (req, res) => {


    const { name, email, password } = req.body;
    try {
        if (!(name && email && password)) {
            res.status(401).send('name,email,password are required');
        }
        else {
            const lu = await user.find({ email: email });
            if (lu && lu.length) {
                res.status(401).send('User with same email already exists');
                return;
            }


            const hashedPassword = bcrypt.hashSync(password, 10);
            const newuser = await user.create({ ...req.body, password: hashedPassword });
            const toSend = { ...newuser.toObject() }
            delete toSend.password;
            const accessToken = generateToken(toSend, '2m');
            const refreshToken = generateToken(toSend);
            res.status(200).json({ message: 'Successfully created User', user: { ...toSend, accessToken, refreshToken } })

        }
    } catch (err) {

        console.log(err)
        res.status(401).send('something went wrong')
    }

}
const LoginUser = async (req, res) => {

    const { email, password } = req.body;

    console.log(req.headers)
    try {
        if (!email && !password) {
            res.status(400).send('email,password are required');
        } else {
            const newuser = await user.find({ email: email, });

            if (newuser && newuser.length && bcrypt.compareSync(password, newuser[0].password)) {
                const toSend = { ...newuser[0].toObject() } // Create a copy of the user object
                delete toSend.password;
                const accessToken = generateToken(toSend, '2m');
                const refreshToken = generateToken(toSend);
                res.status(200).json({ message: 'Successfully login', user: { ...toSend, accessToken, refreshToken } })
            }
            else {
                res.status(404).send('User not found')
            }

        }
    } catch (err) {
        console.log(err)
        res.send('something went wrong')
    }

}


async function RefreshToken(req, res) {

    try {
        const { refreshToken } = req.body;


        redisClient.ok();

    } catch (error) {

        console.log(err);
        res.status(501).send('wfu')

    }


}
module.exports = { CreateUser, LoginUser, RefreshToken }
