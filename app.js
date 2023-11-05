// da8fd0734220138db432e123be02e267-us21
// first api
// 2b85cc526b


// aaab0770637717bffd5bd5349cc81aba-us21

const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));


app.get("/", function(req, res){
    res.sendFile(__dirname + "/signup.html");
})

app.post("/", function(req, res){

    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const emailName = req.body.emailName;
    
    const data = {
        members: [
            {
                email_address: emailName,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName
                }
            } 
        ]
    }
    
    const jsonData = JSON.stringify(data);

    const url = "https://us21.api.mailchimp.com/3.0/lists/2b85cc526b";

    const options = {
        method: "POST",
        auth: "vbar1:aaab0770637717bffd5bd5349cc81aba-us21"
    }

    const request = https.request(url, options, function(response){
        
        if (response.statusCode === 200) {
            res.sendFile(__dirname + "/success.html");
        } else {
            res.sendFile(__dirname + "/failure.html");
        }


        response.on("data", function(data){
            console.log(jsonData);
        })
    });

    request.write(jsonData);
    request.end();
    
})


app.post("/failure", function(req, res) {
    res.redirect("/");
})


app.listen(process.env.PORT || 3000, function(){
    console.log("server is running on port 3000");
    
    
});
