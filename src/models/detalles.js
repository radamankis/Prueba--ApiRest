const mysql = require('mysql');

connection= mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'ficha'
});

//metodos de consultas
let detalleModel={};

detalleModel.getDatos= (callback) =>{
    if(connection) {
        connection.query('SELECT * FROM detalles ',
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

detalleModel.postDatos= (datosData,callback) => {
    if(connection){
        connection.query('INSERT INTO detalles SET ?',datosData,
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

detalleModel.updateDatos= (datosData, callback) => {
    if(connection){

        connection.query('UPDATE detalles SET Discapacidad = ?, FechaJubilacion = ?, FechaVigencia = ?, FechaIngresoInicial = ?, idUsuario = ?, idFormacionAcademica = ? ,idPostgrado = ? ,Created = ? ,Updated = ? ,Deleted = ?   WHERE id = ?',[datosData.Discapacidad, datos.FechaJubilacion, datosData.FechaVigencia,datosData.FechaIngresoInicial,datosData.idUsuario,datosData.idFormacionAcademica,datosData.idPostgrado,datosData.Created,datosData.Updated,datosData.Deleted, datosData.id], (err, result) => {
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

detalleModel.deleteDatos= ( id, callback) => {
    if(connection){
         
      
               connection.query('UPDATE  detalles SET Deleted =? WHERE id=?',[true,id], (err, result) =>{
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
       
        
    
};

module.exports = detalleModel;