import crypto from 'crypto';

/**
 * Decode a base64 encoded string into a utf-8 string.
 * @param string - The string to be decoded.
 * @returns The decoded string.
 */
export const decodeString = (string) => {
  const result = Buffer.from(string, 'base64').toString('utf-8');
  return result;
};

/**
 * It takes a string, hashes it, and returns the hash
 * @param pwd - The password to be hashed.
 * @returns The hashed password.
 */
export const hashPasswd = (pwd) => {
  const hash = crypto.createHash('sha1');
  const data = hash.update(pwd, 'utf-8');
  const genHash = data.digest('hex');
  return genHash;
};
