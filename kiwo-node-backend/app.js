const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const submissionController = require("./submissionConstroller");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:4200",
    methods: ["GET", "POST"],
    credentials: true,
  })
);

app.use("/api", submissionController);

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
