function pronto() {
    document.getElementById("vibra").addEventListener("click", vibrar, false);


    function vibrar(){
        navigator.vibrate(200);
    }
}

document.addEventListener("deviceready", pronto, false);