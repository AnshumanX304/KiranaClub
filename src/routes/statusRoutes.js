const express = require("express");
const { getJobStatus } = require("../controllers/statusController");

const router = express.Router();

router.get("/status", getJobStatus);

module.exports = router;
