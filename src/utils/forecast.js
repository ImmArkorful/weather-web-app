const request  = require('request')

const forecast = (location,callback) =>{

    const url = 'http://api.openweathermap.org/data/2.5/weather?q=' + location + '&units=metric&appid=f48800c1569389dfe06573ae17181800'

    request({url , json : true}, (error,{body}) => {
        if(error){
            callback('Can not connect to the server',undefined);
        } else if(body.message){
            callback('Invalid location, try a different location',undefined);
        } else{
            const strings =body.weather[0].description
            callback(undefined,`${strings.charAt(0).toUpperCase()}${strings.slice(1)} - It is currently ${body.main.temp} degrees with humidity of ${body.main.humidity}`);
        }
    })

}

module.exports = forecast;