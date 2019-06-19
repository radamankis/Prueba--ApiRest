const express = require("express");
const postgrado = express.Router();
const Postgrado=require('../models/postgrado');
const cors = require('cors')
postgrado.use(cors());



postgrado.get('/postgrado', (req,res) => {
        Postgrado.getUsers((err,data) => {
            res.json(data);
        });
    });


    postgrado.post('/postgrado', (req, res) => {
        const userData= {
            
            TituloPostgrado: req.body.TituloPostgrado,
            UniversidadPostgrado: req.body.UniversidadPostgrado,
            NivelPostgrado: req.body.NivelPostgrado
            // created_at: null//
            
        };

        Postgrado.postDatos( userData, (err, data) =>{
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

    postgrado.put('/postgrado/:id', (req, res) =>{
       
        const userData= {
            
            TituloPostgrado: req.body.TituloPostgrado,
            UniversidadPostgrado: req.body.UniversidadPostgrado,
            NivelPostgrado: req.body.NivelPostgrado
            // created_at: null//
            
        };

        Postgrado.updateDatos(userData, (err, data) =>{
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

    postgrado.delete('/postgrado/:id', (req, res) =>{
        Postgrado.deleteUser( req.params.id, (err, data) =>{
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
module.exports= postgrado;