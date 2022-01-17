const express = require('express');
const router = express.Router();
const {body} = require('express-validator/check');

//importar controladores
const homeController = require('../controllers/Home.controller');
const productsController = require('../controllers/Products.controller');
const ventasController = require('../controllers/Ventas.controller');
const gastosController = require('../controllers/Gastos.controller');



module.exports = () =>{
    //Home
    router.get('/', homeController.productsHome);

    //productos-------------------------------------------------------------
    router.get('/productos', productsController.products);
    
    //guardar nuevo producto
    router.post('/productos', 
    //sanemos los campos del formulario
    body('nombre, cantidad, stock, precioCosto ,precioVenta').not().isEmpty().trim().escape(),
    productsController.nuevoProducto);

    // //editar producto
    router.post('/productos/:id', 
    body('nombre, cantidad, stock, precioCosto ,precioVenta').not().isEmpty().trim().escape(),
    productsController.editarProducto);

    //eliminar producto
    router.delete('/productos/:id', productsController.eliminarProducto)

    //ventas-------------------------------------------------------------
    router.get('/ventas', ventasController.ventas);

    router.post('/ventas', 
    //sanemos los campos del formulario
    body('nombre, cantidad, precioVenta,fechaVenta').not().isEmpty().trim().escape(),
    ventasController.nuevaVenta);


    //gastos-------------------------------------------------------------
    router.get('/gastos', gastosController.gastos);
    router.post('/gastos', gastosController.nuevoGasto);
   

    return router;
}