const { getJobInfo } = require("../services/jobService");

exports.getJobStatus = async (req, res) => {
  const { jobid } = req.query;

  const jobInfo = await getJobInfo(jobid);
  if (!jobInfo) {
    return res.status(400).json({});
  }

  res.status(200).json(jobInfo);
};
