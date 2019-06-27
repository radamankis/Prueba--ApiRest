const express = require("express");
const tipoPersonal = express.Router();
const TipoPersonal=require('../models/tipoPersonal');
const cors = require('cors')
tipoPersonal.use(cors());



tipoPersonal.get('/tipopersonal', (req,res) => {
        TipoPersonal.getUsers((err,data) => {
            res.json(data);
        });
    });

    tipoPersonal.get('/tipopersonal/:id', (req,res) => {
        TipoPersonal.getDato( req.params.id, (err, data) => {
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


    tipoPersonal.post('/tipopersonal', (req, res) => {
        const datosData= {
            
            idDatoPersonal: req.body.idDatoPersonal,
            
            ComisionServicioDesde: req.body.ComisionServicioDesde,
            ComisionServicioHasta: req.body.ComisionServicioHasta,
            PermisoNRDesde: req.body.PermisoNRDesde,
            PermisoNRHasta: req.body.PermisoNRHasta,
            CodigoCargo: req.body.CodigoCargo,
            Nucleo: req.body.Nucleo,
            Prog: req.body.Prog,
            ACC: req.body.ACC,
            SubACC: req.body.SubACC,
            Tarea: req.body.Tarea,
            Detalle: req.body.Detalle
        };

        TipoPersonal.postDatos( datosData, (err, data) =>{
            if(data&& data.insertId) {
                console.log(data)
                res.json({
                    success: true,
                    msg: 'Tipo de Personal Creado',
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

    tipoPersonal.put('/tipopersonal/:id', (req, res) =>{
       
        const datosData= {
            
            idDatoPersonal: req.params.idDatoPersonal,
            
            ComisionServicioDesde: req.body.ComisionServicioDesde,
            ComisionServicioHasta: req.body.ComisionServicioHasta,
            PermisoNRDesde: req.body.PermisoNRDesde,
            PermisoNRHasta: req.body.PermisoNRHasta,
            CodigoCargo: req.body.CodigoCargo,
            Nucleo: req.body.Nucleo,
            Prog: req.body.Prog,
            ACC: req.body.ACC,
            SubACC: req.body.SubACC,
            Tarea: req.body.Tarea,
            Detalle: req.body.Detalle
        };
        
        TipoPersonal.updateDatos(datosData, (err, data) =>{
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

    tipoPersonal.delete('/tipopersonal/:id', (req, res) =>{
        TipoCargo.deleteUser( req.params.id, (err, data) =>{
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
module.exports= tipoPersonal;