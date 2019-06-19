const mysql = require('mysql');

connection= mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'ficha'
});

//metodos de consultas
let tipoCargoModel={};

tipoCargoModel.getDatos= (callback) =>{
    if(connection) {
        connection.query('SELECT * FROM tipocargo ',
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

tipoCargoModel.postDatos= (datosData,callback) => {
    if(connection){
        connection.query('INSERT INTO tipocargo SET ?',datosData,
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

tipoCargoModel.updateDatos= (datosData, callback) => {
    if(connection){

        connection.query('UPDATE tipocargo SET Generico = ?, Especifico = ?, DedicacionLaboral = ?,  ActividadLaboral = ?, Categoria = ?, CondicionLaboral = ? WHERE id = ?',[datosData.Generico, datos.Especifico, datosData.DedicacionLaboral, datosData.ActividadLaboral, datosData.Categoria, datosData.CondicionLaboral, datosData.id], (err, result) => {
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

tipoCargoModel.deleteDatos= ( id, callback) => {
    if(connection){
         
       connection.query('SELECT * FROM tipocargo WHERE id= ?',[id],
       (err,row) =>{
           if(row){
               connection.query('DELETE FROM tipocargo WHERE id=?',[id], (err, result) =>{
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

module.exports = tipoCargoModel;