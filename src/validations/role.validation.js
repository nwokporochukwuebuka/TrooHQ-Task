const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createRole = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    description: Joi.string(),
    permissions: Joi.array(),
  }),
  params: Joi.object().keys({
    companyId: Joi.string().custom(objectId).required(),
  }),
};

const getRoles = {
  params: Joi.object().keys({
    companyId: Joi.string().custom(objectId).required(),
  }),
};

const addPermissionsToRole = {
  params: Joi.object().keys({
    roleId: Joi.string().custom(objectId).required(),
  }),
  body: Joi.object().keys({
    permissionIds: Joi.array().required(),
  }),
};

module.exports = {
  createRole,
  getRoles,
  addPermissionsToRole,
};
