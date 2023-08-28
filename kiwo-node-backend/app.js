// const express = require("express");
// const bodyParser = require("body-parser");
// const cors = require("cors");
// const submissionController = require("./submissionController");
// const app = express();
// const fs = require("fs");
// const properties = require("properties-parser");
// const config = properties.read("./app.properties");
// const https = require("https");
// //production ? use DB-PROD properties for dbConfig : use DB-DEV
// const production = config.production === "true";
// const allowedOrigins = ["https://kiwo-uerkental.ch", "http://localhost:4200"];

// const certsPath = "/home/kiwouer1/ssl/certs/";
// const keysPath = "/home/kiwouer1/ssl/keys/";

// const privateKeyFile = production
//   ? fs.readFileSync(
//       `${keysPath}b787a_69f49_328a3bd6fdae2d28d8f6d8e13ec5a413.key`,
//       "utf-8"
//     )
//   : "";
// const certificateFile = production
//   ? fs.readFileSync(
//       `${certsPath}c120b_0fdc1_67b2f876ae83cfa567ccf7af21076c2b.crt`,
//       "utf-8"
//     )
//   : "";

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(
//   cors({
//     origin: allowedOrigins,
//     methods: ["GET", "POST"],
//     credentials: true,
//   })
// );

// app.use("/api", submissionController);

// const port = process.env.PORT || 8080;

// const httpsOptions = {
//   key: privateKeyFile,
//   cert: certificateFile,
// };

// const server = https.createServer(httpsOptions, app);

// if (production) {
//   server.listen(port, () => {
//     console.log(`Server is running on port ${port}`);
//     console.log("Server: " + server);
//   });
// } else {
//   app.listen(port, () => {
//     console.log(`Server is running on port ${port}`);
//     console.log("App: " + app);
//   });
// }
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const submissionController = require("./submissionController");
const app = express();
const allowedOrigins = ["https://kiwo-uerkental.ch", "http://localhost:4200"];
const path = require("path");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cors({
    origin: allowedOrigins,
    methods: ["GET", "POST"],
    credentials: true,
  })
);

app.use("/api", submissionController);
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public_html", "index.html"));
});
const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
