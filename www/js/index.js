var perfilLogado = { "nome":"", "senha":"", "email": "", "foto":"" };

function pronto(){
    window.addEventListener('push', ratchetPronto);
    window.PUSH = PUSH;
    window.RATCHET.push = PUSH;
    function verificarLogin(){
        if (localStorage.getItem('facebook_nome') && localStorage.getItem('facebook_id')){
            facebookConnectPlugin.getLoginStatus(function (dados){
                if (dados.status == "connected"){
                    facebookConnectPlugin.api('me', ['public_profile', 'email'], function (dadosApi){
                        perfilLogado.nome = dadosApi.name;
                        perfilLogado.foto = "https://graph.facebook.com/" + dadosApi.id + "/picture/?type=large";
                        perfilLogado.senha = "---";
                        perfilLogado.email = "dadosApi.email";
                        window.PUSH({url: 'Home.html', transition: 'slide-in'});
                    })
                }
            }, function(){});
        }
    }
    function entrarNoFace(){
        navigator.vibrate(200);
        facebookConnectPlugin.login(['public_profile'], function(sucesso){
            facebookConnectPlugin.api('me', ['public_profile', 'email'], function(dados){
                localStorage.setItem('facebook_nome', dados.name);
                localStorage.setItem('facebook_id', dados.id);
                perfilLogado.nome = dadosApi.name;
                perfilLogado.foto = "https://graph.facebook.com/" + dadosApi.id + "/picture/?type=large";
                perfilLogado.senha = "---";
                perfilLogado.email = "dadosApi.email";
                PUSH({url: 'Home.html', transition: 'slide-in'});
            })
        }, function(erro) { alert('Não foi possível concluir o login no Facebook! Erro: ' + JSON.stringify(erro.errorMessage)); });
    }
    function verificarLingua(){
        navigator.globalization.getPreferredLanguage(
            function (lingua) {
                if (lingua.value == "pt-BR" || lingua.value == "pt" || lingua.value == "BR") {
                    document.getElementById("ola").innerHTML = "Olá Mundo!!";
                }
                else {
                    document.getElementById("ola").innerHTML = "Hello World!!";
                }
            },
            function () {
                document.getElementById("ola").innerHTML = "Hello World!!";
            }
        );
    }
    function fecharPrograma(){
        facebookConnectPlugin.logout(function(){}, function(){});
        navigator.app.exitApp();
    }
    verificarLogin();
    document.getElementById("entrarComFace").addEventListener("click", entrarNoFace, false);
    document.getElementById("botaoSair").addEventListener("click", fecharPrograma, false);

    function ratchetPronto(){
        if(document.location.href.substring( document.location.href.lastIndexOf( '/' ) ) == '/Home.html'){
            navigator.vibrate(200);
            verificarLingua();
            document.getElementById("BemVindo").innerHTML = "Bem-vindo ao ASSESSMENT de Phonegap, " + perfilLogado.nome + "!";
            document.getElementById("botaoSair").addEventListener("click", fecharPrograma, false);
        }

        if(document.location.href.substring( document.location.href.lastIndexOf( '/' ) ) == '/pag2.html'){
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
            document.getElementById("botaoSair").addEventListener("click", fecharPrograma, false);
        }

        if(document.location.href.substring( document.location.href.lastIndexOf( '/' ) ) == '/pag3.html'){
            navigator.vibrate(200);
            document.getElementById("imagemPerfil").src = perfilLogado.foto;
            document.getElementById("nome").innerHTML = perfilLogado.nome;
            document.getElementById("senha").innerHTML = perfilLogado.senha;
            document.getElementById("email").innerHTML = perfilLogado.email;

            // id="trocarFoto"
            // id="salvarProfile"

            document.getElementById("botaoSair").addEventListener("click", fecharPrograma, false);
        }
    }
}

document.addEventListener("deviceready", pronto, false);