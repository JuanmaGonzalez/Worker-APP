var count = 2;
setInterval(function(){
    count--;
    document.getElementById('timecount');
    if (count == 0) {
        window.location = sessionStorage.getItem('ultimaPaginaVisitada'); 
    }
},1000);