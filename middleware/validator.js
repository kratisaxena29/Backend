const { param, validationResult } = require('express-validator');

const paramsValidation = (params) => {
  return [param(params).exists()];
};
/* common function */
const validate = (validations) => {
  return async (req, res, next) => {
    await Promise.all(validations.map((validation) => validation.run(req)));

    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }
    errors.status = 400;
    //res.status(400).json({ errors: errors.array() });
    res.status(401).json({
      Error: 'Fill all the fields',
      errors: errors.array(),
      ErrorCode: 308,
    });
    //next(errors);
  };
};

var ErrorFunction = function (req, res, next) {
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
};

module.exports = {
  paramsValidation,
  validate,
  ErrorFunction,
};
