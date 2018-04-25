let listaManitas = ['Profesor', 'Lampista', 'Paleta', 'Electricista', 'Mecánico', 'Instalador Aire Acondicionado', 'Entrenador Personal', 'Chofer' ];

let sugerencias_div = document.getElementById('sugerencias');

document.getElementById('icon_prefix2').addEventListener('keyup', function (event) {

    let resultadoBusqueda = [];
    let plantillaLIs = '';

    if (this.value) {

        for (let index = 0; index < listaManitas.length; index++) {
            if (listaManitas[index].toLowerCase().indexOf(this.value.toLowerCase()) >= 0) {
                resultadoBusqueda.push(listaManitas[index]);

            } else { }
        }

        plantillaLIs = '<ul>';

        for (let index = 0; index < resultadoBusqueda.length; index++) {
            plantillaLIs += `<li class="teSuguiero">${resultadoBusqueda[index]}</li>`;
        }
        plantillaLIs += '</ul>';
    } else { }
    sugerencias_div.innerHTML = plantillaLIs;
    aceptarSugerencia();
});

   document.getElementById('search_button').onclick = function(){
       if ($('#icon_prefix2').val() == "") {
        $('#sugerencias').html('<p class="error">El campo de búsqueda no puede estar vacío</p>');
       } else {
        location.href='./search_result.html';
       }
   }