const Sequelize = require('sequelize');
const db = require('../config/db');
const bcrypt = require('bcrypt');
const Products = require('../models/Products.model');
const Ventas = require('../models/Ventas.model');
const Gastos = require('../models/Gastos.model');


const Usuarios = db.define('usuarios', {
    id:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,

    },
    email:{
        type: Sequelize.STRING(60),
        allowNull: false,
        unique: true,
        validate:{
            isEmail: {msg: 'Agrega un Email válido'},
            notEmpty: {msg: 'El Password no puede estar vacío'}
        },
        unique:{
            args: true,
            msg: 'Usuario ya registrado'
        }
    },
    nombre:{
        type: Sequelize.STRING,
        allowNull: false,
        validate:{
            notEmpty: {msg: 'El Nombre no puede estar vacío'}
        }
    },
    password:{
        type: Sequelize.STRING(60),
        allowNull: false,
        validate:{
            notEmpty: {msg: 'El Password no puede estar vacío'}
        }
    }
},
//nuevo hook
//antes de almacenar el usuario en la bbdd hasheamos el password
{
    hooks: {
        beforeCreate(usuario){
            //usuario es un objeto que contiene el nombre, email y pass
            usuario.password = bcrypt.hashSync(usuario.password, bcrypt.genSaltSync(10));
            
        }
    }
}
);

//metodo personalizado
Usuarios.prototype.verificarPassword = function(password){
    return bcrypt.compareSync(password, this.password);
}

// Usuarios.hasMany(Products);
// Usuarios.hasMany(Ventas);
// Usuarios.hasMany(Gastos);


//exportamos el modelo
module.exports = Usuarios;
