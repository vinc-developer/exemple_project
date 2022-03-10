const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');


router.get('/:id', userController.getById);
router.get('/get-all', userController.getAll);
router.post('/create', userController.register);
router.put('/update-user', userController.updateUser);
router.put('/update-password', userController.updatePassword);
router.delete('/delete', userController.remove);

module.exports = router;
