const express = require('express');
const { organiseMiddleware } = require('../controller/organiseMiddleware');

let OrganiseRoute = express.Router()

OrganiseRoute.post('/organise',organiseMiddleware)

module.exports ={
    OrganiseRoute
}
