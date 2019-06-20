const express = require("express");
const datos = express.Router();
const datosPersonal= require('../models/datosPersonal');
const cors = require('cors')
datos.use(cors());


    datos.get('/datospersonal', (req,res) => {
        datosPersonal.getDatos((err,data) => {
            res.json(data);
        });
    });

    datos.get('/datospersonal/:id', (req,res) => {
        datosPersonal.getDato( req.params.id, (err, data) => {
            console.log(req.params.id)
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

    datos.get('/datospersonal/buscar/:Cedula', (req,res) => {
        console.log(req.params.Cedula)
        datosPersonal.getcedula( req.params.Cedula, (err, data) => {
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
    datos.get('/perfil/:Cedula', (req,res) => {
        console.log(req.params.Cedula)
        datosPersonal.getcedula( req.params.Cedula, (err, data) => {
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

    datos.post('/datospersonal', (req, res) => {
        const datosData= {
            Nombre: req.body.Nombre,
            Apellido: req.body.Apellido,
            Cedula: req.body.Cedula,
            Sexo: req.body.Sexo,
            EstadoCivil: req.body.EstadoCivil,
            Nacionalidad: req.body.Nacionalidad,
            NHijos: req.body.NHijos,
            FechaNacimiento: req.body.FechaNacimiento,
            idDetalles: null
            
        };
        
        datosPersonal.postDatos( datosData, (err, data) =>{
            if(data&& data.insertId) {
                console.log(data)
                res.json({
                    success: true,
                    msg: 'Datos Creado',
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

    datos.put('/datospersonal/:id', (req, res) =>{
       
        const datosData= {
            id: null,
            Nombre: req.body.Nombre,
            Apellido: req.body.Apellido,
            Cedula: req.body.Cedula,
            Sexo: req.body.Sexo,
            EstadoCivil: req.body.EstadoCivil,
            Nacionalidad: req.body.Nacionalidad,
            NHijos: req.body.NHijos,
            FechaNacimiento: req.body.FechaNacimiento,
            idDetalles: req.body.idDetalles
            
        };
        datosPersonal.updateDatos(datosData, (err, data) =>{
            if(data && data.msg){
                res.json(data)
            } else{
                res.json({
                    success:false,
                    msg: "error"
                })
            }
        })
    });

    datos.delete('/datospersonal/:id', (req, res) =>{
        datosPersonal.deleteDatos( req.params.id, (err, data) =>{
            if(data && data.msg === 'deleted' ){
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
    });

module.exports = datos;