const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');

const protect = asyncHandler(async (req, res, next) => {
  //Unutar tokena se nalazi userId
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      //AUTH HEADER
      //   req.headers.authorization {
      //     authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
      //     'user-agent': 'PostmanRuntime/7.29.2',
      //     accept: '*/*',
      //     'postman-token': '63ac2697-d35c-4d35-a870-e3985bf8ef69',
      //     host: 'localhost:5000',
      //     'accept-encoding': 'gzip, deflate, br',
      //     connection: 'keep-alive'
      //   }
      token = req.headers.authorization.split(' ')[1]; //Bearer eyJhbGciOiJIUzI1NiIsInR5cCI..., pa je [1] token

      //DECODED
      // {
      //  "id": "63860da139f2e87c74ca36b6", //Userov id
      //  "iat": 1669733427,
      //  "exp": 1672325427 //ekspiracija
      // }
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      //Get use from token
      req.user = await User.findById(decoded.id).select('-password'); //vraća podatke bez passworda

      next();
    } catch (error) {
      console.log(error);
      res.status(401);
      throw new Error('Not authorized');
    }
  }

  if (!token) {
    res.status(401);
    throw new Error('Not authorized');
  }
});

module.exports = { protect };
