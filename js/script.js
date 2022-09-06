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
         let usuarioString = localStorage.getItem('usuario_'+i+'_')
         let usuario_Obj = JSON.parse(usuarioString)
         usuario_array.push(usuario_Obj)
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
      console.log(usuarioFiltrado)
      return usuarioFiltrado

   }
   setUsuario(u){
      if(this.verificaDadosCadastro()){//SÓ IRÁ ADICIONAR CASO O USUARIO AINDA NÃO POSSUIR CADASTRO
         localStorage.setItem('usuario_'+this.id+'_',JSON.stringify(u))
         this.incrementoId()
      }
   }
    login(){
      let usuario = this.verificaDadosLogin()// VAI DEVOLVER OS DADOS JÁ EM SÓ ARRAY
      
      if(usuario.length == 1){
         alert("login aceito")
         localStorage.setItem("id_usuario", usuario[0].id)

         location.assign("tarefas.html")
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

      this.id_tarefa = localStorage.getItem('id_tarefa')
      if(this.id_tarefa == null){
         localStorage.setItem("id_tarefa",1)
         this.id_tarefa = localStorage.getItem('id_tarefa')
         console.log(this.id_tarefa)
      }
      console.log(this.id_tarefa)
   }
   proximoId(){
      this.id_tarefa++
      localStorage.setItem("id_tarefa",this.id_tarefa)
   }

   setTarefa(t){
      localStorage.setItem(this.id_usuario+this.id_tarefa, JSON.stringify(t))
      this.proximoId()
      this.getTarefas()
   }
   getTarefas(){
      let tarefa = []
      let tbody = document.getElementById("tbody")
      tbody.innerText = ''
      for(let i = 0; i< this.id_tarefa;i++){
         let tarefaString = localStorage.getItem(this.id_usuario+i)
         let tarefaObjeto = JSON.parse(tarefaString)
         
         console.log(tarefaObjeto)
         if(tarefaObjeto != null){
            tarefa = tarefaObjeto
            console.log(tarefaObjeto.dia)

            let tr = tbody.insertRow()

            let td_dia = tr.insertCell()
            let td_data = tr.insertCell()
            let td_descricao = tr.insertCell()
            let td_status= tr.insertCell()
            let td_acao = tr.insertCell()
            
            td_dia.innerText = tarefaObjeto.dia
            // td_data.innerText = 'teste'
            // td_descricao.innerText = 'teste'
            // td_status.innerText = 'teste'
            // td_acao.innerText = 'teste'
            }
        
      }
      console.log(tarefa)
   }

}

function carregaTarefas(){
      let id = localStorage.getItem('id_usuario')
      let usuario = localStorage.getItem("usuario_"+id+"_")
      let usuario_objeto = JSON.parse(usuario)
      const titulo = document.querySelector("#titulo")
      titulo.innerText = "Olá, " + usuario_objeto.nome   
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
       tarefa.getTarefas(tarefa)
       alert("adicionado com sucesso")
       document.querySelector('.button').type = "reset" //SERVE PARA REINICIAR OS VALORES PARA 0 
   }
   else{
      document.querySelector('.button').type = "button" // VOLTANDO AO ESTADO NORMAL PARA SE ERRAR NÃO PREENCHER TUDO NOVAMENTE
      alert("Verifique se todos os campos foram preenchidos corretamente")
   }
}
