const mongoose = require("mongoose");
const mongoosePaginate = require('mongoose-paginate-v2');

const roleSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true, trim: true },
    permissions: [{ type: mongoose.Schema.Types.ObjectId, ref: "Permission" }],
  },
  { timestamps: true }
);

roleSchema.pre("save", function (next) {
  if (this.name) this.name = this.name.trim();
  next();
});

roleSchema.plugin(mongoosePaginate)

const Role = mongoose.model("Role", roleSchema);

module.exports = Role;
