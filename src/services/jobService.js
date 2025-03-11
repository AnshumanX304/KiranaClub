const Queue = require("bull");
const { v4: uuidv4 } = require("uuid");
const redisClient = require("../db/db");

const imageQueue = new Queue("imageQueue", {
  redis: {
    url: process.env.REDIS_URL,
  },
});

async function addJob(visits) {
  const jobId = uuidv4();

  await redisClient.hSet(`job:${jobId}`, {
    status: "ongoing",
    visits: JSON.stringify(visits),
  });
  await imageQueue.add({ jobId, visits });

  return jobId;
}

async function updateJobStatus(jobId, status, results = [], errors = []) {
  await redisClient.hSet(`job:${jobId}`, {
    status,
    results: JSON.stringify(results),
    errors: JSON.stringify(errors),
  });
}

async function getJobInfo(jobId) {
  const jobData = await redisClient.hGetAll(`job:${jobId}`);

  if (!jobData) return null;

  if (jobData.status == "failed") {
    return {
      job_id: jobId,
      status: jobData.status,
      error: jobData.errors,
    };
  }
  return {
    job_id: jobId,
    status: jobData.status,
  };
}

module.exports = { addJob, updateJobStatus, getJobInfo };
