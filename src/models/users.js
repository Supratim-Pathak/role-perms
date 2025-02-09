const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const mongoosePaginate = require("mongoose-paginate-v2");
const userSchema = new mongoose.Schema(
  {
    first_name: { type: String, trim: true },
    last_name: { type: String, trim: true },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      unique: true,
      required: true,
    },
    password: { type: String, trim: true },
    role: { type: mongoose.Schema.Types.ObjectId, ref: "Role", default: null },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (this.first_name) this.first_name = this.first_name.trim();
  if (this.last_name) this.last_name = this.last_name.trim();
  if (this.email) this.email = this.email.trim().toLowerCase();
  if (this.isModified("password")) {
    try {
      const salt = await bcrypt.genSalt(saltRounds);
      this.password = await bcrypt.hash(this.password.trim(), salt);
    } catch (err) {
      return next(err);
    }
  }
  next();
});

userSchema.plugin(mongoosePaginate);

const User = mongoose.model("User", userSchema);

module.exports = User;
