const express = require("express");
const users = express.Router();
const bcrypt= require('bcrypt');
const { verificaToken, verificaAdmin}= require('../middlewares/autenticacion')
const jsw= require('jsonwebtoken');
const User=require('../models/user');
const cors = require('cors')
users.use(cors());



    users.get('/users', (req,res) => {

        
        User.getUsers((err,data) => {
            
            res.json(data);
        });
    });

    users.get('/user/:username', (req,res) => {
        const Username= req.params.username;
        
        User.getUser( Username , (err, data) => {
            if(data ){
                res.json({
                    success: true,
                    data:{
                        idUsuario: data[0].idUsuario,
                        username: data[0].username,
                        role: data[0].role

                    }
                })
            } else{
                res.json({
                    msg: 'Error'
                })
    }
    })
    });

    users.get('/users/buscar/:role', (req,res) => {
        console.log(req.params.role)
        User.getUserRol( req.params.role, (err, data) => {
            if(data ){
                res.json({
                    success: true,
                    data
                })
            } else{
                res.status(500).json({
                    msg: 'Error'
                })
    }
    })
    })

    users.get('/users/login/', (req,res) => {
        const Username= req.body.username;
        
        User.getUser( Username , (err, data) => {
            if(data ){
                res.json({
                    success: true,
                    data
                })
            } else{
                res.status(500).json({
                    msg: 'Error'
                })
    }
    })
    })

  users.post('/login',(req,res)=>{

        
       const Username= req.body.username;
        const Password= req.body.password;
        
        
       User.getUser (Username,(err,data)=>{
           
        if(data.length === 0){
            return res.json({
                ok:false,
                err: 
                { mensage:'No existe el usuario'}
            })
        }
        if(data[0].password === undefined){
            return res.json({
                ok:false,
                err:{
                    mensage: "El usuario o contraseña incorrecto "
                }
            })
        }
        
        if(! bcrypt.compareSync( Password, data[0].password)){
            return res.json({
                ok:false,
                err:{
                    mensage: "El usuario o contraseña incorrecto "
                }
            })
        }
    
        let token= jsw.sign({
            idUsuario:data[0].idUsuario,
            username: data[0].username,
            role: data[0].role
        }, 'secret', {expiresIn: 60* 60})
        
         
         res.token= token;
         
        res.json({
            ok: true,
            data:{ username: data[0].username,
                    role: data[0].role},            
            token,
            errors: []
         })
         
        })
        
       
    })
    
   


    users.post('/users', (req, res) => {
        const userData= {
            
            username: req.body.username,
            password: bcrypt.hashSync(req.body.password,10),
            role: req.body.role
            // created_at: null//
            
        };
        User.getUser(req.body.username,(err,data)=>{
            if(! data.length>0){
                User.postUsers( userData, (err, data) =>{
            
                    if(data&& data.insertId) {
                        console.log(data)
                        res.json({
                            success: true,
                            msg: 'Usuario Creado',
                            data: data
                        })
                    } else{
                        
                        
                        res.status(500).json({
                            success:false,
                            msg: 'Error'
                        })
                    }
                })
        
            }
            res.json({
                success: false,
                msg: 'El username ya existe'
            })
            });
        })
        

    users.put('/users/:id', (req, res) =>{
       
        const userData= {
            id: req.params.id,
            username: req.body.username,
            password: req.body.password,
            email: req.body.email,
            created_at: null
            
        };
        User.updateUser(userData, (err, data) =>{
            if(data && data.msg){
                res.json(data)
            } else{
                res.json({
                    success:false,
                    msg: "error"
                })
            }
        })
    })

    users.delete('/users/:id',verificaToken, (req, res) =>{
        User.deleteUser( req.params.id, (err, data) =>{
            if(data && data.msg === 'deleted' || data.msg ==='not exists'){
                res.json({
                    success: true,
                    data
                })
            } else{
                res.status(500).json({
                    msg: 'Error'
                })
            }
        })
    })
module.exports= users;