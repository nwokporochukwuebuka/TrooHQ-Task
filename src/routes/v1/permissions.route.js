const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const permissionValidation = require('../../validations/permission.validation');
const permissionController = require('../../controllers/permission.controller');

const router = express.Router();

router.post(
  '/',
  auth('__all_company_permissions__'),
  validate(permissionValidation.createPermission),
  permissionController.createPermission
);

router.get('/', auth(), validate(permissionValidation.getPermissions), permissionController.getPermissions);

module.exports = router;
