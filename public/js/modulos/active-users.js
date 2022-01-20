import Swal from 'sweetalert2';
import axios from 'axios';

const switches = document.querySelectorAll('.switch');
const switchArr = [...switches]

switchArr.map(item =>{
    item.addEventListener('change', function(e) {


      const email = e.target.dataset.email;
      const activo = e.target.dataset.active;

      
      axios.post('/usuario', {
        email,
        activo
      })
      .then(function (response) {
       
        let status;
        if(response.data.activo == 1){
          status = 'activado'
        }
        if(response.data.activo == 0){
          status = 'desactivado'
        }
        Swal.fire(
          `Usuario ${status}`,
          `${email} fue ${status}`,
          'success',
        )
        setTimeout(() => {
          location.reload();
        }, 1500);
      })
      .catch(function (error) {
        console.log(error);
      });




        if (this.checked) {
    
        
            
        }




      });
})