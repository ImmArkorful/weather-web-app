const request  = require('request')

// const forecast = () => {
    // const url1 = `http://dataservice.accuweather.com/locations/v1/cities/search?q=${location}&apikey=XRYOQEXKHYCKL7YdNGpIgiMtuiwhT6dT`
    // console.log('Hi');
    
    //  request({url1 , json:true}, (error, {body}) => {
    //     if(error){
    //         return console.log(error);
    //     }
    //     else if(body = [] ){
    //         return console.log('Invalid location');
    //     }
    //     else{
    //         return body;
            
    //     }
    // })
    // console.log(forecast())
    
    
    // const url = 'http://api.openweathermap.org/data/2.5/weather?q='+location+'&units=metric&appid=f48800c1569389dfe06573ae17181800'

    // request({url , json : true}, (error,{body}) => {
    //     if(error){
    //         callback('Can not connect to the server',undefined);
    //     } else if(body.message && body.cod){
    //         callback('Invalid location, try a different location',undefined);
    //     } else{
            // const strings =body.weather[0].description
            // callback(undefined,`${strings.charAt(0).toUpperCase()}${strings.slice(1)} - It is currently ${body.main.temp} degrees with humidity of ${body.main.humidity}.
            // It feels like ${body.main.feels_like}, with air pressure of ${body.main.pressure} millibars, maximum temperature of ${body.main.temp_max} and and minimum temperature of ${body.main.temp_min}`);
    //     }
    // })

// }

// module.exports = forecast;
const forecast = (location,callback) => {
    const url = `http://dataservice.accuweather.com/locations/v1/cities/search?q=${location}&apikey=XRYOQEXKHYCKL7YdNGpIgiMtuiwhT6dT`;
    request({url, json:true}, (error, {body}) => {        
        if(error){
             callback('Can not connect to the server',undefined);
        }
        else if(body.length === 0 ){
            return callback('Invalid location, try a different location',undefined);
        }
        else{
        const key = body[0].Key;
        console.log(body);
                    
        // const url1 = `http://dataservice.accuweather.com/currentconditions/v1/${key}?apikey=XRYOQEXKHYCKL7YdNGpIgiMtuiwhT6dT`
        
        // request({url:url1 , json: true}, (error, {body}) => {
        //     const strings = body[0].WeatherText

            
        //     callback(undefined,`${strings.charAt(0).toUpperCase()}${strings.slice(1)} - It is currently ${body[0].Temperature.Metric.Value} degrees.`);
            
        // })
       
}    
})
}

forecast('accra')
module.exports = forecast;


// const url1 = 'http://dataservice.accuweather.com/locations/v1/cities/search?q=accra&apikey=XRYOQEXKHYCKL7YdNGpIgiMtuiwhT6dT';

// request({url : url1},(error, response) => {
//     console.log(response);
    
// })