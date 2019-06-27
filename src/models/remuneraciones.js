const mysql = require('mysql');

connection= mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'ficha'
});

//metodos de consultas
let remuneracionesModel={};

remuneracionesModel.getDatos= (callback) =>{
    if(connection) {
        connection.query('SELECT * FROM remuneraciones ',
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

remuneracionesModel.getDato= (id,callback) =>{
    if(connection) {
        connection.query('SELECT * FROM remuneraciones WHERE idDatoPersonal= ? ',[id],
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

remuneracionesModel.postDatos= (datosData,callback) => {
    if(connection){
        connection.query('INSERT INTO remuneraciones SET ?',datosData,
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

remuneracionesModel.updateDatos= (datosData, callback) => {
    if(connection){

        connection.query('UPDATE remuneraciones SET SueldoTabla = ?, BonoJefatura = ?, PrimaFamiliar = ?,  BonoLacteo = ?, PrimaGradoAcademico = ?, PrimaProfecionalizacion = ?, PrimaHijoDiscapacidad = ?, PrimaApoyo = ?, PrimaChoferSupervisor =?, PasoAutomatico =?, AporteCajaAhorro =? WHERE id = ?',[datosData.SueldoTabla, datos.BonoJefatura, datosData.PrimaFamiliar, datosData.BonoLacteo, datosData.PrimaGradoAcademico, datosData.PrimaProfecionalizacion, datosData.PrimaHijoDiscapacidad, datosData.PrimaApoyo, datosData.PrimaChoferSupervisor, datosData.PasoAutomatico, datosData.AporteCajaAhorro, datosData.id], (err, result) => {
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

remuneracionesModel.deleteDatos= ( id, callback) => {
    if(connection){
         
       connection.query('SELECT * FROM remuneraciones WHERE id= ?',[id],
       (err,row) =>{
           if(row){
               connection.query('DELETE FROM remuneraciones WHERE id=?',[id], (err, result) =>{
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

module.exports = remuneracionesModel;