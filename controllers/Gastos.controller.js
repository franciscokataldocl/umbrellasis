
const { v4: uuidv4 } = require('uuid');
const path = require('path');




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
       //nombre imagen
       dataGasto.imagen = `${uuidv4()}-${Date.now()}${file.imagen.name.split(' ').join('-')}`;
       
   }
   try {
        console.log(dataGasto)
       //ruta de almacenamiento imagen
       const savePath = path.join(__dirname, '../public/dashimages/gastos/');
       await Gastos.create(dataGasto);
       file.imagen.mv(`${savePath}${dataGasto.imagen}`)
       res.redirect('back');

  } catch (error) {
   res.render('gastos', {
               error: error.errors,
               nombrePagina: 'Gastos',
               gastos
       
           })
  }
}