const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const roleValidation = require('../../validations/role.validation');
const roleController = require('../../controllers/role.controller');

const router = express.Router();

router
  .route('/:companyId')
  .post(
    auth('__all_company_permissions__', '__manage_roles__'),
    validate(roleValidation.createRole),
    roleController.createRole
  )
  .get(
    auth('__manage_roles__', '__all_company_permissions__'),
    validate(roleValidation.getRoles),
    roleController.getCompanyRoles
  );

router.post(
  '/permissions/:roleId',
  auth('__all_company_permissions__', '__manage_roles__'),
  validate(roleValidation.addPermissionsToRole),
  roleController.addPermissionsToRole
);

module.exports = router;
