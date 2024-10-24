const express = require('express')
const router = express.Router() 
const register = require('../controller/registerController')

router.get('/', register.getAllUsers)
router.get('/:id', register.getSingleUser)
router.put('/:id', register.updateUser)
router.delete('/:id', register.deleteUser)
router.post('/create', register.createNewUser)

module.exports = router