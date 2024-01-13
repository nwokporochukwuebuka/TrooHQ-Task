const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const { Permission } = require('../models');

const createPermission = async (permissionBody) => {
  if (await Permission.isNameTaken(permissionBody.name)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Permission name is taken already');
  }
  const permission = await Permission.create(permissionBody);

  // add the created permission to the admin when it is created

  return permission;
};

const getPermissionById = async (id) => {
  return await Permission.findById(id);
};

const deletePermission = async (id) => {
  const permission = await getPermissionById(id);
  if (!permission) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Permission not found');
  }
  await permission.remove();
  return permission;
};

const getPermissionByName = async (name) => {
  return await Permission.findOne({ name });
};

const getPermissions = async () => {
  return await Permission.find().select('name description');
};

module.exports = {
  createPermission,
  getPermissionById,
  deletePermission,
  getPermissions,
  getPermissionByName,
};
