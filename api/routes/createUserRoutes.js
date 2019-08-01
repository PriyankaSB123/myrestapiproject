const express = require('express');
const router = express.Router();
const createUserController = require('../controllers/createUserController');
router.post('/register', createUserController.create);
router.post('/login', createUserController.authenticate);
router.get('/profile', createUserController.getAll);


module.exports = router;