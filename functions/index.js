const functions = require("firebase-functions");
var app = express();
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
var request = require("request-promise");
var cors = require("cors");
app.use(cors());

const port = 3003;

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
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
