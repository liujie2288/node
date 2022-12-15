const { validationResult } = require("express-validator");

exports = module.exports = (
  validations,
  errorCallback = (errors) => {
    res.status(400).json({ errors: errors });
  }
) => {
  return async (req, res, next) => {
    await Promise.all(validations.map((validation) => validation.run(req)));

    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }

    errorCallback(errors.array());
  };
};
