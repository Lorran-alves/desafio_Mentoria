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
         document.getElementById("secaoLogin").style.display= "none"  
         document.querySelector("#tarefas").style.display = "block"
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
      console.log('final')
     }else{
      alert("digite os campos corretamente")
     }
  
}






















//  function login(email,senha,login,senhaArea){
//     console.log(email,senha,loginArea,senhaArea)
//     login.style.display = "none"
//     senhaArea.style.display = "none"
// }

function fazerCadastro(){
   secaoLogin.style.display = 'none'
   document.getElementById("secaoCadastro").style.display = "block"
}
// function fazerLogin(){
//    document.getElementById("secaoCadastro").style.display = "none"
//    secaoLogin.style.display = 'block'
// }





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