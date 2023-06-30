const express = require('express')

const UserRouter = express.Router();

const { CreateUser, LoginUser, RefreshToken } = require('../controllers/UserCoontrollers');

UserRouter.post('/create', CreateUser);
UserRouter.post('/login', LoginUser);
UserRouter.post('/refresh-token', RefreshToken);
module.exports = UserRouter;