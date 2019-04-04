const request  =require('request')

const forecast = (latitude,longitude,callback) => {

  const url ='https://api.darksky.net/forecast/00869d32501e81332f28624010e8eb16/'+ latitude + ',' + longitude+'?units=si'

  request({url, json:true},(error, {body}) => {
      if(error){
        callback('Error',undefined)
      }else if (body.error) {
        callback('Unable to find the location',undefined)
      }else{
        callback(undefined,
          // summary:response.body.daily.data[0].summary,
          // temperature:response.body.currently.temperature,
          // precipProbability:response.body.currently.precipProbability
          "The forecast is " + body.daily.data[0].summary + ". With Temperature being " + body.currently.temperature + " degrees")
      }
  })
}


module.exports = forecast
