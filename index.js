const express = require('express');
const router = require('./routes/index.route');
const path = require('path');
const bodyParser = require('body-parser');
const fileupload = require("express-fileupload");
const fs = require('fs');
const expressValidator = require('express-validator')
const session = require('express-session');
const flash = require('connect-flash');

require('dotenv').config({path:'variables.env'});


//crear conexion a bbdd
const db = require('./config/db');

//importar modelos
require('./models/Products.model');
require('./models/Ventas.model');
require('./models/Gastos.model');
//crear app de express
const app = express();

const PORT = process.env.BD_PORT || 3001 ;
const HOST = process.env.BD_HOST || '0.0.0.0';

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


//habilitar expressValidator
app.use(expressValidator());

app.use(flash());


//rutas
app.use('/', router())

console.log(process.env.BD_NAME)
console.log(process.env.BD_HOST)
console.log(process.env.BD_PORT)
console.log(process.env.BD_PASS)
console.log(process.env.BD_USER)


//levantar servidor express
app.listen(PORT, HOST, ()=> {
    console.log('el servidor esta funcionando')
});