const express = require('express')

const router = express.Router();

const {CreateAdmin, GetByIdAdmin, GetAdmin, EditAdmin, login} = require('../constroller/adminController')

router.post('/add',  CreateAdmin)
router.post('/login',  login)
router.get('/all', GetAdmin)
router.get('/:id', GetByIdAdmin)
router.put('/:id', EditAdmin)



module.exports = router