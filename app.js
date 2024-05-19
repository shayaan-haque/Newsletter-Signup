const express = require("express");
const Bodyparser = require("body-parser");
const request = require("request");
const bodyParser = require("body-parser");
const https = require("https");

const app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("publics"));

app.listen(process.env.PORT || 3000,function(){
    console.log("Server is running");
});

app.get("/",function(req,res){
   res.sendFile(__dirname + "/Signup.html");
});


app.post("/",function(req,res){

    var fname=req.body.fname;
    var lname=req.body.lname;
    var email=req.body.email;

    var data = {
        members:[ {
            email_address:email,
            status: "subscribed",
            merge_fields:
            {
                FNAME:fname,
                LNAME:lname
            }
        }]
    };

    var jsonData = JSON.stringify(data);

    const url = "https://us22.api.mailchimp.com/3.0/lists/5dc79845e9";

    const options = {
        method:"POST",
        auth: "Shayaan:ff963bac03cbdc6000c92db4d09e23e7-us22"

    }

   const request =  https.request(url,options,function(response)
    {
        if(response.statusCode==200)
        {
            res.sendFile(__dirname + "/Success.html");
        }
        else 
        {
            res.sendFile(__dirname +"/Failure.html");
        }
        response.on("data",function(data)
        {
        console.log(JSON.parse(data));
        })
    })

  request.write(jsonData);
  request.end();
});


//api Key ff963bac03cbdc6000c92db4d09e23e7-us22
//5dc79845e9