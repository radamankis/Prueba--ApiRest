const express = require("express");
const detalles = express.Router();
const Detalle=require('../models/detalles');
const cors = require('cors')
detalles.use(cors());



    detalles.get('/detalles', (req,res) => {
        Detalle.getUsers((err,data) => {
            res.json(data);
        });
    });


    detalles.post('/detalles', (req, res) => {
        const userData= {
            
            Discapacidad: req.body.Discapacidad,
            FechaJubilacion: req.body.FechaJubilacion,
            FechaVigencia: req.body.FechaVigencia,
            FechaIngresoInicial: req.body.FechaIngresoInicial,
            idUsuario: req.body.idUsuario,
            idFormacionAcademica: null,
            idPostgrado: null,            
            Deleted: false
            // created_at: null//
            
        };

        Detalle.postDatos( userData, (err, data) =>{
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

    detalles.put('/detalles/:id', (req, res) =>{
       
        const userData= {
            
            
            idUsuario: req.body.idUsuario,
            idFormacionAcademica: req.body.idFormacionAcademica,
           
            // created_at: null//
            
        };
        Detalle.updateDatos(userData, (err, data) =>{
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

    detalles.delete('/detalles/:id', (req, res) =>{
        Detalle.updateUser(userData, (err, data) =>{
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
module.exports= detalles;