class Usuario{
   constructor(nome, senha, email){
      this.nome = nome
      this.senha = senha
      this.email = email
      this.id = localStorage.getItem("id")
         if(localStorage.getItem("id") === null){
            localStorage.setItem('id',1)
            this.id = localStorage.getItem("id")
         }
   }
   incrementoId(){
      this.id++
      localStorage.setItem("id", this.id)
   }
   verificarDados(){//RETORNA UM ARRAY COM TODOS OS DADOS DE USUARIOS EXISTENTES
      let usuario_array =[]
      for(let i = 1; i < this.id;i++){
         //VERIFICA SE EXISTE OU NÃO ALGUMA CONTA CADASTRADA
         if(localStorage.getItem('usuario_'+i+'_') != null){ 
            let usuarioString = localStorage.getItem('usuario_'+i+'_')
            let usuario_Obj = JSON.parse(usuarioString)
            usuario_array.push(usuario_Obj)
         }
      }
      return usuario_array
   }
   verificaDadosCadastro(){
      let usuarios = this.verificarDados()
      
      let usuarioFiltradoNome = usuarios.filter(u => u.nome == this.nome) 
      let usuarioDadosFiltrado = usuarios.filter(u => u.email == this.email)
      if(usuarioFiltradoNome.length >= 1){
         alert('nome de usuario já cadastrado')
         return false
      }
      if(usuarioDadosFiltrado.length >= 1){
         alert("Dados invalidos")
         return false
      }
      return true
   }
   verificaDadosLogin(){
      let usuario = this.verificarDados()   
      let usuarioFiltrado = usuario.filter(u => u.email == this.email && u.senha == this.senha)
      return usuarioFiltrado
   }
   setUsuario(u){
      if(this.verificaDadosCadastro()){//SÓ IRÁ ADICIONAR CASO O USUARIO AINDA NÃO POSSUIR CADASTRO
         localStorage.setItem('usuario_'+this.id+'_',JSON.stringify(u))
         this.incrementoId()
         alert("CADASTRO REALIZADO COM SUCESSO!")
      }
   }
    login(){
      let usuario = this.verificaDadosLogin()// VAI DEVOLVER OS DADOS JÁ EM SÓ ARRAY
      
      if(usuario.length == 1){
         localStorage.setItem("id_usuario", usuario[0].id)
         location.replace("tarefas.html")
      }
      else{
         alert("email ou senha inválidas")
      }
   }
}
 // TESTE PARA VERIFICAR SE O EMAIL FOI DIGITADO CORRETAMENTE


function validateEmail(emails) {//FUNÇÃO PARA VERIFICAR SE O EMAIL É VÁLIDO
   let verifica = /\S+@\S+\.\S+/;
   return verifica.test(emails);
 }
function novoCadastro(){
   let nome = document.querySelector("#nomeCadastro").value
   let senha = document.querySelector("#senhaCadastro").value
   let email = document.querySelector("#emailCadastro").value
  
   if(nome != '' && senha != '' && validateEmail(email) == true){
      let usuarios = new Usuario(nome, senha, email)
      usuarios.setUsuario(usuarios)
   }
   console.log('aqui')
}

// let secaoLogin = document.querySelector("#secaoLogin")

function loginUsuario(){
     let email = document.querySelector("#emailLogin").value
     let senha = document.querySelector("#senhaLogin").value
     if(  senha != '' && validateEmail(email) == true){
      let usuarios = new Usuario( '', senha, email)
      usuarios.login()
     }else{
      alert("digite os campos corretamente")
     }
}

