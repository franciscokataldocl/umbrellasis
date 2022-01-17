const { v4: uuidv4 } = require('uuid');
const path = require('path');

const cloudinary = require('../helpers/imageUpload')




//modelo productos
const Products = require('../models/Products.model');


//al entrar en /productos
exports.products = async (req, res) => {
    //traer todos los productos de la bbdd a traves del modelo Products
    const productos = await Products.findAll({
        order: [
            ['created_at', 'DESC']
        ]
    });
    //pasar ese resultado a la vista
    res.render('productos', {
        nombrePagina: 'Productos',
        productos
    });
}

//crear nuevo producto
exports.nuevoProducto = async (req, res) => {

console.log('filessss')
 
    const productos = await Products.findAll({
        order: [
            ['created_at', 'DESC']
        ]
    });

    //leer imagen
    const file = req.files;
    const dataProducto = req.body;
    dataProducto.imagen = '';



if(file){
    //nombre imagen
    
    
    const result = await cloudinary.uploader.upload(req.files.imagen.tempFilePath, {
        public_image:`${uuidv4()}-${Date.now()}${file.imagen.name.split(' ').join('-')}`,
        width:400,
        height:400,
        crop: 'fill'
    });
    dataProducto.imagen = result.url;


    
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
                nombrePagina: 'Productos',
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
    //console.log(req.params.id)
    const producto = await Products.findOne({ where: { id: req.params.id } });
    const file = req.files;

    if(file){
        const imagen = `${uuidv4()}-${Date.now()}${file.imagen.name.split(' ').join('-')}`;
        const savePath = path.join(__dirname, '../public/dashimages/productos/');
        file.imagen.mv(`${savePath}${imagen}`)
        producto.imagen = imagen;
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