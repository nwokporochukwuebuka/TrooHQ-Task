const httpStatus = require('http-status');
const { Company } = require('../models');
const ApiError = require('../utils/ApiError');

const createCompany = async (companyName, userId) => {
  return await Company.create({ name: companyName, userId });
};

const updateCompany = async (userId, updateBody) => {
  const company = await getCompanyByUserId(userId);
  if (!company) {
    return ApiError(httpStatus.NOT_FOUND, 'Company not found');
  }

  Object.assign(company, updateBody);
  await company.save();
  return company;
};

const getCompanyById = async (id) => {
  return await Company.findById(id).populate('userId', 'name email');
};

const getCompanyByUserId = async (userId) => {
  return await Company.findOne({ userId });
};

const deleteCompany = async (userId) => {
  const company = await getCompanyByUserId(userId);

  if (!company) {
    return ApiError(httpStatus.NOT_FOUND, 'Company not found');
  }

  await company.remove();
  return company;
};

module.exports = {
  createCompany,
  updateCompany,
  getCompanyById,
  getCompanyByUserId,
  deleteCompany,
};
