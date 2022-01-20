const express = require('express');
const router = require('./routes/index.route');
const path = require('path');
const bodyParser = require('body-parser');
const fileupload = require("express-fileupload");
const fs = require('fs');
const expressValidator = require('express-validator')
const session = require('express-session');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');

const passport = require('./config/passport')

require('dotenv').config({path:'/.env'});


//crear conexion a bbdd
const db = require('./config/db');

//importar modelos
require('./models/Products.model');
require('./models/Ventas.model');
require('./models/Gastos.model');
require('./models/Usuarios.model');
//crear app de express
const app = express();

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || '0.0.0.0';




//sincronizar modelos con la base de datos
db.sync()
.then(()=> console.log('conectado a la base de datos'))
.catch(error => console.log(error))


//habilitar archivos estaticos
app.use(express.static('public'));
//view engine PUG
app.set('view engine', 'pug');

//añadir carpeta vistas
app.set('views', path.join(__dirname, './views'));




//habilitar subida de archivos
//configuraciones fileupload
app.use(fileupload({
    useTempFiles : true,
    /* (2.) Definir que el límite para la carga de imágenes es de 5MB. */
    limits: { fileSize: 5000000},
    abortOnLimit: true,
    /* (3.) Responder con un mensaje indicando que se sobrepasó el límite especificado. */
    responseOnLimit: "Límite de 5MB superados, intente nuevamente con una imagen de menor peso"
}))

//habilitar bodyParser
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json())


//habilitar expressValidator
app.use(expressValidator());



app.use(flash());

app.use(cookieParser());

app.use(session({
    secret: process.env.SECRET,
    key: process.env.KEY,
    resave:false,
    saveUninitialized: false,
}));

//passport
app.use(passport.initialize());
app.use(passport.session());

//locals
app.use((req,res,next) =>{
    res.locals.mensajes = req.flash();
    res.locals.usuario = {...req.user} || null;
    next();
    
})


//rutas
app.use('/', router())



//levantar servidor express
app.listen(PORT, HOST, ()=> {
    console.log('el servidor esta funcionando')
});