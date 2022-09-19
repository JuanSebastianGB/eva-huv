const { createClient } = require('redis');
const { promisify } = require('util');

class RedisClient {
  constructor() {
    this.client = createClient();
    this.client.on('error', (err) => console.log('tmp', err.message));
    this.asyncGet = promisify(this.client.get).bind(this.client);
  }

  /**
   * This function returns true if the client is connected to the server, and false if it is not.
   * @returns A boolean value.
   */
  isAlive() {
    return this.client.connected;
  }

  /**
   * It gets a value from the Redis database
   * @param key - The key to get the value of.
   * @returns The value of the key
   */
  async get(key) {
    const getValue = await promisify(this.client.get).bind(this.client);
    const value = await getValue(key);
    return value;
  }

  /**
   * It sets a key to a value for a duration
   * @param key - The key to set the value for
   * @param value - The value to be stored in the cache.
   * @param duration - The duration in seconds that the key should be stored for.
   */
  async set(key, value, duration) {
    this.client.setex(key, duration, value);
  }

  /**
   * It deletes a key from the Redis database
   * @param key - The key to be deleted
   */
  async del(key) {
    await this.client.del(key);
  }
}

const redisClient = new RedisClient();
module.exports = redisClient;
