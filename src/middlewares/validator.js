const jwt = require('jsonwebtoken');
const schemas = require('./schemas');

const secret = process.env.JWT_SECRET;

const createUserValidator = ({ displayName, email, password, image }) => {
  const { error } = schemas.createUserSchema.validate({ displayName, email, password, image });

  if (error) {
    return { type: 'INVALID_VALUE', message: error.message };
  }

  return { type: null, message: '' };
};

const loginValidator = ({ email, password }) => {
  const { error } = schemas.loginSchema.validate({ email, password });

  if (error) {
    return { type: 'INVALID_VALUE', message: error.message };
  }

  return { type: null, message: '' };
};

/*
https://app.betrybe.com/learn/course/5e938f69-6e32-43b3-9685-c936530fd326/module/94d0e996-1827-4fbc-bc24-c99fb592925b/section/0ca77b1d-4770-4646-8368-167d2305e763/day/85fd2ed3-f6cc-4789-8990-7f5fe827422c/lesson/daaaaada-b928-4b28-b66d-b60bd1ce4d82/solution

Função retirada do course, porém, fiz alguns ajustes, pois não estava retornando o desejado.
A mensagem vinha em HTML, não entendi o porquê. Verificar depois.
*/
const tokenValidator = (req, res, next) => {
  const { authorization: token } = req.headers;
  
  if (!token) {
    const err = new Error('Token not found');
    err.statusCode = 401;
    // return next(err);
    return res.status(401).json({ message: 'Token not found' });
  }

try {
  const payload = jwt.verify(token, secret);

  req.user = payload;

  return next();
} catch (err) {
  err.statusCode = 401;
  return res.status(401).json({ message: 'Expired or invalid token' });
}
};

const createCategoryValidator = ({ name }) => {
  const { error } = schemas.createCategorySchema.validate({ name });

  if (error) {
    return { type: 'INVALID_VALUE', message: error.message };
  }

  return { type: null, message: '' };
};

module.exports = { createUserValidator, loginValidator, tokenValidator, createCategoryValidator };
