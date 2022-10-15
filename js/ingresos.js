console.log("ingreso al js");

const bd_Api = "https://ucamp.alumnos.dev4humans.com.mx";
const tbl_ingresos = document.getElementById("tbl_ingresos");
const alumnos = document.getElementById("alumnos");

cargar_lista = () => {
  fetch(bd_Api + "/Main/endpoint_alumnos", {
    method: "GET",
    mode: "cors",
  })
    .then((response) => response.json())
    .then((result) => {
      console.log(result);
      tbl_ingresos.innerHTML = "";
      for (const ingreso of result.data) {
        let tr = `<tr>
            <td>${ingreso.id}</td>
            <td>${ingreso.nombre}</td>
            <td>${ingreso.calificacion}</td>

            </tr>`;
        tbl_ingresos.innerHTML += tr;
      }
      if (result.data.length == 0) {
        tbl_ingresos.innerHTML = `<tr><td colspan="5" class="text-center">No hay ingresos</td></tr>`;
      }
    })
    .catch((error) => {
      console.log(error);
    });
};

cargar_lista_card = () => {
  fetch(bd_Api + "/Main/endpoint_alumnos", {
    method: "GET",
    mode: "cors",
  })
    .then((response) => response.json())
    .then((result) => {
      console.log(result);
      alumnos.innerHTML = "";
      for (const ingreso of result.data) {
        let div = `
        <div class="present col-md-5 card" >
           <img src="img/perfil.png" alt="perfil">
            <small>codigo</small>
            <small>${ingreso.id}</small>
            <small>Nombre Completo</small>
            <small>${ingreso.nombre}</small>
            <small>Nota</small>
            <p>${ingreso.calificacion}</p>
        </div>
            `;
        alumnos.innerHTML += div;
      }
      if (result.data.length == 0) {
        tbl_ingresos.innerHTML = `<tr><td colspan="5" class="text-center">No hay ingresos</td></tr>`;
      }
    })
    .catch((error) => {
      console.log(error);
    });
};

Agregar = () => {
  console.log("entro a agregar");
  let form_data = new FormData();
  form_data.append("nombre", document.getElementById("nombre").value);
  form_data.append(
    "calificacion",
    document.getElementById("calificacion").value
  );
  fetch(bd_Api + "/Main/endpoint_alumnos", {
    method: "POST",
    mode: "cors",
    body: form_data,
  })
    .then((response) => response.json())
    .then((result) => {
      console.log(result);
      limpiar_form();
      cargar_lista();
    })
    .catch((error) => {
      console.log("Error detectado");
    });
};

limpiar_form = () => {
  document.getElementById("calificacion").value = "";
};

cargar_lista();
cargar_lista_card();
