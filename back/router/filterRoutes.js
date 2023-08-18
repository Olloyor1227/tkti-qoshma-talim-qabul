const express = require('express')
const router = express.Router()


const {
    add, getQuery, getAllUser
} = require('../constroller/FilterController')





router.post('/add',  add)
router.get("/all", getAllUser)
router.get('/filter', getQuery)

module.exports = router