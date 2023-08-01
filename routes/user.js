const express = require('express');



const router = express.Router();

const { verifyJwt } = require('../middleware/jwtAuth');



const SchoolProfileControler = require('../controller/school/schoolProfile');

const StudentController = require('../controller/student');
const UserController = require('../controller/user');


router.post('/register', UserController.Register);
router.post('/login', UserController.Login);




router.get(
  '/retrieveAllStudentProfile',
  StudentController.retrieveStudentProfile,
);

router.get(
  '/viewReportCard',
  StudentController.viewReportCard,
);




router.post(
  '/createStudentProfile',
  verifyJwt,
  StudentController.CreateStudentProfile,
);

router.post(
  '/createSchoolProfile',
  verifyJwt,
  SchoolProfileControler.CreateSchoolProfile,
);
router.post(
  '/createteacherProfile',
  verifyJwt,

  SchoolProfileControler.CreateTeacherProfile,
);
router.post(
  '/addUpdateGradeBasedOnRole',
  verifyJwt,

  StudentController.addUpdateProfileBasedOnRole,
);
router.delete(
  '/deletegrade/:id',
  StudentController.deletegrade,
);

module.exports = router;
