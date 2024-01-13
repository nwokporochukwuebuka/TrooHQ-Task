const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const permissionSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
permissionSchema.plugin(toJSON);
permissionSchema.plugin(paginate);

permissionSchema.statics.isNameTaken = async function (name, excludePermissionId) {
  const permission = await this.findOne({ name, _id: { $ne: excludePermissionId } });
  return !!permission;
};

/**
 * @typedef Permission
 */
const Permission = mongoose.model('Permission', permissionSchema);

module.exports = Permission;
