const express = require("express");
const remuneracion = express.Router();
const Remuneracion=require('../models/remuneraciones');
const cors = require('cors')
remuneracion.use(cors());



remuneracion.get('/remuneracion', (req,res) => {
        Remuneracion.getUsers((err,data) => {
            res.json(data);
        });
    });


    remuneracion.post('/remuneracion', (req, res) => {
        const datosData= {
            
            idDatoPersonal: req.body.idDatoPersonal,
            SueldoTabla: req.body.SueldoTabla,
            BonoJefatura: req.body.BonoJefatura,
            PrimaFamiliar: req.body.PrimaFamiliar,
            BonoLacteo: req.body.BonoLacteo,
            PrimaGradoAcademico: req.body.PrimaGradoAcademico,
            PrimaProfecionalizacion: req.body.PrimaProfecionalizacion,
            PrimaHijoDiscapacidad: req.body.PrimaHijoDiscapacidad,
            PrimaApoyo: req.body.PrimaApoyo,
            PrimaChoferSupervisor: req.body.PrimaChoferSupervisor,
            PasoAutomatico: req.body.PasoAutomatico,
            AporteCajaAhorro: req.body.AporteCajaAhorro            
            
        };

        Remuneracion.postDatos( datosData, (err, data) =>{
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

    remuneracion.put('/remuneracion/:id', (req, res) =>{
       
        const datosData= {
            id: null,
            idDatoPersonal: req.params.id,
            SueldoTabla: req.body.SueldoTabla,
            BonoJefatura: req.body.BonoJefatura,
            PrimaFamiliar: req.body.PrimaFamiliar,
            BonoLacteo: req.body.BonoLacteo,
            PrimaGradoAcademico: req.body.PrimaGradoAcademico,
            PrimaProfecionalizacion: req.body.PrimaProfecionalizacion,
            PrimaHijoDiscapacidad: req.body.PrimaHijoDiscapacidad,
            PrimaApoyo: req.body.PrimaApoyo,
            PrimaChoferSupervisor: req.body.PrimaChoferSupervisor,
            PasoAutomatico: req.body.PasoAutomatico,
            AporteCajaAhorro: req.body.AporteCajaAhorro            
            
        };
        
        Remuneracion.updateDatos(datosData, (err, data) =>{
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

    remuneracion.delete('/remuneracion/:id', (req, res) =>{
        Remuneracion.deleteUser( req.params.id, (err, data) =>{
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
module.exports= remuneracion;