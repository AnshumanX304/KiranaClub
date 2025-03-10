const { addJob } = require("../services/jobService");

exports.submitJob = async (req, res) => {
  const { count, visits } = req.body;
//   console.log(" I am inside controller layer !!");
  console.log(count);
  console.log(visits);
  if (!count || count !== visits.length) {
    return res.status(400).json({ error: "Invalid count or visits data" });
  }

  const jobId = await addJob(visits);
  res.status(201).json({ job_id: jobId });
};
