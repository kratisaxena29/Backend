require('dotenv').config();
const mongoose = require('mongoose');
const { User } = require('../models/user');

const { School } = require('../models/school/school');
const { Teacher } = require('../models/school/teacher');
const { Student } = require('../models/student');



const ObjectId = mongoose.Types.ObjectId;

//const messaging = require('../services/messaging');

const jwt = require('jsonwebtoken');
const axios = require('axios');
const { decrypt, encrypt } = require('../middleware/encrp');
//const messaging = require('../services/messaging');

const Register = async (req, res) => {
  let personInfo = req.body;
  if (
    !personInfo.email ||
    !personInfo.name ||
    !personInfo.password ||
    !personInfo.passwordConf ||
    !personInfo.role ||
    !personInfo.mobileNumber

  ) {
    res.status(500).json({
      Error: 'Something went wrong',
      Message: 'Must consist all the fields',
      ErrorCode: 401,
    });
  } else {
    if (personInfo.password == personInfo.passwordConf) {
      try {
        let userData = await User.findOne({ email: personInfo.email });

        if (!userData) {
          let pass = await encrypt(personInfo.password);

          let newPerson = new User({
            email: personInfo.email,
            name: personInfo.name,
            password: pass,
            role: personInfo.role,
            mobileNumber: personInfo.mobileNumber,

          });
          console.log('new Persom', newPerson);
          await newPerson.save();


          res.status(200).json({
            Success: 'True',
            Message: 'Data inserted succesfully',
            SuccessCode: 200,
          });
        } else {
          res.status(500).json({
            Error: 'Already Registered',
            Message: 'Email Already registered , please login or register ',
            ErrorCode: 302,
          });
        }
      } catch (error) {
        console.log(error);
        res.status(500).json({
          Error: 'Something went wrong',
          Message: error,
          ErrorCode: 303,
        });
      }
    } else {
      res.status(401).json({
        Error: 'Password Missmatch',
        Message: 'Password And Confirm Password Doesnot Matched ',
        ErrorCode: 304,
      });
    }
  }
};

const Login = async (req, res) => {
  try {
    let usData = await User.findOne({ email: req.body.email });

    if (usData) {


      let dec = await decrypt(usData.password);

      if (dec == req.body.password) {

        const token = jwt.sign(
          {
            email: usData.email,
            role: usData.role,
            name: usData.name,
            user_id: usData._id,
          },
          process.env.JWT_SECRET_KEY,

          {
            expiresIn: '2h',
          },
        );

        res.status(200).json({ Success: 'True', Body: token });
      } else {
        res.status(200).json({
          Error: 'Password Incorrect',
          Message: 'Password Incoorect Matched ',
          ErrorCode: 306,
        });
      }

    } else {
      res.status(500).json({
        Error: 'Not Registered',
        Message: 'This Email Is not regestered!',
        ErrorCode: 305,
      });
    }
  } catch (error) {
    res
      .status(500)
      .json({ Error: error, Message: 'Something went wrong', ErrorCode: 500 });
  }
};






module.exports = {
  Register,
  Login,

};
