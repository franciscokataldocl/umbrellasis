const { Sequelize } = require('sequelize');
//IMPORTANTE importar la configuracion de la bbdd
const db = require('../config/db');
const moment = require('moment');

const Products = require('../models/Products.model')


//creamos la tabla en la bbdd definiendo sus campos

const Ventas = db.define('ventas', {
    id:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement:true
    },
    nombre:{
        type: Sequelize.STRING(100),
        validate:{
            notEmpty: {
                msg: 'Nombre no puede estar vacío'
            }
        }
    },
    imagen:{
        type: Sequelize.STRING,
        validate:{
            notEmpty: {
                msg: 'la imagen no puede estar vacía'
            }
        }
    },
    cantidad:{
        type: Sequelize.INTEGER,
        validate:{
            notEmpty: {
                msg: 'Cantidad no puede estar vacío'
            }
        }
    },
    precioVenta:{
        type: Sequelize.INTEGER,
        validate:{
            notEmpty: {
                msg: 'Precio venta no puede estar vacío'
            }
        }
    },
    
    fechaVenta: {
    type: 'DATE',
    allowNull: false,
    validate:{
        notEmpty: {
            msg: 'Debes agregar una fecha'
        }
    },
    get() {
        return moment(this.getDataValue('fechaVenta')).format('DD/MM/YYYY');
    }
  },
  created_at: {
    type: 'TIMESTAMP',
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    allowNull: false
  }

});

Ventas.belongsTo(Products);


//exportamos el modelo
module.exports = Ventas;