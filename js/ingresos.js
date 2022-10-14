console.log("ingreso al js");

const bd_Api = "http://ucamp.alumnos.dev4humans.com.mx";
const tbl_ingresos = document.getElementById("tbl_ingresos");

cargar_lista = () => {
  fetch(bd_Api + "/Main/endpoint_alumnos", { method: "GET" })
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

Agregar = () => {
  console.log("entro a agregar");
  let form_data = new FormData();
  form_data.append("nombre", document.getElementById("nombre").value);
  form_data.append("monto", document.getElementById("monto").value);

  fetch(bd_Api + "/Main/endpoint_ingresos_mensuales", {
    method: "POST",
    body: form_data,
  })
    .then((response) => response.json())
    .then((result) => {
      console.log(result);
      cargar_lista();
    })
    .catch((error) => {
      console.log("Error detectado");
    });
};

limpiar_form = () => {
  document.getElementById("monto").value = "";
};

cargar_lista();
