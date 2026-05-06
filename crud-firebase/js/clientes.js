const ref = db.ref("clientes");

$("#salvar").click(function (){
    let nome = $("#nome").val().toUpperCase();
    let email = $("#email").val().toLowerCase();

    if(nome === "" || email === ""){
        alert('Preencha todos os campos');
        return;
     }

    ref.push({ nome, email });

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
    $("#email").val("");
    $("#nome").focus();
}