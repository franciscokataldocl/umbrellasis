const { Sequelize } = require('sequelize');

//IMPORTANTE importar la configuracion de la bbdd
const db = require('../config/db');

const moment = require('moment')


const Gastos = db.define('gastos', {
    id:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement:true
    },
    nombre:{
        type: Sequelize.STRING(60),
        validate:{
            notEmpty: {
                msg: 'Nombre gasto no puede estar vacío'
            }
        }
    },
    montoGasto:{
        type: Sequelize.INTEGER,
        validate:{
            notEmpty: {
                msg: 'Monto Gasto no puede estar vacío'
            }
        }
    },
    fechaGasto: {
        type: 'DATE',
        validate:{
            notEmpty: {
                msg: 'Debes agregar una fecha'
            }
        },
        get() {
            return moment(this.getDataValue('fechaGasto')).format('DD/MM/YYYY');
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
    allowNull: false,
    
        get() {
            return moment(this.getDataValue('created_at')).format('DD/MM/YYYY');
        }
  },
  updated_at: {
    type: 'TIMESTAMP',
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    allowNull: false
  }

})

//exportamos el modelo
module.exports = Gastos;