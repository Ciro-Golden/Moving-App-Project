const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const http = require("http");
const app = express();


app.use(bodyParser.urlencoded({ extended: true }));

const router = express.Router();


app.post("/index", (req, res) => {
    //   console.log(req.body.crypto);

    var crypto = req.body.crypto;
    var fiat = req.body.fiat;

    var amount = req.body.amount;

    var options = {
        url: "https://apiv2.bitcoinaverage.com/convert/global",
        method: "GET",
        qs: {
            from: crypto,
            to: fiat,
            amount: amount
        }
    };

    request(options, function (error, response, body) {
        var data = JSON.parse(body);
        var price = data.price;

        console.log(price);

        var currentDate = data.time;

        res.render("index", { data, price, currentDate, amount, crypto, fiat });
    });
});

module.exports = router;