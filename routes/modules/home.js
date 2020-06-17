const express = require('express')
const router = express.Router()
const TodoRestaurant = require('../../models/todo_restaurant')

//index.handlebars
router.get('/', (req, res) => {
  TodoRestaurant.find()
    .lean()
    .then(restaurants => res.render('index', { restaurants }))
    .catch(error => console.log(error))
})


module.exports = router