var meses = new Array ("Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre");
var f=new Date();
const mesActual = document.getElementById('mesActual').innerHTML = `Total vendido ${meses[f.getMonth()]} de ${f.getFullYear()}`

