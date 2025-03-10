const express = require("express");
const jobRoutes = require("./routes/jobRoutes");
const statusRoutes = require("./routes/statusRoutes");
require("./worker");

require("dotenv").config();

const app = express();
app.use(express.json());

app.use("/api", jobRoutes);
app.use("/api", statusRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
