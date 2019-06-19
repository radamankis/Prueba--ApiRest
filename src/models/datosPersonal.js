const mysql = require('mysql');

connection= mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'ficha'
});

//metodos de consultas
let datosPersonalModel={};

datosPersonalModel.getDatos= (callback) =>{
    if(connection) {
        connection.query('SELECT * FROM datospersonal ',
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
datosPersonalModel.getDato= (id,callback) =>{
    if(connection) {
        connection.query('SELECT * FROM datospersonal WHERE idDatoPersonal= ? ',[id],
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

datosPersonalModel.postDatos= (datosData,callback) => {
    if(connection){
        connection.query('INSERT INTO datospersonal SET ?',datosData,
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

datosPersonalModel.updateDatos= (datosData, callback) => {
    if(connection){

        connection.query('UPDATE datospersonal SET Nombre = ?, Apellido = ?, Cedula = ?,  Sexo = ?, EstadoCivil = ?, Nacionalidad = ?, NHijos = ?, FechaNacimiento = ?, Detalles =? WHERE id = ?',[datosData.Nombre, datos.Apellido, datosData.Cedula,datosData.EstadoCivil, datosData.Nacionalidad, datosData.NHijos, datosData.FechaNacimiento, datosData.Detalles, datosData.id], (err, result) => {
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

datosPersonalModel.deleteDatos= ( id, callback) => {
    if(connection){
         
       
               connection.query('UPDATE detalles SET Deleted =? WHERE id=?',[true,id], (err, result) =>{
                   if(err){
                       throw err
                   } else{
                       callback(null, {
                           msg: 'deleted'
                       })
                   }
               })
           } 
};

module.exports = datosPersonalModel;