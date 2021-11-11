const mongoose = require('mongoose')
const cities = require('./cities')
const { places, descriptors } = require('./seedHelpers')
const Campground = require('../models/campground')

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
	useNewUrlParser: true,
	// useCreateIndex: true, Not needed after Mongoose v5....
	useUnifiedTopology: true,
})

const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error'))
db.once('open', () => {
	console.log('Database connected')
})

const sample = array => array[Math.floor(Math.random() * array.length)]

const seedDB = async () => {
	await Campground.deleteMany({})
	for (let i = 0; i < 300; i++) {
		const random1000 = Math.floor(Math.random() * 1000)
		const price = Math.floor(Math.random() * 20) + 10
		const camp = new Campground({
			// YOUR USER ID!
			author: '6180c8780d173609e9a5fc58',
			location: `${cities[random1000].city}, ${cities[random1000].state}`,
			title: `${sample(descriptors)} ${sample(places)}`,
			description:
				'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corporis distinctio tempora nihil illo dolor, unde, similique magni cum fugiat tempore quo minima inventore nisi porro sequi provident quaerat, in beatae?',
			price,
			geometry: {
				type: 'Point',
				coordinates: [cities[random1000].longitude, cities[random1000].latitude],
			},
			images: [
				{
					url: 'https://res.cloudinary.com/drgt0t014/image/upload/v1636518289/YelpCamp/bmiw9pgamig8tj0oxjpg.jpg',
					filename: 'YelpCamp/bmiw9pgamig8tj0oxjpg',
				},
				{
					url: 'https://res.cloudinary.com/drgt0t014/image/upload/v1636517814/YelpCamp/pk5qf2nbau9sphy8yxfw.jpg',
					filename: 'YelpCamp/pk5qf2nbau9sphy8yxfw',
				},
			],
		})
		await camp.save()
	}
}

seedDB()
