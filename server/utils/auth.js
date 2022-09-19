/* eslint-disable object-curly-newline */
const crypto = require('crypto');
const { Module, User, UserModule } = require('../models');

/**
 * Decode a base64 encoded string into a utf-8 string.
 * @param string - The string to be decoded.
 * @returns The decoded string.
 */
exports.decodeString = (string) => {
  const result = Buffer.from(string, 'base64').toString('utf-8');
  return result;
};

/**
 * It takes a string, hashes it, and returns the hash
 * @param pwd - The password to be hashed.
 * @returns The hashed password.
 */
exports.hashPasswd = (pwd) => {
  const hash = crypto.createHash('sha1');
  const data = hash.update(pwd, 'utf-8');
  const genHash = data.digest('hex');
  return genHash;
};

/**
 * It takes a user id and an array of modules and creates a user module record for each module
 * @param UserId - The id of the user you want to create permissions for.
 * @param modules - An array of modules that you want to create permissions for.
 */
exports.createPermissions = (UserId, modules) => {
  modules.map(async (module) => {
    const { id: ModuleId } = module;
    const user = { UserId, ModuleId };
    await UserModule.create(user);
  });
};

/* A function that takes a user id and returns an object with the permissions of the user. */
exports.getPermissionsAfterToken = async (userId) => {
  const modules = await User.findAll({
    where: { id: userId },
    include: [Module],
    raw: true,
    nest: true,
  });
  const permissions = {};
  modules.forEach((module) => {
    const { name } = module.Modules;
    const { read, update, del, create } = module.Modules.UserModule;
    if (!(module in permissions)) {
      permissions[name] = {
        read,
        update,
        del,
        create,
      };
    }
  });
  return permissions;
};
