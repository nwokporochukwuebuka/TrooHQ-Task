const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { permissionService, roleService, companyService } = require('../services');

const createRole = catchAsync(async (req, res) => {
  const company = await companyService.getCompanyById(req.params.companyId);
  const role = await roleService.createRole({ ...req.body, companyId: company.id });
  return res.status(httpStatus.CREATED).send(role);
});

const deleteRole = catchAsync(async (req, res) => {
  await roleService.deleteRole(req.params.id);
  return res.status(httpStatus.NO_CONTENT).send();
});

const addPermissionsToRole = catchAsync(async (req, res) => {
  const role = await roleService.addPermissionsToRole(req.params.roleId, req.body.permissionIds);
  return res.status(200).send(role);
});

const getCompanyRoles = catchAsync(async (req, res) => {
  const roles = await roleService.getRoles(req.params.companyId);
  return res.status(200).json(roles);
});

module.exports = {
  createRole,
  deleteRole,
  addPermissionsToRole,
  getCompanyRoles,
};
