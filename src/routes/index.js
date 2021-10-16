// Index de las rutas
                
const express = require('express'); 
const router = express.Router();
const pool = require('../database');

router.get('/', async (req, res) => {
    res.render('index.hbs');
});

router.get('/contactus', async (req, res) => {
    res.render('contactus.hbs');
});

router.get('/geogebra', async (req, res) => {
    res.render('geogebra.hbs');
});

router.get('/rhino', async (req, res) => {
    res.render('rhino.hbs');
});

router.get('/documents', async (req, res) => {
    res.render('links/docs.hbs');
});

router.get('/conexion', async (req, res) => {
    res.render('conexion.hbs');
});

//router.use(express.static('./views/partials')); 

module.exports = router;