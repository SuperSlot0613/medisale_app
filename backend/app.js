var express = require("express");
var app = express();
// var fs = require("fs");
// var base64ToImage = require("base64-to-image");
// var spawn = require("child_process").spawn;
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
// var multer = require("multer");
var request = require("request-promise");
var cors = require("cors");
app.use(cors());

const port = 3003;

// var storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "uploads");
//   },
//   filename: (req, file, cb) => {
//     cb(null, file.fieldname + "-" + Date.now());
//   },
// });

// var upload = multer({ storage: storage });

// app.post("/faceregister", async (req, res) => {
//   var base64Str = await req.body;
//   base64Data = base64Str.imageUrl;
//   var path = "./Knowimages/";
//   var optionalObj = { fileName: `${base64Str.name}`, type: "png" };

//   base64ToImage(base64Data, path, optionalObj);

//   var imageInfo = base64ToImage(base64Data, path, optionalObj);
//   // console.log(imageInfo)

//   res.send(imageInfo);
// });

// app.post("/facelogin", async (req, res) => {
//   var base64Str = await req.body;
//   // console.log(base64Str.imageUrl);
//   base64Data = base64Str.imageUrl;
//   var path = "./Uknowimages/";
//   var optionalObj = { fileName: `image`, type: "png" };

//   base64ToImage(base64Data, path, optionalObj);

//   var imageInfo = base64ToImage(base64Data, path, optionalObj);

//   var process = spawn("python", ["./Login.py", false]);

//   process.stdout.on("data", function (data) {
//     var mystr = data.toString();
//     var myjson = JSON.parse(mystr);
//     console.log(myjson);
//     res.send(myjson);
//   });
// });

app.post("/facevalidation", async (req, res) => {
  console.log("API IS CALL");
  var imageSchema = await req.body;
  var data = {
    document: imageSchema.documentImage,
    faceimage: imageSchema.faceimage,
  };

  var options = {
    method: "POST",
    uri: "http://127.0.0.1:5000/imagechecker",
    body: data,
    json: true,
  };

  var sendrequest = await request(options)
    .then(function (parsedBody) {
      // console.log(parsedBody);
      console.log("API IS CALL");
      let result;
      result = parsedBody["result"];
      console.log("The face verification Code is running", result);
      res.send(result);
    })
    .catch(function (err) {
      console.log(err);
    });
});

app.listen(port, () => {
  console.log(`Listen on port ${port}`);
});
