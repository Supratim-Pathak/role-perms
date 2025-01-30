const Role = require("../models/roles");
const User = require("../models/users");

/**
 * Creates a new role with the given permissions.
 * @param {string} rolename - The name of the role.
 * @param {Array<string>} permissions - Array of permission IDs.
 */
const createRole = async (rolename, permissions) => {
  try {
    const roleData = new Role({ name: rolename, permissions });
    return await roleData.save();
  } catch (error) {
    return error.message;
  }
};

/**
 * Deletes a role by ID.
 * @param {string} id - The ID of the role.
 */
const deleteRole = async (id) => {
  try {
    return await Role.findByIdAndDelete(id);
  } catch (error) {
    return error.message;
  }
};

/**
 * Updates a role by ID.
 * @param {string} id - The ID of the role.
 * @param {string} rolename - The new name of the role.
 * @param {Array<string>} permissions - The updated list of permission IDs.
 */
const updateRole = async (id, rolename, permissions) => {
  try {
    return await Role.findByIdAndUpdate(
      id,
      { name: rolename, permissions },
      { new: true }
    );
  } catch (error) {
    return error.message;
  }
};

/**
 * Retrieves all roles.
 */
const getAllRole = async () => {
  try {
    return await Role.find().populate("permissions");
  } catch (error) {
    return error.message;
  }
};

/**
 * Retrieves a single role by ID.
 * @param {string} id - The ID of the role.
 */
const getOneRole = async (id) => {
  try {
    return await Role.findById(id).populate("permissions");
  } catch (error) {
    return error.message;
  }
};

/**
 * Retrieves the permissions of a specific role.
 * @param {string} id - The ID of the role.
 */
const rolesPermission = async (id) => {
  try {
    const role = await Role.findById(id).populate("permissions");
    return role ? role.permissions : "Role not found";
  } catch (error) {
    return error.message;
  }
};

/**
 * Assigns a role to a user.
 * @param {string} userId - The ID of the user.
 * @param {string} roleId - The ID of the role.
 */
const assignRole = async (userId, roleId) => {
  try {
    const user = await User.findById(userId);
    if (!user) return "User not found";
    user.role = roleId;
    await user.save();
    return user;
  } catch (error) {
    return error.message;
  }
};

/**
 * Revokes a role from a user.
 * @param {string} userId - The ID of the user.
 */
const revokeRole = async (userId) => {
  try {
    const user = await User.findById(userId);
    if (!user) return "User not found";
    user.role = null;
    await user.save();
    return user;
  } catch (error) {
    return error.message;
  }
};

module.exports = {
  createRole,
  deleteRole,
  updateRole,
  getAllRole,
  getOneRole,
  assignRole,
  revokeRole,
  rolesPermission,
};
