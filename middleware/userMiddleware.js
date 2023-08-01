const {
  check,
  validationResult,
  param,
  query,
  body,
} = require('express-validator');
const { validate, ErrorFunction } = require('./validator');

const LoginValidator = [
  check('email')
    .trim()
    .not()
    .isEmpty()
    .withMessage('Email can not be empty!')
    .bail()
    .isEmail()
    .withMessage('Invalid email address!')
    .bail(),
  check('password')
    .trim()
    .escape()
    .not()
    .isEmpty()
    .withMessage('Password can not be empty!')
    .bail()
    .isLength({ min: 3 })
    .withMessage('Minimum 3 characters required!')
    .bail(),
  ErrorFunction,
];

const RegisterValidator = [
  check('email')
    .trim()
    .not()
    .isEmpty()
    .withMessage('Email can not be empty!')
    .bail()
    .isEmail()
    .withMessage('Invalid email address!')
    .bail(),
  check('username')
    .trim()
    .escape()
    .not()
    .isEmpty()
    .withMessage('Password can not be empty!')
    .bail()
    .isLength({ min: 3 })
    .withMessage('Minimum 3 characters required!')
    .bail(),
  check('password')
    .trim()
    .escape()
    .not()
    .isEmpty()
    .withMessage('Password can not be empty!')
    .bail()
    .isLength({ min: 3 })
    .withMessage('Minimum 3 characters required!')
    .bail(),
  check('passwordConf')
    .trim()
    .escape()
    .not()
    .isEmpty()
    .withMessage('Password can not be empty!')
    .bail()
    .isLength({ min: 3 })
    .withMessage('Minimum 3 characters required!')
    .bail(),
  check('role')
    .trim()
    .escape()
    .not()
    .isEmpty()
    .withMessage('Password can not be empty!')
    .bail()
    .isLength({ min: 3 })
    .withMessage('Minimum 3 characters required!')
    .bail(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      //return res.status(422).json({errors: errors.array()});
      res.status(401).json({
        Error: 'Fill all the fields',
        errors: errors.errors,
        ErrorCode: 308,
      });
    } else {
      next();
    }
  },
];

var validateLogin = function (req, res, next) {
  validate([body('user_email').isEmail(), body('password').notEmpty()]);
};

var validateRegister = function (req, res, next) {
  console.log(req.body);
  validate([
    body('email').isEmail(),
    body('username')
      .isLength({ min: 3 })
      .withMessage('username shuould be minimum 3 char'),
    body('password')
      .isLength({ min: 5 })
      .withMessage('password shuould be minimum 5 char'),
    ,
    body('passwordConf').custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error('Password confirmation does not match password');
      }

      // Indicates the success of this synchronous custom validator
      return true;
    }),
    body('role').isIn(['student', 'vendor']),
  ]);

  next();
};

module.exports = {
  LoginValidator,
  RegisterValidator,
  validateLogin,
  validateRegister,
};
