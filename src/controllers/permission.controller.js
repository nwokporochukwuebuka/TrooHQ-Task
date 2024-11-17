const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { permissionService, roleService } = require('../services');

const createPermission = catchAsync(async (req, res) => {
  const permission = await permissionService.createPermission(req.body);
  return res.status(httpStatus.CREATED).send({ permission });
});

const getPermissions = catchAsync(async (req, res) => {
  let permissions;
  // i there is a filtered query then filter the return permision stating the one that the role already contains
  permissions = await permissionService.getPermissions();
  if (!req.query.roleId) {
    console.log('====== I enetered the late permission ========');
    // just return all the permissions
    return res.status(200).send(permissions);
  }
  const role = await roleService.getRoleById(req.query.roleId);
  console.log('====== This is the fetched role ========', role);
  const permissionsArray = role.permissions.map((obj) => obj.id);

  const returnedPermission = [];

  const updatedPermission = permissions.map((permission) => {
    if (permissionsArray.includes(permission.id)) {
      // permission.added = true;
      returnedPermission.push({ name: permission.name, description: permission.name, status: true });
    } else {
      returnedPermission.push({ name: permission.name, description: permission.name, status: false });
    }
  });

  return res.status(200).send(returnedPermission);
});

const getPermission = catchAsync(async (req, res) => {
  const permission = await permissionService.getPermissionById(req.query.id);
  if (!permission) {
    throw new ApiError(httpStatus.NOT_FOUND, 'permission does not exist');
  }
  return res.status(200).send(permission);
});

// TODO: Can't delete the staff permission and the admin company general permission

const deletePermission = catchAsync(async (req, res) => {
  await permissionService.deletePermission(id);
  return res.status(204).send();
});

module.exports = {
  createPermission,
  getPermissions,
  getPermission,
  deletePermission,
};
