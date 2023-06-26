const express = require('express')

const UserRouter = express.Router();

const { CreateUser, LoginUser } = require('../controllers/UserCoontrollers');

UserRouter.post('/create', CreateUser);
UserRouter.post('/login', LoginUser);
module.exports = UserRouter;