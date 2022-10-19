var express = require("express");
var cors = require("cors");
require("dotenv").config();

var app = express();

// body parser
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));

// multer package
var multer = require("multer");

app.use(cors());
app.use("/public", express.static(process.cwd() + "/public"));

app.get("/", function (req, res) {
  res.sendFile(process.cwd() + "/views/index.html");
});

app.post("/api/fileanalyse", function (req, res) {
  // const { upfile } = req.body;
  // get metadata from file (name, type, size) using multer
  const storage = multer.memoryStorage();
  const upload = multer({ storage }).single("upfile");
  upload(req, res, function (err) {
    if (err) {
      return res.status(500).json({ error: err });
    }
    const { originalname, mimetype, size } = req.file;
    res.json({ name: originalname, type: mimetype, size: size });
  });
});

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log("Your app is listening on port " + port);
});
