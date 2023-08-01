const { School } = require('../models/school/school');
const { User } = require('../models/user');
const { Teacher } = require('../models/school/teacher');
const { SchoolStudent } = require('../models/school/schoolStudent');

const SchoolRegistration = async (req, res) => {
  let schoolInfo = req.body;
  if (
    !schoolInfo.email ||
    !schoolInfo.schoolName ||
    !schoolInfo.password ||
    !schoolInfo.passwordConf
  ) {
    res.status(500).json({
      Error: 'Something went wrong',
      Message: 'Must consist all the fields',
      ErrorCode: 401,
    });
  } else {
    if (schoolInfo.password == schoolInfo.passwordConf) {
      try {
        let userData = await User.findOne({ email: schoolInfo.email });
        console.log('userData ##################  ', userData);
        if (!userData) {
          try {
            let pass = await encrypt(schoolInfo.password);

            let newPerson = new User({
              email: schoolInfo.email,
              username: schoolInfo.schoolName,
              password: pass,
              role: schoolInfo.role,
              verified: false,
            });
            if (schoolInfo.role) {
              if (schoolInfo.role == 'school') {
                if (!schoolInfo.contact || !schoolInfo.schoolAddress) {
                  res.status(500).json({
                    Error: 'Something went wrong',
                    Message: 'Must consist all the fields',
                    ErrorCode: 402,
                  });
                } else {
                  let newSchool = new School({
                    schoolName: schoolInfo.schoolName,
                    schoolEmail: schoolInfo.email,
                    schoolContact: schoolInfo.contact,
                    schoolAddress: schoolInfo.schoolAddress,
                    modifiedAt: Date.now(),
                  });
                  console.log(
                    '################## newpersondetail saved ',
                    newSchool,
                  );
                  await newSchool.save();
                  await newPerson.save();
                }
              } else {
                res.status(500).json({
                  Error: 'Something went wrong',
                  Message:
                    'Must Login with School credentitals to access this functioanlity',
                  ErrorCode: 402,
                });
              }
            } else {
              res.status(500).json({
                Error: 'Something went wrong',
                Message: 'Must specify Role field',
                ErrorCode: 402,
              });
            }
            res.status(200).json({
              Success: 'True',
              Message: 'Data inserted succesfully',
              SuccessCode: 200,
            });
          } catch (error) {
            console.log(error);
            res.status(500).json({
              Error: error,
              Message: 'Error in Registration',
              ErrorCode: 408,
            });
          }
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
// ask either teacher/student will register it self or school will register the teacher
const TeacherRegistration = async (req, res) => {
  let teacherInfo = req.body;
  if (
    !teacherInfo.teacherEmail ||
    !teacherInfo.teacherName ||
    !teacherInfo.password ||
    !teacherInfo.passwordConf
  ) {
    res.status(500).json({
      Error: 'Something went wrong',
      Message: 'Must consist all the fields',
      ErrorCode: 401,
    });
  } else {
    if (req.headers && req.headers.authorization) {
      var authorization = req.headers.authorization,
        decoded;
      try {
        decoded = jwt.verify(authorization, process.env.JWT_SECRET_KEY);
      } catch (error) {
        return res
          .status(401)
          .json({ Error: 'UnAuthorized', Message: error, ErrorCode: 308 });
      }
      console.log('Body ::::   ', decoded.email);
      console.log('Body ::::   ', decoded.role);
      var emailid = decoded.email;
      var role = decoded.role;
      if (teacherInfo.password == teacherInfo.passwordConf) {
        try {
          let userData = await User.findOne({ email: teacherInfo.email });
          console.log('userData ##################  ', userData);
          if (!userData) {
            try {
              let pass = await encrypt(teacherInfo.password);

              let newPerson = new User({
                email: teacherInfo.teacherEmail,
                username: teacherInfo.teacherName,
                password: pass,
                role: teacherInfo.role,
                verified: false,
              });
              if (
                !teacherInfo.teacherContact ||
                !teacherInfo.teacherSpecilization
              ) {
                res.status(500).json({
                  Error: 'Something went wrong',
                  Message: 'Must consist all the fields',
                  ErrorCode: 401,
                });
              } else {
                if ((role = 'school')) {
                  let newTeacher = new Teacher({
                    // teacherName: ,
                    // teacherEmail: ,
                  });
                }
              }
              res.status(200).json({
                Success: 'True',
                Message: 'Data inserted succesfully',
                SuccessCode: 200,
              });
            } catch (error) {
              console.log(error);
              res.status(500).json({
                Error: error,
                Message: 'Error in Registration',
                ErrorCode: 408,
              });
            }
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
      }
    } else {
      res.status(500).json({
        Error: 'Something went wrong',
        Message: 'Please provide the header',
        ErrorCode: 309,
      });
    }
  }
};

module.exports = {
  SchoolRegistration,
  TeacherRegistration,
};
