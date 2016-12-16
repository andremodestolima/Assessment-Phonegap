function pronto() {
    document.getElementById("proximaP").addEventListener("click", proximaPag, false);

    facebookConnectPlugin.login(['public_profile','email'], function(sucesso){
        var facebook_id = sucesso.authResponse.userID;
        localStorage.setItem('facebook_id', facebook_id);

        facebookConnectPlugin.api('me', ['public_profile'], function(dados){
            localStorage.setItem('nome', dados.name);
            alert(JSON.stringify(dados));
            document.getElementById("nomePerfil").innerHtml = dados.name;
        //    document.getElementById("imagemPerfil").src = dados.cover;
            // alert(dados.cover);
        })
    }, function(erro) { alert('Erro: '+ erro); });

    function proximaPag() {
        navigator.vibrate(200);
        location.href = 'pag2.html';
    }

}

document.addEventListener("deviceready", pronto, false);