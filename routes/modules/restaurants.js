const express = require('express')
const router = express.Router()
const TodoRestaurant = require('../../models/todo_restaurant')

//new.handlebars(將使用者導引至new.handlebars)
router.get('/new', (req, res) => {
  return res.render('new')
})

//接住使用者新增的資料
router.post('/', (req, res) => {
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
router.get('/:id', (req, res) => {
  const id = req.params.id
  TodoRestaurant.findById(id)
    .lean()
    .then(restaurant => res.render('show', { restaurant }))
    .catch(error => console.log(error))
})



//edit.handlebars
router.get('/:id/edit', (req, res) => {
  const id = req.params.id
  TodoRestaurant.findById(id)
    .lean()
    .then(restaurant => res.render('edit', { restaurant }))
    .catch(error => console.log(error))
})

//edit.handlebars, 接住編輯資訊
router.put('/:id', (req, res) => {
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
router.delete('/:id', (req, res) => {
  const id = req.params.id
  return TodoRestaurant.findById(id)
    .then(todo => todo.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})


module.exports = router