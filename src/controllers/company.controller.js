const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { companyService } = require('../services');

const updateCompany = catchAsync(async (req, res) => {
  const company = await companyService.updateCompany(req.params.userId, req.body);
  return res.send(company);
});

const getCompany = catchAsync(async (req, res) => {
  const company = await companyService.getCompanyById(req.params.id);
  if (!company) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Company not found');
  }

  return res.status(httpStatus.OK).json(company);
});

module.exports = {
  updateCompany,
  getCompany,
};
