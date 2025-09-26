const { createClient } = require("redis")

const client = createClient();

client.on('error', err => console.log('Redis Client Error', err));

(async () => {
  try {
    await client.connect();
    console.log('Redis connected');
  } catch (err) {
    console.error('Redis connect error', err);
  }
})();

module.exports = {
    client,
}