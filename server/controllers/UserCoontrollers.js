const user = require('../models/UserModel');

const CreateUser = async (req, res) => {


    const { name, email, password } = req.body;
    try {
        if (!(name && email && password)) {
            res.status(400).send('name,email,passprd are required');
        } else {
            const newuser = await user.create(req.body);
            console.log(newuser)
            const toSend = { ...newuser.toObject() }
            delete toSend.password;
            res.status(200).json({ message: 'Successfully created User', user: toSend })

        }
    } catch (err) {

        res.status(400).send('something went wrong')
    }

}
const LoginUser = async (req, res) => {


    const { email, password } = req.body;
    try {
        if (!email && !password) {
            res.status(400).send('email,password are required');
        } else {
            const newuser = await user.find({ email: email, });

            if (newuser && newuser.length && newuser[0].password == password) {
                const toSend = { ...newuser[0].toObject() } // Create a copy of the user object
                delete toSend.password;
                res.status(200).json({ message: 'Successfully login', user: toSend })
            }
            else {
                res.send('User Not found')
            }

        }
    } catch (err) {
        console.log(err)
        res.send('something went wrong')
    }

}

module.exports = { CreateUser, LoginUser }
