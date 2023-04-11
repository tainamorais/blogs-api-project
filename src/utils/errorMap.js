const errorMap = {
  INVALID_VALUE: 400,
  EMAIL_REGISTERED: 409,
  NOT_FOUND: 404,
  NOT_AUTHORIZED: 401,
};

const mapError = (type) => errorMap[type] || 500;

module.exports = { errorMap, mapError };
