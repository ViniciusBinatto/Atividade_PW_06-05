const ref = db.ref("funcionarios");


let idcapturado = null; //variável global para armazenar o ID do funcionário que está sendo editado
$("#cancelar").hide(); //esconde o botão de cancelar inicialmente

$("#salvar").click(function (){
    let nome = $("#nome").val().toUpperCase();
    let email = $("#email").val().toLowerCase();
    let cargo = $("#cargo").val().toUpperCase();

    if(nome === "" || email === "" || cargo === ""){
        alert('Preencha todos os campos');//verifica se tem od dados no formulario
        return;
     }

     if(idcapturado){//editar
        ref.child(idcapturado).update({nome, email, cargo});//atualiza o funcionário com o ID capturado
        idcapturado = null;//limpa a variável para não interferir em futuras operações de edição
        $("#salvar").text("Salvar");//volta o texto do botão para "Salvar"

        $("#cancelar").hide();
         $("#salvar").removeClass("btn-success").addClass("btn-primary");
         $("#status").text("Registro atualizado!");
     }
     else{//salvar
      ref.push({ nome, email, cargo });//salva tudo 
     }

     limpar();

});
// Lendo os dados do Firebase e atualizando a tabela  em tempo real  
// forEach é um bloco do  bd que percorre cada um dos dados da tabela e exibe na tela
//cada loop guarda um dado em registro
//let é uma variável local, ou seja, só existe dentro do bloco onde foi criada, nesse caso, dentro do forEach
ref.on("value", dados_tabela => {
    $("#lista").empty(); // para nao ter dados duplicados na tabela, a cada atualização, a tabela é limpa e preenchida novamente com os dados atuais do Firebase

$("#lista").append(`
    <tr>
        <th>ID</th>
        <th>Nome</th>
        <th>Email</th>
        <th>cargo</th>
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
            <td>${reg.cargo}</td>
            <td>
                <button class="btn btn-danger btn-sm">
                    <i class="bi bi-trash"></i>
                </button>
            </td>
              <td>
                <button class="btn btn-info btn-sm" onclick="editar('${id}','${reg.nome}','${reg.email}','${reg.cargo}')">
                    <i class="bi bi-pencil"></i>
                </button>
            </td>
         </tr>
            `);
     })
});

function limpar(){
    $("#nome").val("");
    $("#email").val("");
    $("#cargo").val("");
    $("#nome").focus();
}

function editar(id, nome, email, cargo){ //vem do botão de editar, recebe o id, nome, email e cargo do funcionário que foi clicado para edição
    $("#nome").val(nome);
    $("#email").val(email);
    $("#cargo").val(cargo);

    idcapturado = id;

    $("#cancelar").show(); //mostra o botão de cancelar quando estiver editando

    $("#salvar")
    .text("Atualizar")
    .removeClass("btn-primary")
    .addClass("btn-success");

    $("#status").text("Editando registro...");
}