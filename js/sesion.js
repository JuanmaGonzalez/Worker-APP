(function(){
    sessionStorage.setItem('ultimaPaginaVisitada', window.location.href);
    let token = sessionStorage.getItem('token');
    if(token) {
        document.querySelector('ul.right.user_header > li > a img').src = './imgs/Rosa-clienta.png';
    } else {
        window.location.href = './login.html'
    }
})();