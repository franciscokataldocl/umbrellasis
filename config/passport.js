const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

//referencia al modelo donde vamos a autenticar
const Usuarios = require('../models/Usuarios.model');

//localStrategy - login con credenciales propias (email-password)

passport.use(
    new LocalStrategy(
        //por default passport espera usuario y password
        {
            usernameField: 'email',
            passwordField: 'password'
        },
        async (email, password, done) =>{

            try {

                const usuario = await Usuarios.findOne({
                    where:{email: email}
                });

                //usuario existe, pero el password es incorrecto
                //fn verificarPassword esta en el modelo Usuario
                if(!usuario.verificarPassword(password)){
                    return done(null, false,{
                        message: 'password incorrecto'
                    })
                }
                if(usuario.activo === 0){
                    return done(null, false,{
                        message: 'Usuario no autorizado'
                    })
                }

                //caso contrario el email existe, y el password es correcto
                return done(null, usuario)

            } catch (error) {
                //Ese usuario no existe
                return done(null, false,{
                    message: 'Esa cuenta no existe'
                })
            }
        }
    )
    
);


//serializar usuario
passport.serializeUser((usuario, callback) =>{
    callback(null, usuario);
})

//deserializar usuario
passport.deserializeUser((usuario, callback) =>{
    callback(null, usuario);
})


module.exports = passport;