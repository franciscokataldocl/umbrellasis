const { Sequelize } = require('sequelize');

//IMPORTANTE importar la configuracion de la bbdd
const db = require('../config/db');

//creamos la tabla en la bbdd definiendo sus campos

const Products = db.define('productos', {
    id:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement:true
    },
    nombre:{
        type: Sequelize.STRING(60),
        validate:{
            notEmpty: {
                msg: 'Nombre no puede estar vacío'
            }
        }
    },
    marca:{
        type: Sequelize.STRING(60),
        validate:{
            notEmpty: {
                msg: 'Marca no puede estar vacío'
            }
        }
    },
    cantidad:{
        type: Sequelize.STRING,
        validate:{
            notEmpty: {
                msg: 'Cantidad no puede estar vacío'
            },
            
              
        }
    },
    stock:{
        type: Sequelize.INTEGER,
        validate:{
            notEmpty: {
                msg: 'Stock no puede estar vacío'
            }

        }
    },
    precioCosto:{
        type: Sequelize.INTEGER,
        validate:{
            notEmpty: {
                msg: 'Precio costo no puede estar vacío'
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
    imagen:{
        type: Sequelize.STRING,
        validate:{
            notEmpty: {
                msg: 'Imagen no puede estar vacío'
            }
        }
    },
    created_at: {
    type: 'TIMESTAMP',
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    allowNull: false
  },
  updated_at: {
    type: 'TIMESTAMP',
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    allowNull: false
  }

})



//exportamos el modelo
module.exports = Products;