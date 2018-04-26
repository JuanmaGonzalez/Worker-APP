function conmutarLogInOut(token) {
    let log;
    if (token) {
        log = document.getElementsByClassName('conmutadorLog');
        for(i=0;   i < log.length;   i++) {
            log[i].href      = './index.html';
            log[i].innerText = 'Logout';
            log[i].addEventListener('click', function(){
                sessionStorage.removeItem('token');
                sessionStorage.removeItem('nombreUsuario');
            });
        }
    } else {
        log = document.getElementsByClassName('conmutadorLog');
        for (let i=0;   i < log.length;   i++) {
            log[i].href      = './login.html';
            log[i].innerText = 'Login';
        }
    }
}



function cambiarAvatar() {
    let token = sessionStorage.getItem('token');
    let avatar = document.querySelector('ul.right.user_header > li > a > img');
    if (token) {
        avatar.src = './imgs/Rosa-clienta.png';
    } else {
        avatar.src = './imgs/no_user.png';
    }
}



function paginaActual() {
    let url = (location.href) . split('/');
    return url [ url.length - 1] ;
}



(function(){
    sessionStorage.setItem('ultimaPaginaVisitada', window.location.href);
    let token = sessionStorage.getItem('token');

    conmutarLogInOut(token);
    
    if (token) {
        cambiarAvatar();
    } else {
        // prohibir el acceso a las areas privadas
        switch ( paginaActual() ) {
            case 'ficha.html':
            case 'ticket.html':
            case 'chat.html':
                window.location.href = './login.html';
        }
    }
})();