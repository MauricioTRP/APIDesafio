window.onload = function() {

  $(document).ready(function() {
  let frmBuscar = $("#frmBuscar");

  frmBuscar.on("submit", function(event){
    event.preventDefault();

    let inputUsuario = $("#search")[0].value

    // Digitos
    let digitExp = /\d/gm;

    if(digitExp.test(inputUsuario)) {
      // caso en que el usuario ingresa
      // digitos
      // Hacemos llamado ajax
      $.ajax({
        type: "GET",
        url:`https://superheroapi.com/api.php/4905856019427443/${inputUsuario}`,
        dataType: "json",
        success: function(data) {
          if (data.response == "error") {
            alert("No se pudo encontrar el heroe")
            frmBuscar[0].reset()
          }

          $("#cartaHeroe").html(cartaHeroe(data))
  
          dataPoints = []
          let paresOrdenados = Object.entries(data.powerstats);
          paresOrdenados.forEach( ([habilidad, valor]) => {
            dataPoints.push({
              y: Number(valor),
              label: habilidad
            })
          } )

          var chart = new CanvasJS.Chart("chartContainer", {
            animationEnabled: true,
            title: {
              text: "Desktop Search Engine Market Share - 2016"
            },
            data: [{
              type: "pie",
              startAngle: 240,
              yValueFormatString: "##0.00\"%\"",
              indexLabel: "{label} {y}",
              dataPoints: dataPoints
            }]
          });

          chart.render();

        },
        error: function(error){
          alert("Error al obtener datos");
        }
      })
    } else {
      // usuario no ingresa dígito
      alert("Por favor ingresa un número válido para buscar");
    }
  })
})
}
  

function cartaHeroe(data) {
  // Toma la data del heroe, y retorna una carta bootstrap
  return `<div class="card" style="width: 18rem;">
  <img src="${data.image.url}" class="card-img-top" alt="...">
  <div class="card-body">
    <h5 class="card-title">${data.name}</h5>
    <p class="card-text">${data.connections["group-affiliation"]}</p>
  </div>
</div>`
}

