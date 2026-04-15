const ref = db.ref("categoria");

$("#salvar").click(function (){
    let nome = $("#nome").val();
    let informacao = $("#informacao").val();

    if(nome === "" || informacao === ""){
        alert('Preencha todos os campos');
        return;
     }

    ref.push({ nome, informacao });

     limpar();

});

function limpar(){
    $("#nome").val("");
    $("#informacao").val("");
    $("#nome").focus();
}