function mudaCampo(){ //vou mudar aqui
   let secaoLogin = document.querySelector("#secaoLogin")
   let secaoCadastro = document.querySelector("#secaoCadastro")
    secaoLogin.style.display == ""?secaoLogin.style.display = 'flex': secaoLogin.style.display = 'none'
   if( secaoLogin.style.display === "flex"){
      secaoCadastro.style.display = "block"
      secaoLogin.style.display = "none"
   }else{
      secaoCadastro.style.display = "none"
      secaoLogin.style.display = "flex"
   }
}
function verSenha(){
   let campoLogin = document.querySelector("#senhaLogin")
   let campoCadastro = document.querySelector("#senhaCadastro")
   let iconCadastro = document.querySelector("#iconCadastro")
   let iconLogin = document.querySelector("#iconLogin")
  
   if(iconLogin.className === 'fa-solid fa-eye'){
      iconLogin.setAttribute("class", "fa-solid fa-eye-slash")
      campoLogin.type  = "password"
   }else{
      iconLogin.setAttribute("class", "fa-solid fa-eye")
      campoLogin.type = "text"
   }
   //SEÇÃO CADASTRO
   if(iconCadastro.className === 'fa-solid fa-eye'){
      iconCadastro.setAttribute("class", "fa-solid fa-eye-slash")
      campoCadastro.type  = "password"

   }else{
      iconCadastro.setAttribute("class", "fa-solid fa-eye")
      campoCadastro.type = "text"
   }
     
}
function verSenhaDadosNovos(){
   let iconDadosNovos = document.querySelector("#dadosNovos")
   let camposDadosNovos = document.querySelector("#senhaNova")
   //SEÇÃO DADOS NOVOS
   if(iconDadosNovos.className === 'fa-solid fa-eye'){
      iconDadosNovos.setAttribute("class", "fa-solid fa-eye-slash")
      camposDadosNovos.type  = "password"
   }else{
      iconDadosNovos.setAttribute("class", "fa-solid fa-eye")
      camposDadosNovos.type = "text"
   }
}

// SCRIPTS DA AREA DE TAREFAS
//MENU DO HEADER 
function verMenu(){
   lista = document.querySelector("#ul_menu")
   if(lista.style.display == "block"){
      lista.style.display = "none"
   }
   else{
      lista.style.display = "block"
   }
}
// SEÇÃO DO CARREGAMENTO DAS TAREFAS

