function pronto() {
    document.getElementById("proximaP").addEventListener("click", proximaPag, false);
    document.getElementById("entrarComFace").addEventListener("click", entrarComFace, false);

    entrarComFace(){
        facebookConnectPlugin.login(['public_profile'], function(sucesso){
            var facebook_id = sucesso.authResponse.userID;
            localStorage.setItem('facebook_id', facebook_id);

            facebookConnectPlugin.api('me', ['public_profile'], function(dados){
                localStorage.setItem('nome', dados.name);
                document.getElementById("nomePerfil").innerHTML = dados.name;
                document.getElementById("imagemPerfil").src = "https://graph.facebook.com/"+dados.id+"/picture/?type=large";
            })
        }, function(erro) { alert('Erro: '+ erro); });
    }

    function proximaPag() {
        navigator.vibrate(200);
        location.href = 'pag2.html';
    }
}

document.addEventListener("deviceready", pronto, false);