const express = require('express')
const bodyParser = require('body-parser')
const exphbs = require('express-handlebars')
const port = 3000
const app = express()

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
app.use(bodyParser.urlencoded({ extended: true }))

//set router
app.get('/', (req, res) => {
  res.render('index')
})

app.listen(port, () => (
  console.log('App is running on http://localhost:3000')
))