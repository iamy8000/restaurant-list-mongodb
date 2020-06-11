const express = require('express')
const bodyParser = require('body-parser')
const exphbs = require('express-handlebars')
const port = 3000
const app = express()

//setting handlebars
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
app.use(bodyParser.urlencoded({ extended: true }))

//setting mongoose and mongodb
//connect app.js with database
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/todo-restaurant', { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection
db.on('error', () => {
  console.log('mongodb error')
})

db.once('open', () => {
  console.log('mongodb connected!')
})

//setting router
app.get('/', (req, res) => {
  res.render('index')
})

app.listen(port, () => (
  console.log('App is running on http://localhost:3000')
))