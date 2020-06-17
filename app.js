const express = require('express')
const bodyParser = require('body-parser')
const exphbs = require('express-handlebars')
const port = 3000
const methodOverride = require('method-override')
const routes = require('./routes')

const app = express()

//載入TodoRestaurant model
const TodoRestaurant = require('./models/todo_restaurant')

// setting static files
app.use(express.static('public'))

//setting handlebars
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
app.use(bodyParser.urlencoded({ extended: true }))

app.use(methodOverride('_method'))

// 將 request 導入路由器
app.use(routes)

//setting mongoose and mongodb
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
//search
app.get('/search', (req, res) => {
  const keyword = req.query.keyword

  TodoRestaurant.find({
    name: { $regex: keyword }
  }).lean()
    .then(restaurants => res.render('index', { restaurants }))
})



app.listen(port, () => (
  console.log('App is running on http://localhost:3000')
))