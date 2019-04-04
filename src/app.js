const path = require('path');
const express = require('express')
const hbs = require('hbs')
const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')

const app = express()

//Define paths for express Config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

// Setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res)=>{
  res.render('index',{
    title: 'Weather',
    name: 'Krunal Joshi'

  })
})

app.get('/about',(req,res)=>{
  res.render('about',{
    title:'About Me',
    name:'Wade Wilson'
  })
})

app.get('/help',(req,res)=>{
  res.render('help',{
    title: 'Help Page',
    name:'Krunal Joshi'
  })
})

app.get('/help/*',(req,res)=>{
  res.render('error',{
    title:'Help Article not Found!'
  })
})


app.get('/weather',(req,res)=>{
const addressLocation = req.query.address
if(!addressLocation){
  return res.send({
    error:'Please provide an address'
  })
}
  geocode(addressLocation, (error,{latitude,longitude,location} = {})=>{
    if(error){ return res.send({ error }) }
    forecast(latitude,longitude,(error,forecastData)=>{
        if(error){ return res.send({ error }) }

      res.send({
        forecast:forecastData,
        location:location,
        address: addressLocation
      })
    })
  })

})


app.get('*',(req, res)=>{
  res.render('error',{
    title:'Page not Found'
  })
})

app.listen(3000, ()=>{
  console.log('Server is up and running on port 3000');
})
