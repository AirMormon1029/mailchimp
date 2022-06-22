const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const PORT = 3000;
const https = require("https")
var app = express();

app.use(express.static("public"))
app.use(bodyParser.urlencoded({
    extended: true
}))


app.get("/", function (req, res) {

    res.sendFile(__dirname + "/public/signup.html");
})


app.post("/", function (req, res) {

    var firstName = req.body.fname;
    var lastName = req.body.lname;
    var email = req.body.email;
    var data = {
        members: [{

            email_address: email,
            status: "subscribed",
            merge_fields: {
                FNAME: firstName,
                LNAME: lastName
            }
        }]
    }


    var jsonData = JSON.stringify(data);
    const url = "https://us17.api.mailchimp.com/3.0/lists/a298578b28";
    const options = {

        method: "POST",
        auth: "connor1:d92d46fafda12948ad9c656a047e6f1c-us17"
    }

    const request = https.request(url, options, function (response) {
        response.on("data", function (data) {
            console.log(JSON.parse(data));
        })

    })
    request.write(jsonData);
    request.end();

});




app.listen(process.env.PORT || 3000, function () {

    console.log("app listening on port " + PORT)
})


//API KEY
//d92d46fafda12948ad9c656a047e6f1c-us17

//listId
//a298578b28