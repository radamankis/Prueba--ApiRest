const mysql = require('mysql');

connection= mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'ficha'
});

//metodos de consultas
let tipoPersonalModel={};

tipoPersonalModel.getDatos= (callback) =>{
    if(connection) {
        connection.query('SELECT * FROM tipopersonal ',
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

tipoPersonalModel.getDato= (id,callback) =>{
    if(connection) {
        connection.query('SELECT * FROM tipopersonal WHERE idDatoPersonal= ? ',[id],
        (err, rows) =>{
            if(err){
                throw err;
            } else{
                console.log(rows)
                callback(null, rows);
            }
        }
        )
    }
};

tipoPersonalModel.postDatos= (datosData,callback) => {
    if(connection){
        connection.query('INSERT INTO tipopersonal SET ?',datosData,
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

tipoPersonalModel.updateDatos= (datosData, callback) => {
    if(connection){

        connection.query('UPDATE tipopersonal SET idDatoPersonal = ?, idTipoCargo = ?, ComisionServicioDesde = ?, ComisionServicioHasta = ?, PermisoNRDesde = ?, PermisoNRHasta = ? ,CodigoCargo = ? ,Nucleo = ? ,Prog = ? ,ACC = ? ,SubACC = ?, Tarea=?, Detalle=?  WHERE id = ?',[datosData.idDatoPersonal, datos.idTipoCargo, datosData.ComisionServicioDesde,datosData.ComisionServicioHasta,datosData.PermisoNRDesde,datosData.PermisoNRHasta,datosData.CodigoCargo,datosData.Nucleo,datosData.Prog,datosData.ACC,datosData.SubACC,datosData.Tarea,datosData.Detalle, datosData.id], (err, result) => {
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

tipoPersonalModel.deleteDatos= ( id, callback) => {
    if(connection){
         
       connection.query('SELECT * FROM tipopersonal WHERE id= ?',[id],
       (err,row) =>{
           if(row){
               connection.query('DELETE FROM tipopersonal WHERE id=?',[id], (err, result) =>{
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
};

module.exports = tipoPersonalModel;