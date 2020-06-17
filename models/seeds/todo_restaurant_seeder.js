const mongoose = require('mongoose')
const restaurantList = require('../../restaurant.json').results
const TodoRestaurant = require('../todo_restaurant') //載入TodoRestaurant models
const db = require('../../config/mongoose')

db.once('open', () => {
  for (let i = 0; i < restaurantList.length; i++) {
    TodoRestaurant.create({
      id: restaurantList[i].id,
      name: restaurantList[i].name,
      name_en: restaurantList[i].name_en,
      category: restaurantList[i].category,
      image: restaurantList[i].image,
      location: restaurantList[i].location,
      phone: restaurantList[i].phone,
      google_map: restaurantList[i].google_map,
      rating: restaurantList[i].rating,
      description: restaurantList[i].description
    })
    console.log('done')
  }
})