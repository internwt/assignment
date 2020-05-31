const express = require('express');
const router = express.Router();
const User = require('../database/models/userModel');
const db = require('../database/database-config');

router.get('/', (req, res) => {
    res.send('hi');
})

router.get('/users', async (req, res) => {
    User.findAll().then(users => {
        console.log(users);
    }).catch(e => {
        console.log(e);
    })
})

module.exports = router;