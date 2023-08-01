const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const { decrypt, encrypt } = require('../../middleware/encrp');
const { School } = require('../../models/school/school');
const { Teacher } = require('../../models/school/teacher');

const { Student } = require('../../models/student');

const CreateSchoolProfile = async (req, res) => {
  let schoolInfo = req.body;

  try {
    var id = req.user.user_id;
    var role = req.user.role;
    var email = req.user.email;

    if (role == 'school') {
      let schoolProfile = await School.findOne({ user: id });

      if (!schoolProfile) {
        schoolInfo.schoolEmail = email;
        schoolInfo.user = id;
        schoolInfo.modifiedAt = Date.now();

        schoolProfile = new School(schoolInfo);
      } else {
        let newSchoolDetails = await Object.assign(schoolProfile, schoolInfo)
        newSchoolDetails.modifiedAt = Date.now();

        schoolProfile = new School(newSchoolDetails);
      }

      await schoolProfile.save();
      res.status(200).json({ "response": schoolProfile, "Message": "School Profile Details Saved", "ErrorCode": null });
    } else {
      res.status(401).json({ "Error": "UnAuthorized", "Message": "Please login with School Credentiatls", "ErrorCode": 309 })
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ "Error": "Details not save", "Message": "DataBase Issue", "ErrorCode": 308 })
  }
}

const CreateTeacherProfile = async (req, res) => {
  let schoolInfo = req.body;

  try {
    var id = req.user.user_id;
    var role = req.user.role;
    var email = req.user.email;

    if (role == 'teacher') {
      let schoolProfile = await Teacher.findOne({ user: id });
      console.log("...schoolProfile..", schoolProfile)

      if (!schoolProfile) {
        schoolInfo.schoolEmail = email;
        schoolInfo.user = id;
        schoolInfo.modifiedAt = Date.now();

        schoolProfile = new Teacher(schoolInfo);
      } else {
        let newSchoolDetails = await Object.assign(schoolProfile, schoolInfo)
        newSchoolDetails.modifiedAt = Date.now();

        schoolProfile = new Teacher(newSchoolDetails);
      }

      await schoolProfile.save();
      res.status(200).json({ "response": schoolProfile, "Message": "School Profile Details Saved", "ErrorCode": null });
    } else {
      res.status(401).json({ "Error": "UnAuthorized", "Message": "Please login with School Credentiatls", "ErrorCode": 309 })
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ "Error": "Details not save", "Message": "DataBase Issue", "ErrorCode": 308 })
  }
}



module.exports = {
  CreateSchoolProfile,
  CreateTeacherProfile,

};
