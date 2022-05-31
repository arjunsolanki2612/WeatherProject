const { response } = require("express");
const express = require("express");
const bodyParser = require("body-parser");
//This(https) is a native node module we dont have to download it 
const https = require("https");
const app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.get("/",(req,res)=>{
    res.sendFile(__dirname+"/index.html")
})
app.post("/",(req,res)=>{
    
    // console.log("post recieved");
    const query = req.body.cityName;
    const apikey = "19c19264b663d71b58bef6818c04cfad";
    const unit = "metric";
    const url="https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apikey+"&units="+unit;
    
    https.get(url,(response)=>{
        // console.log(response.statusCode);
        response.on("data",(data)=>{
            // console.log(data.toString());
            const weatherData=JSON.parse(data);
            const temp = weatherData.main.temp;
            const description = weatherData.weather[0].description;
            const icon= weatherData.weather[0].icon;
            const imgURL = "http://openweathermap.org/img/wn/"+icon+"@2x.png"
            // console.log(temp)
            // console.log(description)
            res.write("<p>The weather is currently "+description +"</p>")
            res.write("<h1>The temp in "+query+" is " + temp+" degrees celcius.</h1>");
            res.write("<img src="+imgURL+">")
            res.send();
            

        })
    })
})

app.listen(3000,function(){
    console.log("server is running on port 3000");
});