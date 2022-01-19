const Sequelize = require('sequelize')
const Usuarios = require('../models/Usuarios.model');

exports.formCrearCuenta = (req,res) =>{
    res.render('crear-cuenta',{
        nombrePagina: 'crear cuenta',
    });
}



exports.crearCuenta =  async (req,res) =>{
    
   //leer los datos
    const {email,nombre, password} = req.body;


    try {
        //crear usuario
        await  Usuarios.create({
            email,
            nombre,
            password
        });
        res.redirect('/login')

    } catch (error) {
        //generar errores
        req.flash('error', error.errors.map(error => error.message))

        res.render('crear-cuenta', {
            //pasar errores a la vista con flash (agregado a locals en el index)
            mensajes: req.flash(),
            nombrePagina: 'Crear cuenta',
            email,
            nombre,
            password

        })
        
    }

   

}


exports.formIniciarSesion = (req,res) =>{

    res.render('login',{
        nombrePagina: 'Iniciar Sesión',
        errores: req.flash().error
    });
}

