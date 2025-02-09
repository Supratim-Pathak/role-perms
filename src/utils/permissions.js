const Permissions = require("../models/permissions");
const Role = require("../models/roles");
/**
 * Creates a new permission.
 * @param {string} name - The name of the permission.
 * @param {string} module - The module the permission belongs to.
 */
const createPermission = async (name, module) => {
  try {
    const permData = new Permissions({ name, module });
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
 * @param {string} page - Current page number for pagination.
 * @param {string} limit - Limit for number of records.
 */
const getAllPermission = async (page = 1, limit = 5) => {
  const options = {
    page,
    limit,
    sort: { createdAt: -1 },
  };
  try {
    return await Permissions.paginate({}, options);
  } catch (error) {
    return error.message;
  }
};

/**
 * search permissions.
 * @param {string} q - query string for lookup.
 */
const searchPermission = async (q, page = 1, limit = 5) => {
  const options = {
    page,
    limit,
    sort: { createdAt: -1 },
  };

  const query = { name: { $regex: q, $options: "i" } };

  try {
    return await await Permissions.paginate(query, options);
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
  searchPermission,
};
