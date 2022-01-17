//modelos
const Products = require('../models/Products.model');
const Ventas = require('../models/Ventas.model');
const Gastos = require('../models/Gastos.model');
const { Sequelize } = require('sequelize');
const { Op } = require("sequelize");


exports.productsHome = async (req,res)=>{
const ventas = await Ventas.sum('precioVenta');

const ventasMes = await Ventas.findAll({
    attributes: [[Sequelize.fn('sum', Sequelize.col('precioVenta')), 'total']],
    where: {
        fechaVenta: {
            [Op.gte]: Sequelize.literal("NOW() - INTERVAL 1 month"),
        }
      },
      raw: true,
      order: Sequelize.literal('total DESC')
})



const gastosMes = await Gastos.sum('montoGasto');


    const productos = await Products.findAll({
        where: {
            stock: {
                [Op.lt]: 5,
            }
          },
        order: [
            ['created_at', 'DESC']
        ]
    });

    res.render('index', {
        nombrePagina: 'Inicio',
        productos,
        ventas,
        ventasMes,
        gastosMes
    });
}