const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET;

const jwtConfig = {
  expiresIn: '1h',
  algorithm: 'HS256',
};

// Ficou confuso, mas foi como vi no exercício do course
const tokenGenerator = (payload) => {
  const token = jwt.sign({ data: payload }, secret, jwtConfig);

  return token;
};

module.exports = { tokenGenerator };
