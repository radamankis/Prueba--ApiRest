const mysql = require('mysql');

connection= mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'ficha'
});

//metodos de consultas
let formacionModel={};

formacionModel.getDatos= (callback) =>{
    if(connection) {
        connection.query('SELECT * FROM formacionacademica ',
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

formacionModel.postDatos= (datosData,callback) => {
    if(connection){
        connection.query('INSERT INTO formacionacademica SET ?',datosData,
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

formacionModel.updateDatos= (datosData, callback) => {
    if(connection){

        connection.query('UPDATE formacionacademica SET GradoInstitucion = ?, TituloPregrado	 = ?, Universidad = ?  WHERE id = ?',[datosData.GradoInstitucion, datos.TituloPregrado, datosData.Universidad, datosData.id], (err, result) => {
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

formacionModel.deleteDatos= ( id, callback) => {
    if(connection){
         
       connection.query('SELECT * FROM formacionacademica WHERE id= ?',[id],
       (err,row) =>{
           if(row){
               connection.query('DELETE FROM formacionacademica WHERE id=?',[id], (err, result) =>{
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

module.exports = formacionModel;