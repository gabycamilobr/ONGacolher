const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();

// Conectar ao MongoDB

mongoose.connect('mongodb://127.0.0.1:27017/cadastro', { useNewUrlParser: true, useUnifiedTopology: true, serverSelectionTimeoutMS : 3000 });

// Definir o modelo do usuário

const Usuario = mongoose.model('Usuario', {

    nome: String,
    email: String,
    celular: String,
    endereco: String,
    complemento: String,
    numero: String,
    bairro: String,
    cidade: String,
    uf: String,
    cep: String

});

app.use(bodyParser.urlencoded({ extended: true }));

// Rota para salvar o usuário

app.post('/salvar-usuario', (req, res) => {
    const usuarioData = req.body;
    const usuario = new Usuario(usuarioData);

    usuario.save()

        .then(() => {
            res.json({ success: true });
        })

        .catch(error => {
            console.error('Erro ao salvar usuário:', error);
            res.json({ success: false });
        });
});
 
app.listen(3000, () => {
    console.log('Servidor está ouvindo na porta 3000');
});
