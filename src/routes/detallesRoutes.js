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

    detalles.get('/detalles/:id', (req,res) => {
        Detalle.getDato( req.params.id, (err, data) => {
            console.log(req.params.id)
            if(data ){
                res.json({
                    success: true,
                    data
                })
            } else{
                res.json({
                    msg: 'Error'
                })
    }
    })
    })


    detalles.post('/detalles', (req, res) => {
        const userData= {
            idDatoPersonal: req.body.idDatoPersonal,
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
                    msg: 'Detalles agregados',
                    data: data
                })
            } else{
                console.log(err)
                res.json({
                    success:false,
                    msg: 'Error'
                })
            }
        })

    });

    detalles.put('/detalles/:id', (req, res) =>{
       
        const userData= {
            
            idDatoPersonal: req.body.idDatoPersonal,
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