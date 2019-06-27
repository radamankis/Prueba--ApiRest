const mysql = require('mysql');

connection= mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'ficha'
});

//metodos de consultas
let cargoModel={};

cargoModel.getDatos= (callback) =>{
    if(connection) {
        connection.query('SELECT * FROM cargo ',
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

cargoModel.getDato= (id,callback) =>{
    if(connection) {
        connection.query('SELECT * FROM cargo WHERE idDatoPersonal= ? ',[id],
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

cargoModel.postDatos= (datosData,callback) => {
    if(connection){
        connection.query('INSERT INTO cargo SET ?',datosData,
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

cargoModel.updateDatos= (datosData, callback) => {
    if(connection){

        connection.query('UPDATE cargo SET idDatoPersonal = ?, Nucleo = ?, CodigoNucleo = ?, Localizacion = ?, Dependencia = ?, DenominacionCargo = ? ,CargoActualUdo = ? ,idCargoOpsu = ? ,FechaDesdeOtra = ? ,FechaHastaOtra = ? ,NombreOtraInstitucion = ?  WHERE id = ?',[datosData.idDatoPersonal, datos.Nucleo, datosData.CodigoNucleo,datosData.Localizacion,datosData.Dependencia,datosData.DenominacionCargo,datosData.CargoActualUdo,datosData.idCargoOpsu,datosData.FechaDesdeOtra,datosData.FechaHastaOtra,datosData.NombreOtraInstitucion, datosData.id], (err, result) => {
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

cargoModel.deleteDatos= ( id, callback) => {
    if(connection){
         
       connection.query('SELECT * FROM cargo WHERE id= ?',[id],
       (err,row) =>{
           if(row){
               connection.query('DELETE FROM cargo WHERE id=?',[id], (err, result) =>{
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

module.exports = cargoModel;