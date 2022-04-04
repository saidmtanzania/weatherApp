const express = require('express');
const bodyParser = require('body-parser');
const https = require('https');
const request = require('request');


const app = express();
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));



app.get("/", (req,res)=>{
    res.sendFile(__dirname + "/index.html");
});
app.post("/", (req,res)=>{
    const city = req.body.cityName;
    const query = city;
    const apiKey = "194444ab308da66000500f7c24212114"
    const unit = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&units="+unit+"&appid="+apiKey;
    https.get(url,(response)=>{
        response.on('data', (data)=>{
            const receiveD = JSON.parse(data);
            const temp = receiveD.main.temp;
            const Description = receiveD.weather[0].description;
            const icon = receiveD.weather[0].icon;
            const imageURL = "http://openweathermap.org/img/wn/"+icon+"@2x.png";

            res.write(`<h1>The weather is currently ${Description}</h1><br/>
                        <p>The Temperature in ${city} is : ${temp}</p>`);
            res.write('<img src='+imageURL+'>');
            res.send();
        });
    });
})

app.listen(3000, ()=>{
    console.log("server is up and running :D");
})