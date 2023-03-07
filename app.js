const express =  require("express");
const https = require("https");
const bodyParser= require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
   res.sendFile(__dirname+ "/index.html");
   
})
app.post("/", function(req, res){
    // console.log(req.body.cityName);
    const query= req.body.cityName;
const apiKey="058b42501309dfe104f197ab80c9c65a";
const units="metric";
const url ="https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apiKey+"&units="+units;
https.get(url, function(response){
    // console.log(response);
   response.on("data", function(data){
    const weatherData= JSON.parse(data);
    const temp = weatherData.main.temp;
    const weatherDescription = weatherData.weather[0].description;
    const weathericon=  weatherData.weather[0].icon;
    const imgurl= "http://openweathermap.org/img/wn/"+weathericon+"@2x.png"
    console.log(temp);
    // res.send(temp);
    res.write("<h1>The temparature in  "+ query+" is:  "+temp+" degrees celcius </h1>");
    res.write("<p>The Weather is: "+weatherDescription+"</p>");
    res.write("<img src=" +imgurl+">")
    
    
   res.send();
   })
})
})



app.listen(3000, function(){
    console.log("server started on port 3000");
})