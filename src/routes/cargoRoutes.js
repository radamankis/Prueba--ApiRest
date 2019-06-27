const express = require("express");
const cargo = express.Router();
const Cargo=require('../models/cargo');
const cors = require('cors')
cargo.use(cors());



cargo.get('/cargo', (req,res) => {
        Cargo.getDatos((err,data) => {
            res.json(data);
        });
    });

    cargo.get('/cargo/:id', (req,res) => {
        Cargo.getDato( req.params.id, (err, data) => {
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



    cargo.post('/cargo', (req, res) => {
        const datosData= {
            
            idDatoPersonal: req.body.idDatoPersonal,
            Nucleo: req.body.Nucleo,
            CodigoNucleo: req.body.CodigoNucleo,
            Localizacion: req.body.Localizacion,
            Dependencia: req.body.Dependencia,
            DenominacionCargo: req.body.DenominacionCargo,
            CargoActualUdo: req.body.CargoActualUdo,
            idCargoOpsu: req.body.idCargoOpsu,
            FechaDesdeOtra: req.body.FechaDesdeOtra,
            FechaHastaOtra: req.body.FechaHastaOtra,
            NombreOtraInstitucion: req.body.NombreOtraInstitucion
        };
        

        Cargo.postDatos ( datosData, (err, data) =>{
            if(data&& data.insertId) {
                console.log(data)
                res.json({
                    success: true,
                    msg: 'Cargo Creado',
                    data: data
                })
            } else{
                console.log(err)
              const a=  res.json({
                    success:false,
                    msg: 'Error'
                })
                console.log(a)
            }
        })

    });

    cargo.put('/cargo/:id', (req, res) =>{
       
        const datosData= {
            
            idDatoPersonal: req.params.id,
            Nucleo: req.body.Nucleo,
            CodigoNucleo: req.body.CodigoNucleo,
            Localizacion: req.body.Localizacion,
            Dependencia: req.body.Dependencia,
            DenominacionCargo: req.body.DenominacionCargo,
            CargoActualUdo: req.body.CargoActualUdo,
            idCargoOpsu: req.body.idCargoOpsu,
            FechaDesdeOtra: req.body.FechaDesdeOtra,
            FechaHastaOtra: req.body.FechaHastaOtra,
            NombreOtraInstitucion: req.body.NombreOtraInstitucion
        };
        
        Cargo.updateDatos(datosData, (err, data) =>{
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

    cargo.delete('/cargo/:id', (req, res) =>{
        Cargo.deleteUser( req.params.id, (err, data) =>{
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
module.exports= cargo;