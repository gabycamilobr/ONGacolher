//requisitando os modulos
const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");

//configurando o express para o postman e para usar a pagina
const app = express();
app.use(bodyParser.json());
const port = 3000;

//configurando o banco de dados
mongoose.connect("mongodb://127.0.0.1:27017/ongacolher", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//criando a model do seu projeto
const UsuarioSchema = new mongoose.Schema({
  nome: { type: String },
  email: { type: String, required: true },
  senha: { type: Number },
  confirmarsenha: { type: Number },
  status : {type: String}
});

const Usuario = mongoose.model("Usuario", UsuarioSchema);

//configuração dos roteamendos
//cadastrousuario
app.post("/cadastro", async (req, res) => {
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

  try {
    const newUsuario = await usuario.save();
    res.json({ error: null, msg: "Cadastro ok", UsuarioId: newUsuario._id });
  } catch (error) {}
});

app.get("/", async(req, res)=>{
    res.sendFile(__dirname + "/index.html")
});

app.listen(port, ()=>{
    console.log(`Servidor rodando na porta ${port}`)
});