function pronto() {
    function ratchetPronto(){
        document.getElementById("info1").innerText = device.cordova;
        document.getElementById("info2").innerText = device.model;
        document.getElementById("info3").innerHTML = device.platform;
        document.getElementById("info4").innerHTML = device.uuid;
        document.getElementById("info5").innerHTML = device.version;
        document.getElementById("info6").innerHTML = device.manufacturer;
        document.getElementById("info7").innerHTML = device.isVirtual;
        document.getElementById("info8").innerHTML = device.serial;
        if (navigator.connection.type == Connection.UNKNOWN ){document.getElementById("info9").innerHTML ="Conexão desconhecida" }
        else if (navigator.connection.type == Connection.ETHERNET ){document.getElementById("info9").innerHTML ="Conexão Ethernet" }
        else if (navigator.connection.type == Connection.WIFI ){document.getElementById("info9").innerHTML ="Conexão Wi-fi" }
        else if (navigator.connection.type == Connection.CELL_2G ){document.getElementById("info9").innerHTML ="Conexão 2G" }
        else if (navigator.connection.type == Connection.CELL_3G ){document.getElementById("info9").innerHTML ="Conexão 3G" }
        else if (navigator.connection.type == Connection.CELL_4G ){document.getElementById("info9").innerHTML ="Conexão 4G" }
        else if (navigator.connection.type == Connection.CELL ){document.getElementById("info9").innerHTML ="Conexão cel genérica" }
        else if(navigator.connection.type == Connection.NONE ){document.getElementById("info9").innerHTML ="Sem conexão!" }
        function acelerometroInfo(acceleration){
            document.getElementById("acelX").innerHTML = acceleration.x;
            document.getElementById("acelY").innerHTML = acceleration.y;
            document.getElementById("acelZ").innerHTML = acceleration.z;
        }
        var acelerometro = navigator.accelerometer.watchAcceleration(acelerometroInfo, alert("Erro no acelerômetro!"), { frequency: 700 });
        alert("tela 2!!!!");
        navigator.vibrate(200);
    }
    window.addEventListener('push', ratchetPronto);
}

document.addEventListener("deviceready", pronto, false);