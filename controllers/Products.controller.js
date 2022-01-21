const { v4: uuidv4 } = require('uuid');
const path = require('path');

const cloudinary = require('../helpers/imageUpload');




//modelo productos
const Products = require('../models/Products.model');
const Usuarios = require('../models/Usuarios.model');


//al entrar en /productos
exports.products = async (req, res) => {
    const role = res.locals.usuario.role;
    const username = res.locals.usuario.nombre;
    //traer todos los productos de la bbdd a traves del modelo Products
    const productos = await Products.findAll({
        order: [
            ['created_at', 'DESC']
        ],
        include: Usuarios
    });
    //pasar ese resultado a la vista
    res.render('productos', {
        nombrePagina: 'Productos',
        productos,
        role,
        username
        
    });
}

//crear nuevo producto
exports.nuevoProducto = async (req, res) => {


 
    const productos = await Products.findAll({
        order: [
            ['created_at', 'DESC']
        ]
    });

    //leer imagen
    const file = req.files;
    const dataProducto = req.body;
    dataProducto.imagen = '';
    dataProducto.usuarioId =res.locals.usuario.id



if(file){
    //nombre imagen
    
    
    const result = await cloudinary.uploader.upload(req.files.imagen.tempFilePath, {
        public_image:`${uuidv4()}-${Date.now()}${file.imagen.name.split(' ').join('-')}`,
        width:400,
        crop: 'fill'
    });
    dataProducto.imagen = result.secure_url;


    
}
   try {
        

    
        
        
        //ruta de almacenamiento imagen
        //const savePath = path.join(__dirname, '../public/dashimages/productos/');
        await Products.create(dataProducto);
        //file.imagen.mv(`${savePath}${dataProducto.imagen}`)
        res.redirect('back');

   } catch (error) {
       
    res.render('productos', {
                error: error.errors,
                nombrePagina: 'error',
                productos
        
            })
   }
    

}



// editar producto
exports.editarProducto = async (req, res) => {
   
    const productos = await Products.findAll({
        order: [
            ['created_at', 'DESC']
        ]
    });
    const file = req.files;
    const producto = await Products.findOne({ where: { id: req.params.id } });
    

    if(file){
        const result = await cloudinary.uploader.upload(req.files.imagen.tempFilePath, {
            public_image:`${uuidv4()}-${Date.now()}${file.imagen.name.split(' ').join('-')}`,
            width:400,
            crop: 'fill'
        });
        producto.imagen = result.secure_url;
        //producto.imagen = req.body.imagen
       
    }
   try {
    
    if(producto){
        producto.nombre = req.body.nombre === '' ? producto.nombre : req.body.nombre 
        producto.marca = req.body.marca === '' ? producto.marca : req.body.marca 
        producto.cantidad = req.body.cantidad === '' ? producto.cantidad : req.body.cantidad
        producto.stock = req.body.stock === '' ? producto.stock : req.body.stock 
        producto.precioCosto = req.body.precioCosto === '' ? producto.precioCosto : req.body.precioCosto 
        producto.precioVenta = req.body.precioVenta === '' ? producto.precioVenta : req.body.precioVenta

    
        
            
   const saveProducto =  await producto.save();

         return res.redirect('back')
    }


   } catch (error) {
    res.render('productos',  {
        error: error.errors,
        nombrePagina: 'error',
        productos

    })
   }

 



}



//eliminar producto
exports.eliminarProducto = async (req,res, next) =>{
    
    //req, query o params
    //console.log(req.params.id)

    const {id} = req.params;
    try {
        const resultado = await Products.destroy({where:{
            id: id
        }});

        if(!resultado){
            return next();
        }
        res.status(200).send('Producto eliminado')
    } catch (error) {
        res.render('productos',{
            nombrePagina: 'Productos'
        })
    }
}