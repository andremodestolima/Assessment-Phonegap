function pronto() {
    document.getElementById("entrarComFace").addEventListener("click", entrarNoFace, false);
    document.getElementById("vibra").addEventListener("click", vibrar, false);

    navigator.globalization.getPreferredLanguage(
        function(lingua){
            if(lingua.value=="pt-BR" || lingua.value=="pt" || lingua.value=="BR" ){
                document.getElementById("ola").innerHTML = "Olá Mundo!!";
            }
            else {document.getElementById("ola").innerHTML = "Hello World!!";}
            ;},
        function() {document.getElementById("ola").innerHTML = "Hello World!!";}
    );

    function entrarNoFace(){
        navigator.vibrate(200);
        facebookConnectPlugin.login(['public_profile'], function(sucesso){
            // var facebook_id = sucesso.authResponse.userID;
            facebookConnectPlugin.api('me', ['public_profile'], function(dados){
                localStorage.setItem('facebook_nome', dados.name);
                localStorage.setItem('facebook_id', dados.id);
                document.getElementById("nomePerfil").innerHTML = "Bem vindo, " + dados.name + "!";
                document.getElementById("imagemPerfil").src = "https://graph.facebook.com/"+dados.id+"/picture/?type=large";
            })
        }, function(erro) { alert('Não foi possível concluir o login no Facebook! Erro: ' + JSON.stringify(erro.errorMessage)); });
    }

    function vibrar(){
        navigator.vibrate(200);
    }
}

document.addEventListener("deviceready", pronto, false);