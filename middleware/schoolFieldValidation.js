
const CheckSchoolProfileFields = async (req, res, next) => {
    const schoolInfo = req.body;

    if (!schoolInfo.schoolName || !schoolInfo.schoolContact || !schoolInfo.address || !schoolInfo.address.line1
        || !schoolInfo.address.state || !schoolInfo.address.countryCode || !schoolInfo.address.countryName
        || !schoolInfo.address.postalCode) {
        res.status(401).json({ "Error": "Fill all the fields", "ErrorCode": 308 })
    } else {
        next()
    }
}

const CheckTeacherProfileFields = async (req, res, next) => {
    const teacherInfo = req.body;

    if (!teacherInfo.teacherName || !teacherInfo.teacherContact || !teacherInfo.teacherSpecilization) {
        res.status(401).json({ "Error": "Fill all the fields", "ErrorCode": 308 })
    } else {
        next()
    }
}

const CheckStudentProfileFields = async (req, res, next) => {
    const studentInfo = req.body;

    if (!studentInfo.studentlName || !studentInfo.studentContact || !studentInfo.studentDOB) {
        res.status(401).json({ "Error": "Fill all the fields", "ErrorCode": 308 })
    } else {
        next()
    }
}

const CheckParentProfileFields = async (req, res, next) => {
    const parentInfo = req.body;

    if (!parentInfo.parentName || !parentInfo.parentContact || !parentInfo.parentDOB) {
        res.status(401).json({ "Error": "Fill all the fields", "ErrorCode": 308 })
    } else {
        next()
    }
}

module.exports = { CheckSchoolProfileFields, CheckTeacherProfileFields, CheckParentProfileFields, CheckStudentProfileFields }