const Queue = require("bull");
const { processImage } = require("./services/imageProcessor");
const { updateJobStatus } = require("./services/jobService");
const redisClient = require("./db/db");

const imageQueue = new Queue("imageQueue", {
  redis: {
    url: process.env.REDIS_URL || "redis://localhost:6379",
  },
});

console.log("Bull queue initialized");

imageQueue.process(async (job) => {
  const { visits, jobId } = job.data;
  const results = [];
  const errors = [];

  for (const visit of visits) {
    for (const url of visit.image_url) {
      try {
        const result = await processImage(url);
        results.push({ store_id: visit.store_id, ...result });
      } catch (error) {
        errors.push({
          store_id: visit.store_id,
          error: `Failed to download ${url}`,
        });
      }
    }
  }

  await updateJobStatus(
    jobId,
    errors.length ? "failed" : "completed",
    results,
    errors
  );

  console.log(`Worker finished processing job: ${job.id}`);
});
