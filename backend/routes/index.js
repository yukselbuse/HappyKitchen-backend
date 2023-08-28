const express = require("express")
const router = express.Router();
var cors = require('cors')

const admin = require("./admin.js")
const categories = require("./categories.js")


router.get('/', (req, res) => {
    res.end('hey');
});

router.use('/products', admin);


module.exports = router;