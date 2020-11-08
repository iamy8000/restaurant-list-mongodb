const express = require('express')
const bodyParser = require('body-parser')
const exphbs = require('express-handlebars')
const methodOverride = require('method-override')
const session = require('express-session')
const usePassport = require('./config/passport')

const routes = require('./routes')
require('./config/mongoose')

const TodoRestaurant = require('./models/todo_restaurant')

const app = express()

// setting static files
app.use(express.static('public'))

//setting handlebars
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

//setting session
app.use(session({
  secret: 'ThisIsMySecret',
  resave: false,
  saveUninitialized: true
}))

app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

usePassport(app)
app.use((req, res, next) => {
  // 你可以在這裡 console.log(req.user) 等資訊來觀察
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.user = req.user
  next()
})


// 將 request 導入路由器
app.use(routes)

//search
app.get('/search', (req, res) => {
  const keyword = req.query.keyword
  TodoRestaurant.find({
    $or: [
      { name: { $regex: keyword, $options: 'i' } }, { category: { $regex: keyword, $options: 'i' } }
    ]
  }).lean()
    .then(restaurants => {
      console.log(restaurants.length)
      if (restaurants.length === 0) {
        const warning = `Sorry, we cannot found "${keyword}", please add it to the restaurants list. Thank you!`
        res.render('index', { warning })
      } else {
        res.render('index', { restaurants, keyword })
      }
    })
    .catch(error => console.log(error))
})

app.listen(3000, () => (
  console.log('App is running on http://localhost:3000')
))