const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createPermission = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    description: Joi.string(),
  }),
};

const getPermissions = {
  query: Joi.object().keys({
    roleId: Joi.string().custom(objectId).required(),
  }),
};

module.exports = {
  createPermission,
  getPermissions,
};
