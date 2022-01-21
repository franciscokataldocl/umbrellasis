
const Ventas = require('../models/Ventas.model');
const Products = require('../models/Products.model');
const Usuarios = require('../models/Usuarios.model');

exports.ventas = async (req,res)=>{
    const role = res.locals.usuario.role;
    const username = res.locals.usuario.nombre;
    const ventas = await Ventas.findAll({
        order: [
            ['created_at', 'DESC']
        ],
        include: [
            {
                model: Products, as: Products.productos
            }
        ],
        include: Usuarios
    });

 

   

    res.render('ventas', {
        nombrePagina: 'Ventas',
        ventas,
        role,
        username
      
    });
}

exports.nuevaVenta = async (req,res) =>{

    const ventas = await Ventas.findAll({
        order: [
            ['created_at', 'DESC']
        ]
    });
    const productos = await Products.findAll({
        order: [
            ['nombre', 'ASC']
        ]
    });

    

    const productoId = req.body.nombre.split('-')[0];
    const nombre = req.body.nombre.split('-')[1];


    let {cantidad,fechaVenta} = req.body;
    const usuarioId =res.locals.usuario.id

    try {

       
        const item = await Products.findOne({
            where:{
                id:productoId
            }
        });

      

        //resultado entre el stock del producto en la bbdd y la cantidad que se intenta vender
        const restoStock = item.stock - cantidad;

        if(restoStock < 0){
            return res.render('ventas', {
                error: {
                    errors: {'message': 'El producto no tiene stock suficiente para la venta'},
                  },
                nombrePagina: 'Ventas',
                ventas,
                productos
    
            })
        }

        const precioVenta = item.precioVenta * cantidad;

       const imagen = item.imagen;
       //console.log(imagen)
        
        const fechaFormat = fechaVenta.split('/').join('-');
        fechaVenta = fechaFormat;

        await Ventas.create({nombre, cantidad, imagen, precioVenta, fechaVenta, productoId, usuarioId});
        Products.decrement('stock', { by: `${cantidad}`, where: { id: `${productoId}` }});
        
       
        res.redirect('back');
       

    } catch (error) {
        //res.redirect('back'); 
    //    console.log(`errores ------------------ ${error.errors[0].message}`)
        res.render('ventas', {
            error: error.errors,
            nombrePagina: 'Ventas',
            ventas

        })
    }
}