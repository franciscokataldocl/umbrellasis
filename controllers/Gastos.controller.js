
const { v4: uuidv4 } = require('uuid');
const path = require('path');

const cloudinary = require('../helpers/imageUpload')




//modelo productos
const Gastos= require('../models/Gastos.model');
const Usuarios= require('../models/Usuarios.model');



exports.gastos = async (req,res)=>{
    const role = res.locals.usuario.role;
    const username = res.locals.usuario.nombre;

    const gastos = await Gastos.findAll({
        order: [
            ['created_at', 'DESC']
        ],
        include: Usuarios
    });

    //console.log(gastos);

    res.render('gastos', {
        nombrePagina: 'Gastos',
        gastos,
        role,
        username
    });
}





exports.nuevoGasto = async (req, res) =>{

    const gastos = await Gastos.findAll({
        order: [
            ['created_at', 'DESC']
        ]
        
    });
    

    //leer imagen
    const file = req.files;
    const dataGasto = req.body;
    dataGasto.imagen = '';
    dataGasto.usuarioId =res.locals.usuario.id

    

    if(file){
        const result = await cloudinary.uploader.upload(req.files.imagen.tempFilePath, {
            folder: 'gastos',
            public_image:`${uuidv4()}-${Date.now()}${file.imagen.name.split(' ').join('-')}`,
            width:800,
            crop: 'fill'
        });
        //console.log(result.url)
        dataGasto.imagen = result.url;
       
   }
   try {
     
       await Gastos.create(dataGasto);
       
       res.redirect('back');

  } catch (error) {
   res.render('gastos', {
               error: error.errors,
               nombrePagina: 'Gastos',
               gastos
       
           })
  }
}