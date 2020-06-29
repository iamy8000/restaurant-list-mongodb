const express = require('express')
const bodyParser = require('body-parser')
const router = express.Router()
const TodoRestaurant = require('../../models/todo_restaurant')
let sortOrder = { name: 1 } //default sort order

//index.handlebars
router.get('/', (req, res) => {
  if (Object.keys(req.query).length > 0) {
    let sort = req.query.sort
    let order = Number(req.query.order)
    sortOrder = {}
    sortOrder[sort] = order //排序選項
    TodoRestaurant.find()
      .lean()
      .sort(sortOrder)
      .then(restaurants => res.render('index', { restaurants }))
      .catch(error => console.log(error))
  } else {
    TodoRestaurant.find()
      .lean()
      .sort(sortOrder)
      .then(restaurants => res.render('index', { restaurants }))
      .catch(error => console.log(error))
  }
})


module.exports = router