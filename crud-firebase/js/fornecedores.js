const ref = db.ref("fornecedores");

$("#salvar").click(function (){
    let nome = $("#nome").val();
    let cnpj = $("#cnpj").val();
    let email = $("#email").val();
    let estados = $("#estados").val();

    if(nome === "" || cnpj === "" || email === "" || estados === "" ){
        alert('Preencha todos os campos');
        return;
     }

    ref.push({ nome, cnpj , email , estados });

     limpar();

});

function limpar(){
    $("#nome").val("");
    $("#cnpj").val("");
    $("#email").val("");
    $("input[name = 'estados']").prop("checked", false);
    $("#nome").focus();
}