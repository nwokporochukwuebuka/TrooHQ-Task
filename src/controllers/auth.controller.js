const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const {
  authService,
  userService,
  tokenService,
  emailService,
  companyService,
  roleService,
  permissionService,
} = require('../services');
const ApiError = require('../utils/ApiError');

const register = catchAsync(async (req, res) => {
  if (req.body.user.userType === 'company' && !!req.body?.company?.name === false) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'User did not provide companyName variable');
  }
  const user = await userService.createUser(req.body.user);
  let permission;
  if (req.body.user.userType === 'company') {
    const company = await companyService.createCompany(req.body.company.name, user.id);
    permission = await permissionService.getPermissionByName('__all_permissions__');
    if (!permission) {
      permission = await permissionService.createPermission({
        name: '__all_company_permissions__',
        description: 'This is the default superadmin permission for any company',
      });
    }
    const role = await roleService.createRole({
      name: 'SuperAdmin',
      description: 'This is the default superadmin role for this company',
      permissions: [permission.id],
      companyId: company.id,
    });

    const updatedUser = await userService.updateUserById(user.id, { roleId: role.id });
    const tokens = await tokenService.generateAuthTokens(user);
    return res.status(httpStatus.CREATED).send({ user: updatedUser, company, role, permission, tokens });
  } else if (req.body.user.userType === 'staff') {
    const company = await companyService.getCompanyById(req.body.company.id);

    permission = await permissionService.getPermissionByName('__all_staff_permissions__');
    if (!permission) {
      permission = await permissionService.createPermission({
        name: '__all_staff_permissions__',
        description: 'This is the default staff permission for any company',
      });
    }

    // TODO: Check if the role already exists

    const role = await roleService.createRole({
      name: 'DefaultStaff',
      description: 'This is the basic staff role in the organization, user can be upgraded to other departments',
      companyId: company.id,
      permissions: [permission.id],
    });

    const updatedUser = await userService.updateUserById(user.id, { roleId: role.id });
    const tokens = await tokenService.generateAuthTokens(user);
    return res.status(httpStatus.CREATED).send({ user: updatedUser, company, role, permission, tokens });
  }
});

const login = catchAsync(async (req, res) => {
  const { email, password } = req.body;
  const user = await authService.loginUserWithEmailAndPassword(email, password);
  const tokens = await tokenService.generateAuthTokens(user);
  if (user.userType === 'company') {
    const company = await companyService.getCompanyByUserId(user.id);
    const role = await roleService.getRoleById(user.roleId);
    const tokens = await tokenService.generateAuthTokens(user);
    return res.status(httpStatus.CREATED).send({ user, company, role, tokens });
  } else if (user.userType === 'staff') {
    const role = await roleService.getRoleById(user.roleId);
    const company = await roleService.getCompanyByRoleId(user.roleId);
    return res.status(200).json({ user, role, company, tokens });
  }
});

const logout = catchAsync(async (req, res) => {
  await authService.logout(req.body.refreshToken);
  res.status(httpStatus.NO_CONTENT).send();
});

const refreshTokens = catchAsync(async (req, res) => {
  const tokens = await authService.refreshAuth(req.body.refreshToken);
  res.send({ ...tokens });
});

const forgotPassword = catchAsync(async (req, res) => {
  const resetPasswordToken = await tokenService.generateResetPasswordToken(req.body.email);
  await emailService.sendResetPasswordEmail(req.body.email, resetPasswordToken);
  res.status(httpStatus.NO_CONTENT).send();
});

const resetPassword = catchAsync(async (req, res) => {
  await authService.resetPassword(req.query.token, req.body.password);
  res.status(httpStatus.NO_CONTENT).send();
});

const sendVerificationEmail = catchAsync(async (req, res) => {
  const verifyEmailToken = await tokenService.generateVerifyEmailToken(req.user);
  await emailService.sendVerificationEmail(req.user.email, verifyEmailToken);
  res.status(httpStatus.NO_CONTENT).send();
});

const verifyEmail = catchAsync(async (req, res) => {
  await authService.verifyEmail(req.query.token);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  register,
  login,
  logout,
  refreshTokens,
  forgotPassword,
  resetPassword,
  sendVerificationEmail,
  verifyEmail,
};
