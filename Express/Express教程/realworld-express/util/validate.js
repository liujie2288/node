const mongoose = require("mongoose");
const { buildCheckFunction } = require("express-validator");

exports.isValidObjectId = (location, field) => {
  return buildCheckFunction(location)(field).custom(async (value) => {
    if (!mongoose.isValidObjectId(value)) {
      return Promise.reject("ID 不是一个有效的 ObejctId");
    }
  });
};
