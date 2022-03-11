const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');
const auth = require("../middlewares/auth");

router.get('/get-by-id/:id', userController.getById);
router.get('/get-all', userController.getAll);
router.post('/register', userController.register);
router.post('login', userController.login);
router.put('/update-user', auth, userController.updateUser);
router.put('/update-password', userController.updatePassword);
router.delete('/delete/:id', auth, userController.remove);

module.exports = router;
