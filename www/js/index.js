function pronto() {
    document.getElementById("proximaP").addEventListener("click", proximaPag, false);




    function proximaPag() {
        navigator.vibrate(200);
        location.href = 'pag2.html';
    }

}

document.addEventListener("deviceready", pronto, false);