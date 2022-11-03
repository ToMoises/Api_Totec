console.log("ingreso al js");
const key_publica = "71b9c455b2db1a44f45b6f0be9c16729";
const key_privada = "f316b0a4baf66cd8eb06cf0f9b4c34e390882211";
const api_marvel =
  "https://gateway.marvel.com:443/v1/public/characters?ts=1&apikey=71b9c455b2db1a44f45b6f0be9c16729&hash=b37207cc6fe7cf8d6ccfdbfd66e24727";
const api_marvel_comics =
  "https://gateway.marvel.com:443/v1/public/comics?ts=1&apikey=71b9c455b2db1a44f45b6f0be9c16729&hash=b37207cc6fe7cf8d6ccfdbfd66e24727";
const tbl_ingresos = document.getElementById("tbl_ingresos");
const alumnos = document.getElementById("alumnos");

cargar_lista = () => {
  fetch(api_marvel)
    .then((response) => response.json())
    .then((result) => {
      console.log(result);
      tbl_ingresos.innerHTML = "";
      for (const marvel of result.data.results) {
        let tr = `<tr>
            <td>${marvel.id}</td>
            <td>
            <img class="img_marvel" src=" ${marvel.thumbnail.path}.${marvel.thumbnail.extension}">
            </td>
            <td>${marvel.name}</td>
            <td>${marvel.description}</td>

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
  fetch(api_marvel_comics)
    .then((response) => response.json())
    .then((result) => {
      console.log(result);
      alumnos.innerHTML = "";
      for (const marvel of result.data.results) {
        let div = `
        <div class="present col-md-3 card" >
        <span></span>
           <img class="img_marvel" src="${marvel.thumbnail.path}.${marvel.thumbnail.extension}">
            <small>codigo</small>
            <small>${marvel.id}</small>
            <small>Nombre Completo</small>
            <small>${marvel.title}</small>
            <small>Nota</small>

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

/*
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
*/
cargar_lista();
cargar_lista_card();
