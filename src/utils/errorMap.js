const errorMap = {
  INVALID_VALUE: 400,
  EMAIL_REGISTERED: 409,
  NOT_FOUND: 404, 
};

const mapError = (type) => errorMap[type] || 500;

module.exports = { errorMap, mapError };
