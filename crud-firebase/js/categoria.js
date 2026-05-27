const ref = db.ref("categoria");

let idcapturado = null; //variável global para armazenar o ID do cliente que está sendo editado
$("#cancelar").hide(); //esconde o botão de cancelar inicialmente

$("#salvar").click(function (){
    let nome = $("#nome").val().toUpperCase();
    let informacao = $("#informacao").val().toUpperCase();

    if(nome === "" || informacao === ""){
        alert('Preencha todos os campos');
        return;
     }

     if(idcapturado){//editar
        ref.child(idcapturado).update({nome, informacao});
        idcapturado = null;
        $("#salvar").text("Salvar");
        $("#cancelar").hide();
        $("#salvar").removeClass("btn-success").addClass("btn-primary");
        $("#status").text("Registro atualizado!");
     }
     else{//salvar
      ref.push({ nome, informacao });
     }

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
                <button class="btn btn-info btn-sm" onclick="editar('${id}','${reg.nome}','${reg.informacao}')">
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

function editar(id, nome, informacao){
    $("#nome").val(nome);
    $("#informacao").val(informacao);
    idcapturado = id;

    $("#cancelar").show(); //mostra o botão de cancelar quando estiver editando

    $("#salvar")
    .text("Atualizar")
    .removeClass("btn-primary")
    .addClass("btn-success");

    $("#status").text("Editando registro...");
}