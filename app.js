const express = require('express')
const bodyParser = require('body-parser')
const exphbs = require('express-handlebars')
const port = 3000
const methodOverride = require('method-override')

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
//index.handlebars
app.get('/', (req, res) => {
  TodoRestaurant.find()
    .lean()
    .then(restaurants => res.render('index', { restaurants }))
    .catch(error => console.log(error))
})

//search
app.get('/search', (req, res) => {
  const keyword = req.query.keyword

  TodoRestaurant.find({
    name: { $regex: keyword }
  }).lean()
    .then(restaurants => res.render('index', { restaurants }))
})

//new.handlebars(將使用者導引至new.handlebars)
app.get('/restaurants/new', (req, res) => {
  return res.render('new')
})

//接住使用者新增的資料
app.post('/restaurants', (req, res) => {
  const name = req.body.name
  const name_en = req.body.name_en
  const rating = req.body.rating
  const category = req.body.category
  const location = req.body.location
  const google_map = req.body.google_map
  const phone = req.body.phone
  const description = req.body.description
  const image = req.body.image

  return TodoRestaurant.create({ // 存入資料庫
    name,
    name_en,
    rating,
    category,
    location,
    google_map,
    phone,
    description,
    image
  })
    .then(() => res.redirect('/')) // 新增完成後導回首頁
    .catch(error => console.log(error))
})


//show.handlebars
app.get('/restaurants/:id', (req, res) => {
  const id = req.params.id
  TodoRestaurant.findById(id)
    .lean()
    .then(restaurant => res.render('show', { restaurant }))
    .catch(error => console.log(error))
})

//edit.handlebars
app.get('/restaurants/:id/edit', (req, res) => {
  const id = req.params.id
  TodoRestaurant.findById(id)
    .lean()
    .then(restaurant => res.render('edit', { restaurant }))
    .catch(error => console.log(error))
})

//edit.handlebars, 接住編輯資訊
app.put('/restaurants/:id', (req, res) => {
  const id = req.params.id
  const category = req.body.category
  const location = req.body.location
  const google_map = req.body.google_map
  const phone = req.body.phone
  const description = req.body.description
  const image = req.body.image
  TodoRestaurant.findById(id)
    .then(restaurant => {
      restaurant.category = category
      restaurant.location = location
      restaurant.google_map = google_map
      restaurant.phone = phone
      restaurant.description = description
      restaurant.image = image
      return restaurant.save()
    })
    .then(() => res.redirect(`/restaurants/${id}`))
    .catch(error => console.log(error))
})

//delete function
app.delete('/restaurants/:id', (req, res) => {
  const id = req.params.id
  return TodoRestaurant.findById(id)
    .then(todo => todo.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

app.listen(port, () => (
  console.log('App is running on http://localhost:3000')
))