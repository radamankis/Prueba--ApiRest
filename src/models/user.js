const mysql = require('mysql');

connection= mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'ficha'
});

//metodos de consultas
let userModel={};

userModel.getUsers= (callback) =>{
    if(connection) {
        connection.query('SELECT * FROM usuario ',
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
        connection.query('INSERT INTO usuario SET ?',userData,
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

        connection.query('UPDATE usuario SET username = ?, email = ?, password = ?, role=?  WHERE id = ?',[userData.username, userData.email, userData.password, userData.role,  userData.id], (err, result) => {
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

userModel.getUser=(data, callback)=>{
    if(connection){
         
        connection.query('SELECT * FROM usuario WHERE username= ?',[data],
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

userModel.getUserRol=(data, callback)=>{
    if(connection){
         
        connection.query('SELECT * FROM usuario WHERE role= ?',[data],
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

userModel.deleteUser= ( id, callback) => {
    if(connection){
         
       connection.query('SELECT * FROM usuario WHERE id= ?',[id],
       (err,row) =>{
           if(row){
               connection.query('DELETE FROM usuario WHERE id=?',[id], (err, result) =>{
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