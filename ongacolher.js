//requisitando os modulos
const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");

//configurando o express para o postman e para usar a pagina
const app = express();
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());

const port = 3000;

//configurando o banco de dados
mongoose.connect("mongodb://127.0.0.1:27017/ongacolher", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS : 20000
});

//criando a model do seu projeto
const UsuarioSchema = new mongoose.Schema({
  nome: { type: String },
  email: { type: String, required: true },
  senha: { type: Number },
  confirmarsenha: { type: Number},
  status : {type: String}
});

const Usuario = mongoose.model("Usuario", UsuarioSchema);

//configuração dos roteamendos
//cadastrousuario
app.post("/cadastrousuario", async (req, res) => {
  const nome = req.body.nome;
  const email = req.body.email;
  const senha = req.body.senha;
  const confirmarsenha = req.body.confirmarsenha;
  const status = req.body.status;

  const usuario = new Usuario({
    nome: nome,
    email: email,
    senha: senha,
    confirmarsenha: confirmarsenha,
    status: status,
  });

  if(email == null || senha == null){
      return res.status(400).json({error : "Preencher todos os campos"});
  }

  //teste mais importante da ac
  const emailExiste = await Usuario.findOne({email:email});

  if(emailExiste){
      return res.status(400).json({error : "Esse email já está registrado no sistema"});
  }

  try{
      const newUsuario = await usuario.save();
      res.json({error : null, msg : "Cadastro ok", usuarioId : newUsuario._id});
  } catch(error){
      res.status(400).json({error});
  }
});

app.get("/cadastrousuario", async(req, res)=> {
  res.sendFile(__dirname+"/cadastrousuario.html");
});

app.get("/index", async(req, res)=>{
  res.sendFile(__dirname +"/index.html");
});

app.get("/login", async(req, res)=>{
  res.sendFile(__dirname +"/login.html");
});

app.get("/contact", async(req, res)=>{
  res.sendFile(__dirname +"/contact.html");
});


app.listen(port, ()=>{
    console.log(`Servidor rodando na porta ${port}`)
});