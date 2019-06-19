const express = require("express");
const cargo = express.Router();
const Cargo=require('../models/cargo');
const cors = require('cors')
cargo.use(cors());



cargo.get('/cargo', (req,res) => {
        Cargo.getUsers((err,data) => {
            res.json(data);
        });
    });


    cargo.post('/cargo', (req, res) => {
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
        

        Cargo.postDatos ( datosData, (err, data) =>{
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