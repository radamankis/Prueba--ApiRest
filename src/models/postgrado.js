const mysql = require('mysql');

connection= mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'ficha'
});

//metodos de consultas
let postgradoModel={};

postgradoModel.getDatos= (callback) =>{
    if(connection) {
        connection.query('SELECT * FROM postgrado ',
        (err, rows) =>{
            if(err){
                throw err;
            } else{
                callback(null, rows);
            }
        }
        )
    }
};

postgradoModel.getDato= (id,callback) =>{
    if(connection) {
        connection.query('SELECT * FROM postgrado WHERE idDatoPersonal= ? ',[id],
        (err, rows) =>{
            if(err){
                throw err;
            } else{
                callback(null, rows);
            }
        }
        )
    }
};

postgradoModel.postDatos= (datosData,callback) => {
    if(connection){
        connection.query('INSERT INTO postgrado SET ?',datosData,
            (err, result) => {
                
                if(err){
                   
                    throw err;
                } else {
                    callback(null,{
                        'insertId': result.insertId
                    })
                }
            }
        )
    }
};

postgradoModel.updateDatos= (datosData, callback) => {
    if(connection){

        connection.query('UPDATE postgrado SET TituloPostgrado = ?, UniversidadPostgrado = ?, NivelPostgrado = ? WHERE id = ?',[datosData.TituloPostgrado, datos.UniversidadPostgrado, datosData.NivelPostgrado, datosData.id], (err, result) => {
            if(err){
                throw err
            } else{
                callback(null, {
                    "msg" : "success"
                })
            }
        })
    }
};

postgradoModel.deleteDatos= ( id, callback) => {
    if(connection){
         
       connection.query('SELECT * FROM postgrado WHERE id= ?',[id],
       (err,row) =>{
           if(row){
               connection.query('DELETE FROM postgrado WHERE id=?',[id], (err, result) =>{
                   if(err){
                       throw err
                   } else{
                       callback(null, {
                           msg: 'deleted'
                       })
                   }
               })
           } else {
            callback(null,{
                msg: 'not exists'
            })
           }
       })
        
    }
}

module.exports = postgradoModel;