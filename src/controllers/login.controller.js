const errorMap = require('../utils/errorMap');

const loginService = require('../services/login.service');

module.exports = async (req, res) => {
  const { email, password } = req.body;

  const { type, message } = await loginService(email, password);

  if (type) return res.status(errorMap.mapError(type)).json({ message });

  return res.status(200).json({ token: message });
};
