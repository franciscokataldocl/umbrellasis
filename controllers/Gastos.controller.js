
const { v4: uuidv4 } = require('uuid');
const path = require('path');

const cloudinary = require('../helpers/imageUpload')




//modelo productos
const Gastos= require('../models/Gastos.model');



exports.gastos = async (req,res)=>{

    const gastos = await Gastos.findAll({
        order: [
            ['created_at', 'DESC']
        ]
    });

    res.render('gastos', {
        nombrePagina: 'Gastos',
        gastos
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

    

    if(file){
        const result = await cloudinary.uploader.upload(req.files.imagen.tempFilePath, {
            public_image:`${uuidv4()}-${Date.now()}${file.imagen.name.split(' ').join('-')}`,
            width:800,
            crop: 'fill'
        });
        console.log(result.url)
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