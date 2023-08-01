const { Student } = require('../models/student');


const retrieveStudentProfile = async (req, res) => {

    try {
        let studentDetails = await Student.find();
        studentDetails = studentDetails || {}
        res.status(200).json({ "Success": true, "Message": "Success", "Body": studentDetails, });
    } catch (error) {
        res.status(500).json({ "Error": "Error occured", "Message": error, "ErrorCode": 316 })
    }
}

const CreateStudentProfile = async (req, res) => {
    let studentInfo = req.body;

    try {
        var id = req.user.user_id;
        var role = req.user.role;
        var email = req.user.email;

        if (role == 'student') {
            let studentProfile = await Student.findOne({ user: id });
            if (!studentProfile) {
                studentInfo.studentEmail = email;
                studentInfo.user = id;
                studentInfo.modifiedAt = Date.now();
                studentInfo.studentDOB = new Date();
                studentProfile = new Student(studentInfo);
            } else {
                let newDataDetails = await Object.assign(studentProfile, studentInfo)
                newDataDetails.modifiedAt = Date.now();
                newDataDetails.studentDOB = new Date();
                studentProfile = new Student(newDataDetails);
            }
            await studentProfile.save();

            res.status(200).json({ "response": studentProfile, "Message": "Vendor Profile Details Saved", "ErrorCode": null });
        } else {
            res.status(401).json({ "Error": "UnAuthorized", "Message": "Please login with Vendor Credentiatls", "ErrorCode": 309 })
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ "Error": "Details not save", "Message": "DataBase Issue", "ErrorCode": 308 })
    }
}

const updateStudentProfile = async (req, res) => {

    const update = req.body;
    var studentId = req.user.user_id;
    await Promise.all([
        Object.keys(update).forEach(
            (key) => update[key] === undefined && delete update[key],
        )
    ])
    try {
        const studentData = await Student.findOne({});
        await studentData.updateOne(update);
        res.status(200).json({ "Success": true, "Message": "Success", "Body": studentData, "ErrorCode": null });

    } catch (error) {
        console.log(error);
        res.status(500).json({ "Error": error, "Message": "error occured while creating Course", "ErrorCode": 401 })
    }

}

const viewReportCard = async (req, res) => {
    try {

        const studentDetail = await Student.find().select('_id grade streams')

        res.status(200).json({
            response: studentDetail,
            Message: 'student Detail',
            ErrorCode: null,
        });
    }
    catch (error) {
        res.status(500).json({
            response: error,
            Message: 'Student Details Not Retrieved',
            ErrorCode: 409,
        });
    }
}
const addUpdateProfileBasedOnRole = async (req, res) => {
    try {
        const { user_id, role } = req.user;

        const userProfileData = { ...req.body, userId: user_id };

        let userResp;
        const userBasicDetails = await User.findById(user_id);


        const update = { $set: userProfileData };
        const options = { new: true };
        switch (role) {



            case 'teacher': {

                userResp = await Teacher.findOne({
                    userId: ObjectId(user_id),
                });
                if (userProfileData.studentId) {
                    let dataa = { _id: ObjectId(userProfileData.studentId) }

                    userResp = await Student.findOneAndUpdate(dataa, update, options);
                }



                else {
                    userResp = new Teacher(userProfileData);
                    await userResp.save();

                    await userBasicDetails.save();
                }

                break;
            }

            default: {
                break;
            }
        }
        return res.status(200).json({
            response: userResp,
            Message: 'User Profile Details ',
            ErrorCode: null,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            response: error,
            Message: 'User Profile Details Not Retrieved',
            ErrorCode: 409,
        });
    }
};
const deletegrade = async (req, res) => {
    try {

        const deleteGrade = await Teacher.findByIdAndDelete(req.params.id);
        console.log(deleteGrade)
        res.send(deleteGrade);
    } catch (e) {
        res.status(500).send(e);
    }
}
module.exports = {
    retrieveStudentProfile,
    updateStudentProfile, CreateStudentProfile,
    viewReportCard,
    addUpdateProfileBasedOnRole,
    deletegrade
};