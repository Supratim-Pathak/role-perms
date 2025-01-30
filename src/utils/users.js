const User = require("../models/users");

/**
 * Creates a new user.
 * @param {string} first_name - The first name of the user.
 * @param {string} last_name - The last name of the user.
 * @param {string} email - The email of the user.
 * @param {string} password - The password of the user.
 */
const createUser = async (first_name, last_name, email, password) => {
  try {
    const userData = new User({ first_name, last_name, email, password });
    return await userData.save();
  } catch (error) {
    console.log(error);
    return error.message;
  }
};

/**
 * Deletes a user by ID.
 * @param {string} id - The ID of the user.
 */
const deleteUser = async (id) => {
  try {
    return await User.findByIdAndDelete(id);
  } catch (error) {
    return error.message;
  }
};

/**
 * Updates a user by ID.
 * @param {string} id - The ID of the user.
 * @param {string} first_name - The new first name.
 * @param {string} last_name - The new last name.
 * @param {string} email - The new email.
 * @param {string} password - The new password.
 */
const updateUser = async (id, first_name, last_name, email, password) => {
  try {
    return await User.findByIdAndUpdate(
      id,
      { first_name, last_name, email, password },
      { new: true }
    );
  } catch (error) {
    return error.message;
  }
};

/**
 * Retrieves all users.
 */
const getAllUser = async () => {
  try {
    return await User.find();
  } catch (error) {
    return error.message;
  }
};

/**
 * Retrieves a single user by ID.
 * @param {string} id - The ID of the user.
 */
const getOneUser = async (id) => {
  try {
    return await User.findById(id);
  } catch (error) {
    return error.message;
  }
};

/**
 * Retrieves a single user by ID.
 * @param {string} id - The ID of the user.
 * @param {string} permission - The name of the permission.
 */
const can = async (id, permission) => {
  try {
    const user = await User.findById(id).populate({
      path: "role",
      populate: {
        path: "permissions",
        select: "name",
      },
    });
    return user.role.permissions.some((data) => data.name === permission);
  } catch (error) {
    return error.message;
  }
};

module.exports = {
  createUser,
  deleteUser,
  updateUser,
  getAllUser,
  getOneUser,
  can,
};
