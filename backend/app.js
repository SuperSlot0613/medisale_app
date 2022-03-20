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
const shortid = require("shortid");
const Stripe = require("stripe");
app.use(cors());

const port = 3003;
const PUBLISHABLE_KEY =
  "pk_test_51J1XdTSDeAiXyTkgBNUMtGq6tvOz0yxAUMjoYKr0CXfSmzZjrUm1eA77irtXUpldQcor1V6k39PCVcj0hMJdU2IJ00mmMY9knC";
const SECRET_KEY =
  "sk_test_51J1XdTSDeAiXyTkgWpfIqWKDqz1JyibgpS9KEswETt3dNDy0ETlGcRlzqx9wBnoCTeLKvtf56cj17K3rkLKYvNYd004fkTwYYW";
const stripe = Stripe(SECRET_KEY, { apiVersion: "2020-08-27" });

app.post("/payments", async (req, res) => {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      description: "Software development services",
      shipping: {
        name: "Jenny Rosen",
        address: {
          line1: "510 Townsend St",
          postal_code: "98140",
          city: "San Francisco",
          state: "CA",
          country: "INR",
        },
      },
      amount: 1099,
      currency: "usd",
      payment_method_types: ["card"],
    });
    console.log(paymentIntent);

    const clientSecret = paymentIntent.client_secret;

    res.json({
      clientSecret: clientSecret,
    });
  } catch (e) {
    console.log(e.message);
    res.json({ error: e.message });
  }
});

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
