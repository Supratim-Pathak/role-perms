const Permissions = require("../models/permissions");
/**
 * Creates a new permission.
 * @param {string} name - The name of the permission.
 */
const createPermission = async (name) => {
  try {
    const permData = new Permissions({ name });
    return await permData.save();
  } catch (error) {
    return error.message;
  }
};

/**
 * Deletes a permission by ID.
 * @param {string} id - The ID of the permission.
 */
const deletePermission = async (id) => {
  try {
    return await Permissions.findByIdAndDelete(id);
  } catch (error) {
    return error.message;
  }
};

/**
 * Updates a permission by ID.
 * @param {string} id - The ID of the permission.
 * @param {string} name - The new name of the permission.
 */
const updatePermission = async (id, name) => {
  try {
    return await Permissions.findByIdAndUpdate(id, { name }, { new: true });
  } catch (error) {
    return error.message;
  }
};

/**
 * Retrieves all permissions.
 */
const getAllPermission = async () => {
  try {
    return await Permissions.find();
  } catch (error) {
    return error.message;
  }
};

/**
 * Retrieves a single permission by ID.
 * @param {string} id - The ID of the permission.
 */
const getOnePermission = async (id) => {
  try {
    return await Permissions.findById(id);
  } catch (error) {
    return error.message;
  }
};

const assignPermission = async (roleId, permissionId) => {
  try {
    const role = await Role.findById(roleId);
    if (!role) return "Role not found";

    if (!role.permissions.includes(permissionId)) {
      role.permissions.push(permissionId);
      await role.save();
    }
    return role;
  } catch (error) {
    return error.message;
  }
};

const revokePermission = async (roleId, permissionId) => {
  try {
    const role = await Role.findById(roleId);
    if (!role) return "Role not found";

    role.permissions = role.permissions.filter(
      (perm) => perm.toString() !== permissionId
    );
    await role.save();
    return role;
  } catch (error) {
    return error.message;
  }
};

module.exports = {
  createPermission,
  deletePermission,
  updatePermission,
  getAllPermission,
  getOnePermission,
  assignPermission,
  revokePermission,
};
