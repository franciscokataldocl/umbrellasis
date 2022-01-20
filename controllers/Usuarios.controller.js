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

//console.log(res.locals.mensajes);
const {error} = res.locals.mensajes
    res.render('login',{
        nombrePagina: 'Iniciar Sesión',
        errores: error
    });
}



exports.getUsers = async (req,res) =>{

    const usuarios = await Usuarios.findAll({
        where:{role:'guest'},
        order: [
            ['nombre', 'DESC']
        ]
    });
    

    res.render('usuarios',{
        nombrePagina: 'Usuarios',
        usuarios,
    });
}

exports.activarUsuario = async (req,res) =>{
    const {email, activo} = req.body;
    
    const usuario = await Usuarios.findOne({
        where:{
            email:email
        }
    })

    if(!usuario){
       return res.redirect('back')
    }

    if(activo == 0){
        await usuario.update({
            activo: 1
        });
        return res.send(usuario)
    }
    if(activo == 1){
        await usuario.update({
            activo: 0
        });
        return res.send(usuario)
    }

}

//verificar si usuario logueado es administrador para proteger rutas
exports.isRole = (req, res, next) =>{
    const role = res.locals.usuario.role;

    if(role === 'guest'){
        return res.redirect('/')
    }
    next();
}