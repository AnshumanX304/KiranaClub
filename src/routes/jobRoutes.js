const express = require("express");
const { submitJob } = require("../controllers/jobController");

const router = express.Router();

router.post("/submit", submitJob);

module.exports = router;
