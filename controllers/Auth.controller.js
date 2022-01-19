const { response } = require('express');
const passport = require('passport');



exports.autenticarUsuario = passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true,
});


//funcion para revisar si usuario esta logeado o no

exports.usuarioAutenticado = (req,res,next) =>{
    //si el usuario esta autenticado, adelante
    if(req.isAuthenticated()){
        return next();
    };

    //caso contrario redirigir al login
    return res.redirect('/login');
}