console.log('OK');


let conexionBBDD = {
    url: 'http://www.mocky.io/v2/5adf64f63300005200e4d985',
    method: 'POST'
}


$.ajax(conexionBBDD).done( function (respuestaServidor) {
    console.log('respuestaServidor', respuestaServidor);
    let resultados = '';
    
    for(i=0;   i < respuestaServidor.resultados.length;   i++) {
        resultados += `
        <li class="collection-item avatar">
            <img src="${respuestaServidor.resultados[i].imagen}" alt="${respuestaServidor.resultados[i].nombre}, ${respuestaServidor.resultados[i].actividad}" class="circle">
            <span class="title">${respuestaServidor.resultados[i].nombre}</span>
            <p>${respuestaServidor.resultados[i].actividad}</p>
            <a href="./login.html" class="secondary-content">
                <h5>${respuestaServidor.resultados[i].distancia}Km</h5>
                <i class="${respuestaServidor.resultados[i].distancia > 0 ? 'material-icons no_active' : 'material-icons'}">grade</i>
                <i class="${respuestaServidor.resultados[i].distancia > 1 ? 'material-icons no_active' : 'material-icons'}">grade</i>
                <i class="${respuestaServidor.resultados[i].distancia > 2 ? 'material-icons no_active' : 'material-icons'}">grade</i>
                <i class="${respuestaServidor.resultados[i].distancia > 3 ? 'material-icons no_active' : 'material-icons'}">grade</i>
                <i class="${respuestaServidor.resultados[i].distancia > 4 ? 'material-icons no_active' : 'material-icons'}">grade</i>
            </a>
        </li>`;
    }
    console.log(resultados);
    $('#listaResultados').html(resultados);
    
    let resumenResultado = `Se ${respuestaServidor.length == 1 ? 'ha' : 'han'} encontrado 
    ${respuestaServidor.length} ${respuestaServidor.length == 1 ? 'resultado' : 'resultados'} de
    <br><span>"${respuestaServidor.busqueda}"</span>`;
    
    $('#resumenResultado').html(resumenResultado);
}).fail( function (error) {
    console.log('error', error);
});