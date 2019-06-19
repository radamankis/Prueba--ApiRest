const mysql = require('mysql');

connection= mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'ficha'
});

//metodos de consultas
let cargoOpsuModel={};

cargoOpsuModel.getDatos= (callback) =>{
    if(connection) {
        connection.query('SELECT * FROM cargo_opsu ',
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

cargoOpsuModel.postDatos= (datosData,callback) => {
    if(connection){
        connection.query('INSERT INTO cargo_opsu SET Nombre=?',datosData.Nombre,
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

cargoOpsuModel.updateDatos= (datosData, callback) => {
    if(connection){

        connection.query('UPDATE cargo_opsu SET Nombre = ? WHERE id = ?',[datosData.Nombre, datosData.id], (err, result) => {
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

cargoOpsuModel.deleteDatos= ( id, callback) => {
    if(connection){
         
       connection.query('SELECT * FROM cargo_opsu WHERE id= ?',[id],
       (err,row) =>{
           if(row){
               connection.query('DELETE FROM cargo_opsu WHERE id=?',[id], (err, result) =>{
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

module.exports = cargoOpsuModel;