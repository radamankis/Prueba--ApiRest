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

    users.get('/users/datos/:username', (req,res) => {
        console.log(req.params.username)
        User.getUser( req.params.role, (err, data) => {
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

        let body= req.body;
        let username= body.username;
        let password= body.password;
        
        
        User.getUser(username,(err,data)=>{
        if(err){
            return res.status(500).json({
                ok:false,
                err
            })
        }
        if(!data){
            return res.status(400).json({
                ok:false,
                err:{
                    mensage: "El usuario o contraseña incorrecto "
                }
            })
        }
        
        if(! bcrypt.compareSync( password, data[0].password)){
            return res.status(400).json({
                ok:false,
                err:{
                    mensage: "El usuario o contraseña incorrecto "
                }
            })
        }
    
        let token= jsw.sign({
            data:data
        }, 'secret', {expiresIn: 60* 60})
        
         res.json({
            ok:true,
            data:data,
            token
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

        User.postUsers( userData, (err, data) =>{
            if(data&& data.insertId) {
                console.log(data)
                res.json({
                    success: true,
                    msg: 'Usuario Creado',
                    data: data
                })
            } else{
                console.log(err)
                res.status(500).json({
                    success:false,
                    msg: 'Error'
                })
            }
        })

    });

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