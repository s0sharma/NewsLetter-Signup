const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");
const { resourceUsage } = require("process");


const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req, res){
      res.sendFile(__dirname + "/signup.html");
});


app.post("/", function(req,res){
      const FirstName = req.body.fname;
      const LastName = req.body.lname;
      const email = req.body.email;


      const data = {
            members: [
                  {
                        email_address: email,
                        status: "subscribed",
                        merge_fields: {
                              FNAME: FirstName,
                              LNAME: LastName
                        }
                  }
            ]
      };

      const jsonData = JSON.stringify(data);

      const url = "https://us6.api.mailchimp.com/3.0/lists/0f121886d0";

      const options = {
            method: "POST",
            auth: "saurabh1:d29bbea822e0b488181b87848255f710-us6"
      }


      const request = https.request(url, options, function(response){
           
            if(response.statusCode === 200){
                  res.sendFile(__dirname + "/success.html")
            }else{
                  res.sendFile(__dirname + "/failure.html")

            }
           
            response.on("data", function(data){
                  console.log(JSON.parse(data))
            })
      })

      request.write(jsonData);
      request.end();

});


app.post("/failure", function(req, res){
      res.redirect("/")
});


app.listen(process.env.PORT || 3000, function(){
      console.log("Server is running at port 3000");
});


//d29bbea822e0b488181b87848255f710-us6
//0f121886d0