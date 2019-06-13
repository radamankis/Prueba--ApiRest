const mysql = require('mysql');

connection= mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'prueba2'
});

//metodos de consultas
let userModel={};

userModel.getUsers= (callback) =>{
    if(connection) {
        connection.query('SELECT * FROM users ORDER BY id',
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

userModel.postUsers= (userData,callback) => {
    if(connection){
        connection.query('INSERT INTO users SET ?',userData,
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

userModel.updateUser= (userData, callback) => {
    if(connection){

        connection.query('UPDATE users SET username = ?, password = ?, email = ? WHERE id = ?',[userData.username, userData.password, userData.email, userData.id], (err, result) => {
            if(err){
                throw err
            } else{
                callback(null, {
                    "msg" : "success"
                })
            }
        })
    }
}

userModel.deleteUser= ( id, callback) => {
    if(connection){
         
       connection.query('SELECT * FROM users WHERE id= ?',[id],
       (err,row) =>{
           if(row){
               connection.query('DELETE FROM users WHERE id=?',[id], (err, result) =>{
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


module.exports = userModel;