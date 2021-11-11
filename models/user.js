const mongoose = require('mongoose')
const Schema = mongoose.Schema
const passportLocalMongoose = require('passport-local-mongoose')

const UserSchema = new Schema({
	email: {
		type: String,
		required: true,
		unique: true,
	},
})
// adds onto schema username and field for passwords, unique usernames, and more.
UserSchema.plugin(passportLocalMongoose)

module.exports = mongoose.model('User', UserSchema)
