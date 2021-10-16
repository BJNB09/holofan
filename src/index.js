//Main de todo

//Initializations
const express = require('express'); 
const morgan = require('morgan');
const colors = require('colors');
const ejs = require('ejs');
const math = require('./math.js');
const file = require('./createFile.js');
const app = express ();
const path = require('path');
const exphds = require('express-handlebars');
const flash = require('connect-flash');
const session = require('express-session');
const validator = require('express-validator');
const MySQLStore=require('express-mysql-session');
const passport = require('passport');
const bodyParser = require('body-parser');

const {database} = require('./keys');
const pass = require('./lib/passport');// ./lib/

//Middlewares
app.use(session({
    secret: 'faztmysqlnodesession',
    resave: false,
    saveUninitialized: false, 
    store: new MySQLStore(database)
}));

app.use(flash());
app.use(morgan('dev')); //Registra la petición y el tiempo
app.use(express.urlencoded());
app.use(express.json({extended:false})); //Acepta datos sensillos, no imagenes
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());

//Global variables
app.use((req, res, next) => {
    app.locals.success = req.flash('success');
    app.locals.message = req.flash('message');
    app.locals.user = req.user;
    next();
});

//Settings 
app.set('port', process.env.PORT || 3000);
app.set('appName', 'Primer server');
    //Para ejs
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');//--------------------

app.engine('.hbs', exphds({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    linksDir: path.join(app.get('views'), 'links'),
    extname: '.hbs',
    helpers: require('./lib/handlebars')
}));
//app.set('view engine', '.hbs');
  


//Staring server
app.listen(app.get('port'), () => {
    console.log('Server on port'.red, app.get('port'));
    console.log('Nombre de la app: ', app.get('appName'));
});

console.log('dirname: '.blue,__dirname); // Te manda la dirección del doc


//Routes
app.use(require('./routes'));
app.use(require('./routes/authentication'));
app.use('/links',require('./routes/links'));
//Public
app.use(express.static(path.join(__dirname, 'public')));

//Leer y escribir archivos
//file.writeFile();
//file.readFile();

//Llamar func matematicas
// const division = console.log(math.divide(10,2));

//Otra forma de saber el URL para acceder
//app.use(function(req, res, next){
//    console.log('Requested URL: ', req.url);
//    next();
//});



/*
{
    "nombre": "laptop",
    "precio": 40.2,
    "active": false,
    "created_at": new Date("12/12/1999"),
    "somedata": [1, "a", []],
    "facturer":{
        "name": "dell",
        "version": "xps",
        "location":{
            "city": "usa",
            "address": "asdsfdsda"
        }
    }

}
*/
