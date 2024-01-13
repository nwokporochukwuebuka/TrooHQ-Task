const mogoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const companySchema = mogoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  userId: {
    type: mogoose.Schema.Types.ObjectId,
    ref: 'User',
  },
});

companySchema.plugin(toJSON);
companySchema.plugin(paginate);

const Company = mogoose.model('Company', companySchema);

module.exports = Company;
