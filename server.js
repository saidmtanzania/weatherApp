// jshint esversion:6
const express = require('express');
const bodyParser = require('body-parser');
const https = require('https');
const request = require('request');


const app = express();
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies.";
const Talk = "404";
const tcontento = "Ut enim ad minim veniam, quis nostrud exercitation ullamco "
const Mtn = "Page under maintenance";


app.get("/", (req,res)=>{
    res.render("home",{title:tcontento,StartContent:homeStartingContent});
});
app.get('/about',(req,res)=>{
    res.render("about",{title:Talk,StartContent:Mtn});
});
app.get('/contact',(req,res)=>{
    res.render("contact",{title:Talk,StartContent:Mtn});
});
app.post("/", (req,res)=>{
    const city = req.body.cityName;
    const query = city;
    const apiKey = "194444ab308da66000500f7c24212114";
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
});

app.listen(3000, ()=>{
    console.log("server is up and running :D");
});