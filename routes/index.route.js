const express = require('express');
const router = express.Router();
const {body} = require('express-validator/check');

//importar controladores
const homeController = require('../controllers/Home.controller');
const productsController = require('../controllers/Products.controller');
const ventasController = require('../controllers/Ventas.controller');
const gastosController = require('../controllers/Gastos.controller');
const usuariosController = require('../controllers/Usuarios.controller');
const authController = require('../controllers/Auth.controller');



module.exports = () =>{
    //Home
    router.get('/', 
    authController.usuarioAutenticado,
    homeController.productsHome);

    //productos-------------------------------------------------------------
    router.get('/productos', 
    authController.usuarioAutenticado,
    productsController.products);
    
    //guardar nuevo producto
    router.post('/productos', 
    authController.usuarioAutenticado,
    //sanemos los campos del formulario
    body('nombre, cantidad, stock, precioCosto ,precioVenta').not().isEmpty().trim().escape(),
    productsController.nuevoProducto);

    // //editar producto
    router.post('/productos/:id',
    authController.usuarioAutenticado, 
    body('nombre, cantidad, stock, precioCosto ,precioVenta').not().isEmpty().trim().escape(),
    productsController.editarProducto);

    //eliminar producto
    router.delete('/productos/:id', 
    authController.usuarioAutenticado,
    productsController.eliminarProducto)

    //ventas-------------------------------------------------------------
    router.get('/ventas', 
    authController.usuarioAutenticado,
    ventasController.ventas);

    router.post('/ventas', 
    authController.usuarioAutenticado,
    //sanemos los campos del formulario
    body('nombre, cantidad, precioVenta,fechaVenta').not().isEmpty().trim().escape(),
    ventasController.nuevaVenta);


    //gastos-------------------------------------------------------------
    router.get('/gastos', 
    authController.usuarioAutenticado,
    gastosController.gastos);

    router.post('/gastos', 
    authController.usuarioAutenticado,
    gastosController.nuevoGasto);


    //crear cuentas-------------------------------------------
    router.get('/crear-cuenta', usuariosController.formCrearCuenta);
    router.post('/crear-cuenta', usuariosController.crearCuenta);

    //login-------------------------------------------
    router.get('/login', usuariosController.formIniciarSesion);
    router.post('/login', authController.autenticarUsuario)

    //cerrar sesion-------------------------------------------
    router.get('/cerrar-sesion', authController.cerrarSesion)


    //usuarios-------------------------------------------
    router.get('/usuarios', 
    usuariosController.isRole,
    usuariosController.getUsers);
    router.post('/usuario', usuariosController.activarUsuario);


   

    return router;
}