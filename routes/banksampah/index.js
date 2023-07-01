const express = require('express');
const router = express.Router();
const auth = require('../../middlewares/authorization')
const controller = require('../../config/controllers')

// users
router.get('/v1/getAllUsers', auth.doAuth, controller.usercontroller.getAllUsers)
router.post('/v1/postUsers', auth.doAuth, controller.usercontroller.postUsers)
router.delete('/v1/deleteUsers/:id', auth.doAuth, controller.usercontroller.deleteUsers)

// roles
router.get('/v1/getAllRoles', auth.doAuth, controller.usercontroller.getAllRoles)
router.post('/v1/postRoles', auth.doAuth, controller.usercontroller.postRoles)
router.delete('/v1/deleteRoles/:id', auth.doAuth, controller.usercontroller.deleteRoles)

module.exports = router