const express = require('express');
const app = express();
const request = require('request');
app.set('view engine', 'ejs');
app.set('views', './views');

app.get('/', (req, res) => {
    let url = 'http://api.openweathermap.org/data/2.5/weather?q=Copenhagen,dk&appid=166d00e26d3ff2c6149e89feccc5c59a&units=metric';
    request(url, (err, response, body) => {
        if(!err && response.statusCode == 200){
            let data = JSON.parse(body);
            res.render('home', {data: data});
        }
    });
});

app.get('/result', (req, res) => {
    let query = req.query.city;
    let url = 'http://api.openweathermap.org/data/2.5/weather?q=';
    let key = '&appid=166d00e26d3ff2c6149e89feccc5c59a';
    let metric = '&units=metric';
    let path = url + query + key + metric;

    request(path, (err, response, body) => {
        if(!err && response.statusCode == 200){
            let data = JSON.parse(body);
            res.render('home', {data: data});
        }
    });
});

app.listen(8080, ()=>{
    console.log('Server running on 8080');
});
