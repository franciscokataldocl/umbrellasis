const openEditar = document.querySelectorAll('.open-editar');
const modalEditarOuter = document.querySelector('.modal-editar-outer');
const closeModalEditar = document.querySelector('.close-modal-editar');
const cancelEditarButton = document.querySelector('.btn-cancel-editar');
const formEditar = document.getElementById('formEditar')

const openModaledit = Array.from(openEditar);

openModaledit.map((button)=>{
button.addEventListener('click', (e) => {

    //data atributos producto desde boton editar
  const id = button.getAttribute('data-id');
  const nombre = button.getAttribute('data-nombre');
  const marca = button.getAttribute('data-marca');
  const cantidad = button.getAttribute('data-cantidad');
  const stock = button.getAttribute('data-stock');
  const precioCosto = button.getAttribute('data-costo');
  const precioVenta = button.getAttribute('data-venta');
  const imagen = button.getAttribute('data-imagen');

  formEditar.action=`/productos/${id}`

  //poner atributos del producto en value de inputs
  const inputNombre = document.getElementById('inputNombre')
  inputNombre.value = nombre;

  const inputMarca = document.getElementById('inputMarca')
  inputMarca.value = marca;

  const inputCantidad = document.getElementById('inputCantidad')
  inputCantidad.value = cantidad;

  const inputStock = document.getElementById('inputStock')
  inputStock.value = stock;

  const inputCosto = document.getElementById('inputCosto')
  inputCosto.value = precioCosto;

  const inputVenta= document.getElementById('inputVenta')
  inputVenta.value = precioVenta;

  const imagenEditar = document.getElementById('imgPreviewEditar');
 
  imagenEditar.style.backgroundImage =`url('${imagen}')`;
  

  
  modalEditarOuter.classList.toggle('show-modal');
});
});

closeModalEditar.addEventListener('click', (e) => {

    modalEditarOuter.classList.remove('show-modal');
});

cancelEditarButton.addEventListener('click', (e) => {

    modalEditarOuter.classList.remove('show-modal');
});




