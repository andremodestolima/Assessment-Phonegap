function pronto() {
    document.getElementById("anteriorP").addEventListener("click", anteriorPag, false);




    function anteriorPag() {
        navigator.vibrate(200);
        location.href = 'index.html';
    }

}

document.addEventListener("deviceready", pronto, false);