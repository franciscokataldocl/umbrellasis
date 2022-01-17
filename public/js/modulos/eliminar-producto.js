import Swal from 'sweetalert2';
import axios from 'axios';

const btnEliminar = document.querySelectorAll('.btn-eliminar');

const btnArr = [...btnEliminar]

if(btnEliminar){
  btnArr.map(item=>{
    item.addEventListener('click', (e) => {
        const id = e.target.dataset.id;
        const nombre = e.target.dataset.nombre;



        Swal.fire({
            title: `Eliminar ${nombre}?`,
            text: "Esta acción no se puede deshacer",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: 'var(--red)',
            cancelButtonColor: 'var(--grey-2)',
            confirmButtonText: 'Si, eliminar'
          }).then((result) => {
            if (result.isConfirmed) {

              //peticion por axios para eliminar
              const url = `${location.origin}/productos/${id}`;

              axios.delete(url, 
                {params:{id}})
                .then(function(res){
                  console.log(res)

                  Swal.fire(
                    'Eliminado',
                    `${nombre} fue eliminado`,
                    'success',
                  )
                  setTimeout(() => {
                    location.reload();
                  }, 1500);
                })
             
            }
          }).catch(()=>{
            Swal.fire({
              type: 'error',
              title: 'Hubo un error',
              text: 'No se pudo eliminar el proyecto'
            })
          })
      });




})
}

