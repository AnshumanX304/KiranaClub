const { createClient } = require("redis");

const redisClient = createClient({
  url: "redis://localhost:6379",
});

redisClient.on("error", (err) => {
  console.error("Redis Client Error:", err);
});

(async () => {
  try {
    await redisClient.connect();
  } catch (error) {
    console.error("Redis connection failed:", error);
  }
})();

module.exports = redisClient;
