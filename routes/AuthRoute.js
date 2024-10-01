const express = require('express');
const auth = require('../middlewares/auth');
const {registrationController,loginController }= require('../controller/registrationController');
const { getusercontroller, updateUser,resetpassword, deleteUser, getAllusercontroller  } = require('../controller/getuserController');
const updatepasword = require('../controller/updatepassword');

let Router = express.Router()

Router.post('/userregister',registrationController)
Router.post('/userlogin',loginController)

Router.get('/getAllUser',auth,getAllusercontroller)
Router.get('/getSingleUser',auth,getusercontroller)
Router.put('/updateUser',auth,updateUser)
Router.post('/resetpassword',auth,resetpassword)
Router.post('/updatepassword',auth,updatepasword)
Router.delete('/deleteUser/:id',auth,deleteUser)

//logOut from all browsers




module.exports = Router