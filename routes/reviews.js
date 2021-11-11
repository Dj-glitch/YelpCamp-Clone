const express = require('express')
const router = express.Router({ mergeParams: true })
const { reviewSchema } = require('../schemas.js')
const { isLoggedIn, validateReview, isReviewAuthor } = require('../middleware')
const Campground = require('../models/campground')
const Review = require('../models/review')
const reviews = require('../controllers/reviews')
const ExpressError = require('../utils/ExpressError')
const catchAsync = require('../utils/catchAsync')

// Create a review!!!!! with validation(no submitting empty reviews.)
router.post('/', isLoggedIn, validateReview, catchAsync(reviews.createReview))

// Delete route for reviews.
router.delete(
	'/:reviewId',
	isLoggedIn,
	isReviewAuthor,
	catchAsync(reviews.deleteReview)
)

module.exports = router
