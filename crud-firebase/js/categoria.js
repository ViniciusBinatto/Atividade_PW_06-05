const ref = db.ref("categoria");

$("#salvar").click(function (){
    let nome = $("#nome").val().toUpperCase();
    let informacao = $("#informacao").val().toUpperCase();

    if(nome === "" || informacao === ""){
        alert('Preencha todos os campos');
        return;
     }

    ref.push({ nome, informacao });

     limpar();

});

ref.on("value", dados_tabela => {
    $("#lista").empty(); // para nao ter dados duplicados na tabela, a cada atualização, a tabela é limpa e preenchida novamente com os dados atuais do Firebase

$("#lista").append(`
    <tr>
        <th>ID</th>
        <th>Nome</th>
        <th>Informação</th>
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
            <td>${reg.informacao}</td>
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
    $("#informacao").val("");
    $("#nome").focus();
}