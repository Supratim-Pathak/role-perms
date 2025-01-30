const User = require("./src/utils/users");
const Permission = require("./src/utils/permissions");
const Role = require("./src/utils/roles");
const { init } = require("./src/init");

module.exports = {
  Permission,
  User,
  Role,
  init,
};
