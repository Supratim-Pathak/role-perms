const mongoose = require("mongoose");
const mongoosePaginate = require('mongoose-paginate-v2');
const permissionSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true, trim: true },
    description: { type: String, trim: true },
    module: { type: String, required: true, trim: true },
  },
  { timestamps: true }
);

permissionSchema.pre("save", function (next) {
  if (this.name) this.name = this.name.trim();
  next();
});

permissionSchema.plugin(mongoosePaginate);

const Permission = mongoose.model("Permission", permissionSchema);

module.exports = Permission;
