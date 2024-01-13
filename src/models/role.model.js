const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const roleSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    companyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Company',
    },
    description: {
      type: String,
    },
    permissions: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Permission',
      },
    ],
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
roleSchema.plugin(toJSON);
roleSchema.plugin(paginate);

roleSchema.statics.isNameTaken = async function (name, companyId, excludeRoleId) {
  const role = await this.findOne({ name, companyId, _id: { $ne: excludeRoleId } });
  return !!role;
};

/**
 * @typedef Role
 */
const Role = mongoose.model('Role', roleSchema);

module.exports = Role;
