//Decir datos, conexion botones, intercambio de páginasy Querys

const express = require('express'); 
const router = express.Router();

const pool = require('../database');
const {isLoggedIn} = require('../lib/auth');

const app = express ();

router.get('/add', isLoggedIn, (req, res)=>{
    res.render('links/add.hbs');
});

router.post('/add', isLoggedIn, async (req, res)=>{
    const {title, description, files} = req.body;
    const newLink = {
        title,
        description,
        files,
        user_id: req.user.id
    }
    //Manda los valores de newLink a la DB
    await pool.query('INSERT INTO links set ?', [newLink]); 
    req.flash('success', 'Saved correctly');
    res.redirect('/links');
});

//Mostrar documentos guardados
router.get('/', isLoggedIn, async (req, res) => { //////////////////////links
    const links = await pool.query('SELECT * FROM links WHERE user_id = ?', [req.user.id]);
    res.render('links/list.hbs', {links});
});

//Para ver sólo documentos
router.get('/documents', async(req, res)=>{
    const docs = await pool.query('SELECT * FROM docsdefault');
    res.render('links/docs.hbs', {docs});    // res.render('links/docs.hbs', {docsdefault});
});

//--Para eliminar--//
router.get('/delete/:id', isLoggedIn, async (req, res) => {
    const {id} = req.params;
    //ELIMINA DE BD ... de tabla links id=coincida
    await pool.query('DELETE FROM links WHERE ID = ?', [id]);
    req.flash('success', 'Deleted correctly');
    res.redirect('/links');
});

//--Para editar--//

router.get('/edit/:id', isLoggedIn, async (req, res) => {
    const{id} = req.params;
    const links = await pool.query('SELECT * FROM links WHERE id = ?', [id]);
    res.render('links/edit.hbs', {link: links[0]}); 
});

router.post('/edit/:id', isLoggedIn, async (req, res) => {
    const{id} = req.params;
    const {title, description, files} = req.body;
    const newLink = {
        title,
        description, 
        files
    }
    await pool.query('UPDATE links set ? WHERE id = ?', [newLink, id]);  
    req.flash('success', 'Edited correctly');
    res.redirect('/links');
});

module.exports = router;


//--Para proyectar--//

router.get('/play/:id', isLoggedIn, async(req, res) => {
    const{id} = req.params;
    const docs = await pool.query('SELECT files FROM links WHERE id = ?', [id]);
    const title = await pool.query('SELECT title FROM links WHERE id = ?', [id]);
    req.flash('success', 'Se está proyectando', [title]);
    res.redirect('/links');

    var hexString = "633331633430616265303"; 
    hexString = hexString + id;
    hexString = hexString + "6134613863326533";
    const rawHex = Buffer.from(hexString, 'hex');
    const hexString2 = "6333316333356162636134613863326533";  
        const rawHex2 = Buffer.from(hexString2, 'hex');
        var net = require('net');
        var HOST = '192.168.4.1';
        var PORT = 5233;
        var client = new net.Socket();
        client.connect(PORT, HOST, function() {
            console.log('CONNECTED TO: ' + HOST + ':' + PORT);
            client.write(rawHex);
            console.log('Data sent');
        });

        client.on('data', function(data) { 
            console.log('DATA: ' + data);
            client.write(rawHex2);
            client.destroy(); 
        });

        client.on('close', function() {
            console.log('Connection closed');
        }); 

});

router.get('/pausa/:id', isLoggedIn, async(req, res) => {
    const{id} = req.params;
    const docs = await pool.query('SELECT files FROM links WHERE id = ?', [id]);
    const title = await pool.query('SELECT title FROM links WHERE id = ?', [id]);
    req.flash('success', 'Se pausó', [title]);
    res.redirect('/links');

        const hexString = "6333316333346162636134613863326533";
        const rawHex = Buffer.from(hexString, 'hex');
        var net = require('net');
        var HOST = '192.168.4.1';
        var PORT = 5233;
        var client = new net.Socket();

        client.connect(PORT, HOST, function() {
            console.log('CONNECTED TO: ' + HOST + ':' + PORT);
            client.write(rawHex);
            console.log('Data sent');
        });

        client.on('data', function(data) { 
            console.log('DATA: ' + data);
            client.destroy(); 

        });

        client.on('close', function() {
            console.log('Connection closed');
        });
        
});