(function(){
    let token = sessionStorage.getItem('token');
    if(token) {
        document.querySelector('ul.right.user_header > li > a img').src = './imgs/Rosa-clienta.png';
    }
})();