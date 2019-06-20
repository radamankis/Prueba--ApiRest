const express = require("express");
const cargoOpsu = express.Router();
const CargoOpsu=require('../models/cargoOpsu');
const {verificaToken}= require('../middlewares/autenticacion')
const cors = require('cors')
cargoOpsu.use(cors());



    cargoOpsu.get('/cargoopsu', (req,res) => {
        CargoOpsu.getDatos((err,data) => {
            res.json(data);
            console.log(data)
        });
    });


    cargoOpsu.post('/cargoopsu', (req, res) => {
        const userData= {
            
            Nombre: req.body.Nombre
            
            
        };

        CargoOpsu.postDatos( userData, (err, data) =>{
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

    cargoOpsu.put('/cargoopsu/:id', (req, res) =>{
       
        const userData= {
            
            Nombre: req.body.Nombre,
            
            
        };
        CargoOpsu.updateDatos(userData, (err, data) =>{
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

    cargoOpsu.delete('/cargoopsu/:id', (req, res) =>{
        CargoOpsu.deleteUser( req.params.id, (err, data) =>{
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
module.exports= cargoOpsu;