const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const { Role } = require('../models');
const { permissionService } = require('.');

const createRole = async (roleBody) => {
  if (await Role.isNameTaken(roleBody.name, roleBody.companyId)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Role name is taken already');
  }
  return await Role.create(roleBody);
};

const getCompanyDefaultStaffRole = async (companyId, roleName) => {
  return await Role.findOne({ companyId: companyId, name: roleName });
};

const getOrCreateDefaultStaffRoleAndPermission = async (companyId, roleName, roleDescription) => {
  let role;
  role = await getCompanyDefaultStaffRole(companyId, roleName);
  if (!role) {
    // let's first check for permissions too
    let permission;
    permission = await permissionService.getPermissionByName('__default_staff_permissions__');

    if (!permission) {
      permission = await permissionService.createPermission('__default_staff_permissions__');
    }
    role = await Role.create({
      permissions: [permission.id],
      name: roleName,
      companyId: companyId,
      description: roleDescription,
    });
  }

  return role;
};

const addPermissionsToRole = async (roleId, permissionIds) => {
  console.log('==== tried adding permissions to role', roleId, permissionIds);
  const role = await Role.findById(roleId);
  console.log('======== This is the role ========', role);
  if (!role) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Role not found');
  }
  // return await Role.updateOne({ id: roleId }, { $addToSet: { permissions: permissionIds[0] } });
  role.permissions.push(...permissionIds);
  return role.save();
};

const getRoleById = async (id) => {
  const role = await Role.findById(id).populate('permissions');
  return role;
};

const getCompanyByRoleId = async (id) =>
  await Role.findById(id).select('-name -description -permissions').populate('companyId', 'name id userId');

const getRoles = async (companyId) => {
  const roles = await Role.find({ companyId: companyId }).select('name').populate('permissions', 'name description');
  console.log('------- This are the roles I am truing to get ------------', roles);
  return roles;
};
const deleteRole = async (id) => {
  const role = await getRoleById(id);

  if (!role) {
    throw new ApiError(httpStatus.NOT_FOUND, 'This role does not exist');
  }

  await role.remove();
  return role;
};

module.exports = {
  createRole,
  getRoleById,
  addPermissionsToRole,
  getRoles,
  deleteRole,
  getCompanyByRoleId,
  getCompanyDefaultStaffRole,
  getOrCreateDefaultStaffRoleAndPermission,
};