class Tarefas {
   constructor(dia, data, descricao, status, id){
      this.dia = dia
      this.data = data
      this.descricao = descricao 
      this.status = status
      this.id_usuario = "usuario_"+id+"_"
      this.id_tarefa = ''
      // LEMBRA DE TIRAR O ID DAS CHAMADAS DAS FUNÇÕES POIS ELE JA ESTÁ SENDO RESGATADO AQUI
      if(id == undefined){ 
         let id = localStorage.getItem("id_usuario") 
         this.id_usuario = "usuario_"+id+"_"
      }
      if(this.id_tarefa == ''){//FIZ ISSO PARA QUE NA CHAMADA DA FUNÇÃO ELE JA RECEBER O VALOR CORRETO
         this.recuperaIdTarefa()
         this.id_tarefa = localStorage.getItem('id_tarefa')
      }

   }
   recuperaDados(){
      let usuarioString = localStorage.getItem(this.id_usuario)
      let dadosUsuarios = JSON.parse(usuarioString)
      return dadosUsuarios
   }
   proximoId(){
      this.id_tarefa++
      localStorage.setItem("id_tarefa",this.id_tarefa)
   }
   setTarefa(t){
      
      localStorage.setItem(this.id_usuario+this.id_tarefa, JSON.stringify(t))
      this.proximoId()//ELE VEIO PRIMEIRO PARA FAZER O INCREMENTO DO ID ANTES DE ADIOCIOANR
      this.mostrarTarefas()
   }
   getTarefas(){
      let tarefas = []
      let tbody = document.getElementById("tbody")
      tbody.innerText = ''
      for(let i = 0; i < Number(this.id_tarefa);i++){
         let tarefaString = localStorage.getItem(this.id_usuario+i)  
         let tarefaObjeto = JSON.parse(tarefaString)
         tarefas.push(tarefaObjeto)       
      }
     return tarefas
   }
   mostrarTarefas(){
      let tarefas = this.getTarefas()
      let tbody = document.getElementById("tbody")
      tbody.innerText = ''
      for(let i = 0; i < Number(this.id_tarefa);i++){
         if(tarefas[i] != null){ //AQUI EU FILTRO OS DADOS QUE O INDECE NÃO EXISTE
            let tr = tbody.insertRow()
            let td_dia = tr.insertCell()
            let td_data = tr.insertCell()
            let td_descricao = tr.insertCell()
            let td_status= tr.insertCell()
            let td_acao = tr.insertCell()        
            td_dia.innerText = tarefas[i].dia
            td_data.innerText = tarefas[i].data
            td_descricao.innerText = tarefas[i].descricao
            td_status.innerText = tarefas[i].status
            //AQUI EU ESTOU INSERINDO A COR DE FUNDO DE CADA LINHA
            if(tarefas[i].status == "Concluida"){
               tr.style.backgroundColor = "rgb(205, 212, 212)"
            }else{
               tr.style.backgroundColor = "white"
            }
            // CRIANDO OS ICONES DE AÇÃO 
            // CONCLUIR
            let concluir_icon = document.createElement("i")
            concluir_icon.setAttribute("class","fa-regular fa-square-check")
            concluir_icon.setAttribute("onclick", `concluirTarefa(${i})`)
            td_acao.appendChild(concluir_icon)
            //EDITAR
            let editar_icon = document.createElement("i")
            editar_icon.setAttribute("class","fa-solid fa-pen")
            editar_icon.setAttribute("onclick", `editarTarefa(${i})`)
            td_acao.appendChild(editar_icon)
            //REMOVER  
            let remover_icon = document.createElement("i")
            remover_icon.setAttribute("class","fa-solid fa-trash")
            remover_icon.setAttribute("onclick", `removerTarefa(${i})`)
            td_acao.appendChild(remover_icon)
         }
      }     
   }
   // CONCLUINDO A TAREFA
   concluirTarefa(indece){
      let tarefaString = localStorage.getItem(this.id_usuario+indece)
      let tarefaObjeto = JSON.parse(tarefaString)
      // AQUI IRÁ MUDAR O STATUS DE ACORDO QUE O USUARIO FOR CLICANDO
      tarefaObjeto.status == "Concluida"?tarefaObjeto.status ="Em Andamento":tarefaObjeto.status = "Concluida"
      localStorage.setItem(this.id_usuario+indece, JSON.stringify(tarefaObjeto))
      this.mostrarTarefas()
   }
   removerTarefa(indece){
      localStorage.removeItem(this.id_usuario+indece)//REMOVENDO
      location.reload()//RELOGANDO A PAGINA PARA SUMIR A LINHA DA TABELA ATUAL
   }
   //DELETANDO A CONTA E TODOS OS DADOS NELA EXISTENTES
   deletarConta(){
      localStorage.removeItem(this.id_usuario)
      localStorage.removeItem('id_tarefa')
      for (let i = 0; i < this.id_tarefa; i++) {
         localStorage.removeItem(this.id_usuario+i)
      }
      location.replace("index.html")
   }
   salvarNovosDados(){
     let dadosUsuarios = this.recuperaDados()
     let nome = document.querySelector('#nomeNovo').value
     let senha = document.querySelector("#senhaNova").value
      if(nome != '' && senha != ''){
         dadosUsuarios.nome = nome
         dadosUsuarios.senha = senha
         localStorage.setItem(this.id_usuario, JSON.stringify(dadosUsuarios))
         location.replace("index.html")
      }
   }
   editarDadosTarefa(tarefaAtual){
      let id_tarefaAtual = localStorage.getItem("id_tarefa_atual") // AQUI EU RESGATEI O ID ATUAL PARA DAI EDITAR A TAREFA
      localStorage.setItem(this.id_usuario+id_tarefaAtual, JSON.stringify(tarefaAtual))
      location.replace("tarefas.html")
   }
   recuperaIdTarefa(){ //IRÁ RECUPERAR O ID DE ONDE ELE PAROU PARA DAI SER RESGATADO TODAS AS TAREFAS ANTERIORMENTE REGISTRADAS
      let id = 0
      for(let i = 0 ; i <20  ;i++){
          if(localStorage.getItem(this.id_usuario+i) != null){
            id = i
          }
      }
      localStorage.setItem("id_tarefa",id+1)
   }
}

