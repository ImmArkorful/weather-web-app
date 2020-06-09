const path =  require('path');
const express = require('express');
const hbs = require('hbs');
const forecast = require('./utils/forecast');
const geocode = require('./utils/geocode');

const app = express();
const port = process.env.PORT || 3000;

//define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname,'../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials')

// setup handle bars engine and views location
app.set('view engine','hbs');
app.set('views',viewsPath);
hbs.registerPartials(partialsPath);

//setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('',(req,res)=>{
    res.render('index', {
        title: 'Weather',
        name : 'Emmanuel Arkorful'
    });
})

app.get('/about', (req,res)=>{
    res.render('about',{
        title : 'About me',
        name : 'Emmanuel Arkorful'
    });
})

app.get('/help', (req,res) =>{
    res.render('help', {
        title : 'Help',
        message : 'This displays the help you need for this site',
        name : 'Emmanuel Arkorful'
    })
})
app.get('/weather',(req,res)=>{
    if(!req.query.address){
      return res.send({
            error : 'Address must be provided!'
        })
    }else{
        geocode(req.query.address, (error,{location} = {})=>{
            if(error){
                return res.send({error});
            }
                forecast(location,(error,forecastData)=>{
                    if(error){
                        return res.send({error});
                    }
                    
                        res.send({
                            location : location,
                            address : req.query.address,
                            forecast : forecastData
                        })
                    
                })
            
        })
    }
})

app.get('/products', (req,res)=>{
    if (!req.query.search) {
        return res.send({
            error : 'You must provide a search term'
        })
    }
    console.log(req.query.search);
    res.send({
        products : []
    })
})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        title : '404',
        name : 'Emmanuel Arkorful',
        message :'Help article not found'
    });d
})
app.get('*',(req,res)=>{
    res.render('404',{
        title : '404',
        name : 'Emmanuel Arkorful',
        message: 'Page not found.'
    });
})

app.listen(port,()=>{
    console.log('Server is up on port '+ port);
})