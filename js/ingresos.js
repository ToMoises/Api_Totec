console.log("ingreso al js");
const key_publica = "71b9c455b2db1a44f45b6f0be9c16729";
const key_privada = "f316b0a4baf66cd8eb06cf0f9b4c34e390882211";
const api_marvel =
  "https://gateway.marvel.com:443/v1/public/characters?ts=1&apikey=71b9c455b2db1a44f45b6f0be9c16729&hash=b37207cc6fe7cf8d6ccfdbfd66e24727";
const api_marvel_comics =
  "https://gateway.marvel.com:443/v1/public/comics?ts=1&apikey=71b9c455b2db1a44f45b6f0be9c16729&hash=b37207cc6fe7cf8d6ccfdbfd66e24727";
const api_marvel_eventos =
  "https://gateway.marvel.com:443/v1/public/events?ts=1&apikey=71b9c455b2db1a44f45b6f0be9c16729&hash=b37207cc6fe7cf8d6ccfdbfd66e24727";

const api_marvel_comic_precio =
  "  https://gateway.marvel.com:443/v1/public/comics?ts=1&apikey=71b9c455b2db1a44f45b6f0be9c16729&hash=b37207cc6fe7cf8d6ccfdbfd66e24727";
const tbl_ingresos = document.getElementById("tbl_ingresos");
const alumnos = document.getElementById("alumnos");
const ctx = document.getElementById("myChart").getContext("2d");

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
        <div class="present col-md-5 card  text-center" >
        
           <img src="${marvel.thumbnail.path}.${marvel.thumbnail.extension}">
            <small class="font-weight-bold">codigo</small>
            <small>${marvel.id}</small>
            <small class="font-weight-bold">Titulo</small>
            <small>${marvel.title}</small>
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

cargar_chart = () => {
  fetch(api_marvel_comic_precio)
    .then((response) => response.json())
    .then((result) => {
      console.log(result.data.results);
      const precio = result.data.results.map((item) => item.prices[0].price);
      const name = result.data.results.map((item) => item.title);

      const myChart = new Chart(ctx, {
        type: "bar",
        data: {
          labels: name,
          datasets: [
            {
              label: "# PRECIOS",
              data: precio,
              backgroundColor: [
                "rgba(255, 99, 132, 0.2)",
                "rgba(54, 162, 235, 0.2)",
                "rgba(255, 206, 86, 0.2)",
                "rgba(75, 192, 192, 0.2)",
                "rgba(153, 102, 255, 0.2)",
                "rgba(255, 159, 64, 0.2)",
              ],
              borderColor: [
                "rgba(255, 99, 132, 1)",
                "rgba(54, 162, 235, 1)",
                "rgba(255, 206, 86, 1)",
                "rgba(75, 192, 192, 1)",
                "rgba(153, 102, 255, 1)",
                "rgba(255, 159, 64, 1)",
              ],
              borderWidth: 2,
            },
          ],
        },
        options: {
          responsive: true,
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    });
};

cargar_lista();
cargar_lista_card();
cargar_chart();
