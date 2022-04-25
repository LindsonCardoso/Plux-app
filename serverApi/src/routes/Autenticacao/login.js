const rotas = require("express").Router();
const mysql = require("../../bd/bd").pool;


//login (ADMIN)
rotas.post('/', (req, res) => {
    const senha = req.body.senha
    const login = req.body.login
    const perfil = req.body.perfil


    //abrindo conexao mysql
    mysql.getConnection((error, conn) => { 
    conn.query( 
        "SELECT * FROM cad_usuario WHERE usu_login = ? AND usu_senha = ? AND usu_perfil = ?",
        [login, senha, perfil],
        (err, result) => {
            if(err) res.status(500).send({err: err, response: null});
            if(result.length > 0) {
               res.status(200).send(result)
            }else res.send({message: "Login/senha nao confere"})
     })
    });
});


module.exports = rotas;