function excluirConta(){
   let tarefa = new Tarefas()
      tarefa.deletarConta()
}
function sairDaConta(){
   location.replace("index.html")
}
function editarConta(){
   location.replace("altera_dados_usuario.html")
}
// QUANDO A PAGINA É CARREGADA OS DADOS DO EMAIL SÃO TRATADOS E JOGADOS NA TELA PARA FICAR DENTRO DO INPUT
function recuperarDadosNovos(){
   let tarefa = new Tarefas()
   let dadosUsuarios = tarefa.recuperaDados()
   let email = document.querySelector('#novoEmail')
   email.value = dadosUsuarios.email
}
function salvarDados(){
   let tarefa = new Tarefas()
   tarefa.salvarNovosDados()
}
function editarTarefa(indece){
   localStorage.setItem("id_tarefa_atual", indece)
   location.replace("altera_dados_tarefa.html")
   document.querySelector("#secaoNovosDados").style.display = "none"
   document.querySelector("#alteraTarefa").style.display = "block"
}
function editarTarefaAtual(){
   const dia_mes = document.querySelector("#dia_mes_novo").value
   const mes = document.querySelector("#mes_novo").value
   const ano = document.querySelector("#ano_novo").value
   const dia_semana = document.querySelector("#dia_semana_novo").value
   const status = document.querySelector("#select_status_novo").value
   const descricao = document.querySelector("#descricao_nova").value
   if(dia_mes != '' && mes != '' &&  ano != '' &&  dia_semana != '' &&  status != '' &&  dia_mes != '' && descricao != ''){
      const data = `${dia_mes}/${mes}/${ano}`
      let tarefa = new Tarefas(dia_semana, data, descricao, status)
      tarefa.editarDadosTarefa(tarefa)
   }
}
function cancelarEdicao(){
   location.replace("tarefas.html")
}

function carregaTarefas(){
      let id = localStorage.getItem('id_usuario')
      let usuario = localStorage.getItem("usuario_"+id+"_")
      let usuario_objeto = JSON.parse(usuario)
      if(usuario_objeto != null){
         const titulo = document.querySelector("#titulo")
         titulo.innerText = "Olá, " + usuario_objeto.nome 
         let tarefa = new Tarefas()
         tarefa.mostrarTarefas()
      }  
}
// REMOVENDO TAREFA
function  removerTarefa(i){
   let tarefa = new Tarefas()
   tarefa.removerTarefa(i)
}
// CONCLUINDO A TAREFA
function concluirTarefa(i){
   let tarefa = new Tarefas()
   tarefa.concluirTarefa(i)
}
function adicionarTarefa(){
   const status = document.querySelector("#select_status").value
   const dia = document.querySelector("#dia_semana").value
   const descricao = document.querySelector("#descricao").value

   // DATA
   const dia_mes = document.querySelector("#dia_mes").value
   const mes = document.querySelector("#mes").value
   const ano = document.querySelector("#ano").value
   const data = `${dia_mes}/${mes}/${ano}`
   //DATA PRONTA 

  

   if(status != '' && dia != '' && descricao != '' && dia_mes != '' && mes != '' && data != ''){
      let id = localStorage.getItem("id_usuario") //RESGATANDO O ID DO USUARIO DE ACORDO COM O SEU CADASTRO
      let tarefa = new Tarefas(dia, data, descricao, status, id)
      tarefa.setTarefa(tarefa)
       alert("adicionado com sucesso")
       document.querySelector('.button').type = "reset" //SERVE PARA REINICIAR OS VALORES PARA 0 
   }
   else{
      document.querySelector('.button').type = "button" // VOLTANDO AO ESTADO NORMAL PARA SE ERRAR NÃO PREENCHER TUDO NOVAMENTE
      alert("Verifique se todos os campos foram preenchidos corretamente")
   }
}
