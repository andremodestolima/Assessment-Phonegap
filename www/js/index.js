var perfilLogado = { "nome":"", "senha":"", "email": "", "foto":"" };
var admobid = {};

function pronto(){
    if( /(android)/i.test(navigator.userAgent) ) {
        admobid = { // for Android
            banner: 'ca-app-pub-6515233207832507/4849731271',
            interstitial: 'ca-app-pub-6515233207832507/6326464471'
        };
    } else if(/(ipod|iphone|ipad)/i.test(navigator.userAgent)) {
        admobid = { // for iOS
            banner: 'ca-app-pub-6515233207832507/4849731271',
            interstitial: 'ca-app-pub-6515233207832507/6326464471'
        };
    } else {
        admobid = { // for Windows Phone
            banner: 'ca-app-pub-6515233207832507/4849731271',
            interstitial: 'ca-app-pub-6515233207832507/6326464471'
        };
    }

    window.addEventListener('push', ratchetPronto);
    window.PUSH = PUSH;
    function verificarLogin(){
        if (localStorage.getItem('facebook_nome') && localStorage.getItem('facebook_id')){
            facebookConnectPlugin.getLoginStatus(function (dados){
                if (dados.status == "connected"){
                    facebookConnectPlugin.api('me', ['public_profile', 'email'], function (dadosApi){
                        perfilLogado.nome = dadosApi.name;
                        perfilLogado.foto = "https://graph.facebook.com/" + dadosApi.id + "/picture/?type=large";
                        perfilLogado.senha = "---";
                        perfilLogado.email = dadosApi.email;
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
                perfilLogado.nome = dados.name;
                perfilLogado.foto = "https://graph.facebook.com/" + dados.id + "/picture/?type=large";
                perfilLogado.senha = "---";
                perfilLogado.email = dados.email;
                window.PUSH({url: 'Home.html', transition: 'slide-in'});
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

    function entrarLogin(){
        alert("Função não disponível na atual versão.");
    }

    function sucessoFoto(imageData){
        window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function (fs){
            fs.root.getFile("fotoPerfil.img", { create: true, exclusive: false }, function(fileEntry){
                fileEntry.createWriter(function (fileWriter) {
                    fileWriter.onwrite = function() {
                        lerArquivo(fileEntry);
                    };
                    fileWriter.onerror = function(erro) {
                        alert("Erro ao criar o arquivo: " + erro.toString());
                    };
                    fileWriter.write(imageData);
                    window.localStorage.setItem("fotoPerfil", JSON.stringify(fileEntry));
                });
            }, arquivoErro);
        }, fileErro);
    }

    function lerArquivo(fileEntry){
        fileEntry.file(function (file){
            var reader = new FileReader();
            reader.onload = function(){
                document.getElementById('imagemPerfil').src = "data:image/jpeg;base64,"+ this.result; };
            reader.readAsText(file);
        })
    }

    function fileErro(message){
        alert('Erro no file: ' + message);
    }

    function arquivoErro(message){
        alert('Erro no arquivo: ' + message);
    }

    function cameraErro(message) {
        alert('Erro na camera: ' + message);
    }

    function tirarFoto()
    {navigator.vibrate(200);
        navigator.camera.getPicture(sucessoFoto, cameraErro, {
            quality: 100,
            destinationType: Camera.DestinationType.DATA_URL, // NATIVE_URI, DATA_URL, FILE_URI
            sourceType: Camera.PictureSourceType.CAMERA,       //Camera.PictureSourceType.PHOTOLIBRARY
            encodingType: Camera.EncodingType.JPEG,           //JPG, PNG
            mediaType: Camera.MediaType.PICTURE,		  //VIDEO, ALLMEDIA
            allowEdit: false,
            correctOrientation: true,
        });}

    function escolherFoto()
    {navigator.vibrate(200);
        navigator.camera.getPicture(sucessoFoto, cameraErro, {
            quality: 100,
            destinationType: Camera.DestinationType.DATA_URL, // NATIVE_URI, DATA_URL, FILE_URI
            sourceType: Camera.PictureSourceType.PHOTOLIBRARY,       //Camera.PictureSourceType.PHOTOLIBRARY
            encodingType: Camera.EncodingType.JPEG,           //JPG, PNG
            mediaType: Camera.MediaType.PICTURE,		  //VIDEO, ALLMEDIA
            allowEdit: false,
            correctOrientation: true,
            // targetHeight: 100,
            // targetWidth: 100
        });}

    verificarLogin();
    document.getElementById("entrarComFace").addEventListener("click", entrarNoFace, false);
    document.getElementById("logar").addEventListener("click", entrarLogin, false);
    document.getElementById("botaoSair").addEventListener("click", fecharPrograma, false);

    function ratchetPronto(){
        if(document.location.href.substring( document.location.href.lastIndexOf( '/' ) ) == '/Home.html'){
            if (AdMob){
                AdMob.createBanner({
                    adId : admobid.banner,
                    position : AdMob.AD_POSITION.TOP_CENTER,
                    autoShow : true
                });
            }
            navigator.vibrate(200);
            verificarLingua();
            document.getElementById("BemVindo").innerHTML = "Bem-vindo ao ASSESSMENT de Phonegap, " + perfilLogado.nome + "!";
            document.getElementById("botaoSair").addEventListener("click", fecharPrograma, false);
        }

        if(document.location.href.substring( document.location.href.lastIndexOf( '/' ) ) == '/pag2.html'){
            if (AdMob){
                AdMob.createBanner({
                    adId : admobid.banner,
                    position : AdMob.AD_POSITION.TOP_CENTER,
                    autoShow : true
                });
            }
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
            if (AdMob){
                AdMob.createBanner({
                    adId : admobid.banner,
                    position : AdMob.AD_POSITION.TOP_CENTER,
                    autoShow : true
                });
            }
            navigator.vibrate(200);
            document.getElementById("imagemPerfil").src = perfilLogado.foto;
            document.getElementById("nome").innerHTML = perfilLogado.nome;
            document.getElementById("senha").innerHTML = perfilLogado.senha;
            document.getElementById("email").innerHTML = perfilLogado.email;
            document.getElementById("trocarFoto").addEventListener("click", tirarFoto, false);
            document.getElementById("botaoSair").addEventListener("click", fecharPrograma, false);

            function bannerFull(){
                if(AdMob) AdMob.prepareInterstitial( {adId:admobid.interstitial, autoShow:true} );
            }

            document.getElementById("salvarProfile").addEventListener("click", bannerFull, false);
        }
    }
}

document.addEventListener("deviceready", pronto, false);