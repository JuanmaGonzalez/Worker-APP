// muestra un mensaje en la interfaz
function mostrar(mensaje) {
    let listItem = '';
    switch(mensaje.autor) {
        case 'self':
        case 'other':
            listItem = `
            <li class="${(mensaje.autor === 'self') ? 'self' : 'other'}">
                <div class="msg">
                    <div class="user">${(mensaje.autor === 'self') ? '<span class="range admin">Admin</span>' : mensaje.nombre}</div>
                    ${mensaje.imagen ? `<img src="${mensaje.imagen}" draggable="false" />` : ''}
                    <p>${mensaje.mensaje ? mensaje.mensaje : ''}</p>
                    <time>${mensaje.hora}</time>
                </div>
            </li>`;
            break;
        
        case 'notification':
            listItem = `<p class="notification">${mensaje.mensaje}<time>${mensaje.hora}</time></p>` // XXX <li>...</li>
            break;
        
        default:
            console.log(`ERROR (chat) tipo de autor desconocido='${mensaje.autor}'`);
    }
    $('#chat').append(listItem);
}


// persistencia de las conversaciones
function almacenar(mensaje) {
    let chat = localStorage.getItem('chat');
    chat = chat ? JSON.parse(chat) : [];
    chat.push(mensaje);
    localStorage.setItem('chat', JSON.stringify(chat));
}



// source: https://www.html5rocks.com/en/tutorials/file/dndfiles/
// source: https://www.nczonline.net/blog/2012/05/08/working-with-files-in-javascript-part-1/
function getAdjunto(event) {
    let URLs = null;
    if (!(window.File && window.FileReader && window.FileList && window.Blob)) {
        alert('Tu dispositivo no tiene completo soporte para trabajar con ficheros.');
    } else {
        let archivos = evt.target.files; // objeto: FileList
        for (let i = 0, j = 0;   i < archivos.length;   i++) {
            if ( archivos[i].type.match('image.*') ) {
                // TODO procesar archivos, URLs, etc.
                ++j;
            }
        }
        // TODO subir archivos, ...
    }
    return URLs;
}



// evento lanzado por el usuario al hacer click
function enviar(socket, event) {
    let adjunto = getAdjunto(event);
    let texto   = document.getElementById('texto').value;
    if (texto || adjunto) {
        document.getElementById('texto').value = '';
        let ahora   = new Date();
        let objetoMensaje = {
            autor:   "self",
            nombre:  getSessionNombre(),
            mensaje: texto,
            imagen:  adjunto,
            hora:    `${ahora.getHours()}:${ahora.getMinutes()}:${ahora.getSeconds()}`
        };
        almacenar(objetoMensaje);
        mostrar(objetoMensaje);
        socket.send( JSON.stringify(objetoMensaje) );
    }
}



// evento lanzado por WebSocket cuando recibe un mensaje de su interlocutor
function recibir(event) {
    let mensaje = JSON.parse(event.data);
    mensaje.autor = mensaje.autor === "self" ? "other" : mensaje.autor;
    almacenar(mensaje);
    mostrar( mensaje );
}



// función anónima autoinvocada para iniciar el chat (si es posible)
(function(){
    if (typeof(WebSocket) === undefined) {
        alert('Su dispositivo no soporta la tecnología WebSocket necesaria para hacer funcionar el chat.');
    } else {
        // establecer WebSocket
        // XXX http://websocketstest.com
        const URL = 'ws://echo.websocket.org/'; // devuelve como respuesta el mensaje que reciba
        let chatSocket = new WebSocket(URL); // PROTOCOLO: atributo opcional
        
        // captura de eventos
        chatSocket.onmessage = function(event) { recibir(event) };
        chatSocket.onerror   = function(event) { alert('La comunicación con el servidor falló.') };
        $('#btn_enviar').click( function(event){
            event.preventDefault();
            enviar(chatSocket);
        });
        document.getElementById('icono_btn_adjunto').onclick = function() { // icono visible
            let btnAdjunto = document.getElementById("btn_adjunto");        // botón oculto
            btnAdjunto.click();
            btnAdjunto.addEventListener('change', function (event) { // ¿hay nuevos archivos?
                enviar(chatSocket, event);
            }, false);
        };

        // carga / inicializacion conversaciones chat
        let chat = localStorage.getItem('chat');
        if (chat) {
            chat = JSON.parse(chat);
            for (let i = 0;   i < chat.length;   i++) {
                mostrar( chat[i] );
            }
        } else { // XXX BORRABLE: carga una conversación a modo de demo / exhibición
            $.ajax('http://www.mocky.io/v2/5ae039093200005e00510a5d').done(function(respuestaServidor){
                for (let i = 0;   i < respuestaServidor.length;   i++) {
                    mostrar   ( respuestaServidor[i] );
                    almacenar ( respuestaServidor[i] );
                }
            });
        }
    }
})();