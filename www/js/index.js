function pronto(){
    window.addEventListener('push', ratchetPronto);

    function ratchetPronto(){
        if(window.location.href == 'file:///android_asset/www/index.html'){
            navigator.vibrate(200);
            navigator.globalization.getPreferredLanguage(
                function(lingua){
                    if(lingua.value=="pt-BR" || lingua.value=="pt" || lingua.value=="BR" ){
                        document.getElementById("ola").innerHTML = "Olá Mundo!!";
                    }
                    else {document.getElementById("ola").innerHTML = "Hello World!!";}
                },
                function() {document.getElementById("ola").innerHTML = "Hello World!!";}
            );
            if (localStorage.getItem('facebook_nome') && localStorage.getItem('facebook_id')){
                facebookConnectPlugin.getLoginStatus(function (dados){
                    if (dados.status == "connected"){
                        alert("Facebook conectado!!");
                        facebookConnectPlugin.api('me', ['public_profile'], function (dadosApi){
                            document.getElementById("nomePerfil").innerHTML = "Bem vindo, " + dadosApi.name + "!";
                            document.getElementById("imagemPerfil").src = "https://graph.facebook.com/" + dadosApi.id + "/picture/?type=large";
                        })
                    }
                }, function (){});
            }
            function entrarNoFace(){
                navigator.vibrate(200);
                facebookConnectPlugin.login(['public_profile'], function(sucesso){
                    facebookConnectPlugin.api('me', ['public_profile'], function(dados){
                        localStorage.setItem('facebook_nome', dados.name);
                        localStorage.setItem('facebook_id', dados.id);
                        document.getElementById("nomePerfil").innerHTML = "Bem vindo, " + dados.name + "!";
                        document.getElementById("imagemPerfil").src = "https://graph.facebook.com/"+dados.id+"/picture/?type=large";
                    })
                }, function(erro) { alert('Não foi possível concluir o login no Facebook! Erro: ' + JSON.stringify(erro.errorMessage)); });
            }
            document.getElementById("entrarComFace").addEventListener("click", entrarNoFace, false);
        }

        if(window.location.href == 'file:///android_asset/www/pag2.html'){
            document.getElementById("info1").innerHTML = device.cordova;
            document.getElementById("info2").innerHTML = device.model;
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
            var acelerometro = navigator.accelerometer.watchAcceleration(acelerometroInfo, erroAcel , { frequency: 200 });
            navigator.vibrate(200);
            function erroAcel(){}
        }
    }
}

document.addEventListener("deviceready", pronto, false);