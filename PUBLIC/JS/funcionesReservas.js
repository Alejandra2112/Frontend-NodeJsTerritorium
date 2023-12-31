const url = 'https://backnodejsapptower.onrender.com/api/reservas/reservas';

const listarReservas = async () => {
  let body = document.getElementById('contenido');
  if (body) {
    let mensaje = '';

    fetch(url)
      .then(res => res.json())
      .then(data => {
        const reserva = data.reservas;
        reserva.map((reservas) => {
          const fechaInicio = new Date(reservas.fecha).toLocaleDateString();
          const fechaFin = new Date(reservas.fechaFinal).toLocaleDateString();


          if (reservas.capacidad === '') {
            reservas.capacidad = 'N/A';
          } if (reservas.vehiculo === '') {
            reservas.vehiculo = 'N/A';
          } if (reservas.parqueadero === '') {
            reservas.parqueadero = 'N/A';
          }


          mensaje += `<tr><td>${reservas.tipoEspacio}</td>` +
            `<td>${reservas.espacio}</td>` +
            `<td>${reservas.propietario}</td>` +
            `<td>${fechaInicio}</td>` +
            `<td>${fechaFin}</td>` +
            `<td>${reservas.vehiculo}</td>` +
            `<td>${reservas.parqueadero}</td>` +
            `<td>${reservas.capacidad}</td>` +
            `<td>
              <a class="waves-effect waves-light btn modal-trigger" href="#modal1" onclick='editar(${JSON.stringify(reservas)})'><i class = "fe fe-edit fe-24"></i></a>

              <a class="waves-effect waves-light btn modal-trigger red" href="#" onclick='eliminar("${reservas._id}")'><i class = "fe fe-delete fe-24"></i></a>
            </td></tr>`;
        });
        body.innerHTML = mensaje;
      })
  }
};

listarReservas();




const registrarReserva = async () => {
  // Captura de valores de datos enviados desde el formulario
  let tipoEspacio = document.getElementById('tipoEspacio').value;
  let espacio = document.getElementById('espacio').value;
  let propietario = document.getElementById('propietario').value
  let fechaFinal = document.getElementById('fechaFin').value
  let vehiculo = document.getElementById('vehiculo').value
  let parqueadero = document.getElementById('parqueadero').value
  let capacidad = document.getElementById('capacidad').value


  let reservas = {
    tipoEspacio: tipoEspacio,
    espacio: espacio,
    propietario: propietario,
    fechaFinal: fechaFinal,
    vehiculo: vehiculo,
    parqueadero: parqueadero,
    capacidad: capacidad

  };
  if (tipoEspacio !== '' && espacio !== '' && propietario !== '' && fechaFinal !== '') {
    fetch(url, {
      method: 'POST',
      mode: 'cors',
      body: JSON.stringify(reservas),
      headers: { "Content-type": "application/json; charset=UTF-8" },
    })
      .then(response => response.json())
      .then(json => {
        Swal.fire({
          icon: 'success',
          title: '¡Éxito!',
          text: json.reservas,
          showCancelButton: false,
          showConfirmButton: true,
          allowOutsideClick: false
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.href = 'reservas';
          }
        });
      });

  } else {
    Swal.fire({
      icon: 'error',
      title: 'Tienes campos vacios',
      text: 'Por favor, completa los campos obligatorios'
    });
  }
}

if (document.querySelector('#btnRegistrarR')) {
  document.querySelector('#btnRegistrarR')
    .addEventListener('click', registrarReserva);
}
const eliminar = (_id) => {
  Swal.fire({
    title: '¿Está seguro de realizar la eliminación?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Sí',
    cancelButtonText: 'Cancelar'
  }).then((result) => {
    if (result.isConfirmed) {
      // Captura de valores de datos enviados desde el formulario
      let reservas = {
        _id: _id
      };

      fetch(url, {
        method: 'DELETE',
        mode: 'cors',
        body: JSON.stringify(reservas),
        headers: { "Content-type": "application/json; charset=UTF-8" }
      })
        .then(response => response.json())
        .then(json => {
          if (json.mensaje) {
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: json.mensaje
            });
          } else {
            Swal.fire({
              icon: 'success',
              title: 'Eliminación Exitosa',
              text: 'Se eliminó la reserva correctamente',
              timer: 2000, 
              timerProgressBar: true, 
              onClose: () => {
                location.reload(); 
              }
            });
          }
        });
    }
  });
};



const editar = (reservas) => {
  document.getElementById('_id').value = '';
  document.getElementById('tipoEspacio').value;
  document.getElementById('espacio').value;
  document.getElementById('propietario').value
  document.getElementById('fechaFin').value
  document.getElementById('vehiculo').value
  document.getElementById('parqueadero').value
  document.getElementById('capacidad').value


  document.getElementById('_id').value = reservas._id
  document.getElementById('tipoEspacio').value = reservas.tipoEspacio
  document.getElementById('espacio').value = reservas.espacio
  document.getElementById('propietario').value = reservas.propietario
  document.getElementById('fechaFin').value = reservas.fechaFinal ? reservas.fechaFinal.substring(0, 10) : '';
  document.getElementById('vehiculo').value = reservas.vehiculo
  document.getElementById('parqueadero').value = reservas.parqueadero
  document.getElementById('capacidad').value = reservas.capacidad

}

const actualizarReserva = async () => {
  let tipoEspacio = document.getElementById('tipoEspacio').value;
  let espacio = document.getElementById('espacio').value;
  let propietario = document.getElementById('propietario').value
  let fechaFinal = document.getElementById('fechaFin').value
  let vehiculo = document.getElementById('vehiculo').value
  let parqueadero = document.getElementById('parqueadero').value
  let capacidad = document.getElementById('capacidad').value


  let reservas = {
    _id: document.getElementById('_id').value,
    tipoEspacio: tipoEspacio,
    espacio: espacio,
    propietario: propietario,
    fechaFinal: fechaFinal,
    vehiculo: vehiculo,
    parqueadero: parqueadero,
    capacidad: capacidad,
    tipoModificacion: 'Unitaria'
  };

  console.log(reservas)


  if (tipoEspacio !== '' && espacio !== '' && propietario !== '' && fechaFinal !== '') {
    fetch(url, {
      method: 'PUT',
      mode: 'cors',
      body: JSON.stringify(reservas),
      headers: { "Content-type": "application/json; charset=UTF-8" }
    })
      .then(response => response.json())
      .then(json => {
        Swal.fire({
          icon: 'success',
          title: 'Reservas',
          text: json.reservas,
          allowOutsideClick: true, 
          willClose: () => {
            window.location.href = "reservas"; 
          }
        });
      });
  } else {
    Swal.fire({
      icon: 'error',
      title: 'Tienes campos vacios',
      text: 'Por favor, completa los campos obligatorios'
    });
  }
}


const editarButton = document.querySelector('#btnActualizar');
if (editarButton) {
  editarButton.addEventListener('click', actualizarReserva);
}
