const bcrypt = require('bcryptjs')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const mongoose = require('mongoose')
const restaurantList = require('../../restaurant.json').results
const TodoRestaurant = require('../todo_restaurant')
const User = require('../user')
const db = require('../../config/mongoose')
const SEED_USER = [
  {
    email: 'user1@example.com',
    password: '12345678'
  },
  {
    email: 'user2@example.com',
    password: '12345678'
  }
]

db.once('open', () => {
  let restaurants = restaurantList
  SEED_USER.forEach(user => {
    bcrypt
      .genSalt(10)
      .then(salt => bcrypt.hash(user.password, salt))
      .then(hash => User.create({
        name: user.name,
        email: user.email,
        password: hash
      }))
      .then(user => {
        const userId = user._id
        return Promise.all(Array.from({ length: 3 }, (v, i) => {
          TodoRestaurant.create({
            id: restaurants[i].id,
            name: restaurants[i].name,
            name_en: restaurants[i].name_en,
            category: restaurants[i].category,
            image: restaurants[i].image,
            location: restaurants[i].location,
            phone: restaurants[i].phone,
            google_map: restaurants[i].google_map,
            rating: restaurants[i].rating,
            description: restaurants[i].description,
            userId: user._id
          })
        }))
          .then(restaurants.splice(0, 3))
        // .then(() => console.log(restaurants))
      })
  })
  console.log('done')
  // process.exit()
})