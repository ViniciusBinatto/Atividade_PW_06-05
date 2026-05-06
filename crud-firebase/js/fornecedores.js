const ref = db.ref("fornecedores");

$("#salvar").click(function (){
    let nome = $("#nome").val().toUpperCase();
    let cnpj = $("#cnpj").val();
    let email = $("#email").val().toLowerCase();
    let estados = $("input[name='estados']:checked").val();

    if(nome === "" || cnpj === "" || email === "" || estados === "" ){
        alert('Preencha todos os campos');
        return;
     }

    ref.push({ nome, cnpj , email , estados });

     limpar();

});

ref.on("value", dados_tabela => {
    $("#lista").empty(); // para nao ter dados duplicados na tabela, a cada atualização, a tabela é limpa e preenchida novamente com os dados atuais do Firebase

$("#lista").append(`
    <tr>
        <th>ID</th>
        <th>Nome</th>
        <th>Email</th>
        <th>CNPJ</th>
        <th>Estado</th>
        <th colspan="2">Opções</th>
    </tr>
    `);

     dados_tabela.forEach(registro => {
        let reg = registro.val();
        let id =  registro.key;
//append é um método que adiciona conteúdo ao final de um elemento selecionado. `` para colocar html direto.
//reg é o registro, nome da variável. reg nome, guarda o nome etc
        $("#lista").append(`
        <tr>
            <td>${id}</td>
            <td>${reg.nome}</td>
            <td>${reg.email}</td>
            <td>${reg.cnpj}</td>
            <td>${reg.estados}</td>
            <td>
                <button class="btn btn-danger btn-sm">
                    <i class="bi bi-trash"></i>
                </button>
            </td>
              <td>
                <button class="btn btn-success btn-sm">
                    <i class="bi bi-pencil"></i>
                </button>
            </td>
         </tr>
            `);
     })
});


function limpar(){
    $("#nome").val("");
    $("#cnpj").val("");
    $("#email").val("");
    $("input[name = 'estados']").prop("checked", false);
    $("#nome").focus();
}