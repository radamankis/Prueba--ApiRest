const express = require("express");
const formacion = express.Router();
const Formacion=require('../models/formacionAcademica');
const cors = require('cors')
formacion.use(cors());



    formacion.get('/formacion', (req,res) => {
        Formacion.getUsers((err,data) => {
            res.json(data);
        });
    });

    formacion.get('/formacion/:id', (req,res) => {
        Formacion.getDato( req.params.id, (err, data) => {
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

    formacion.post('/formacion', (req, res) => {
        const userData= {
            idDatoPersonal: req.body.idDatoPersonal,
            GradoInstitucion: req.body.GradoInstitucion,
            TituloPregrado: req.body.TituloPregrado,
            UniversidadPre: req.body.UniversidadPre
            // created_at: null//
            
        };

        Formacion.postDatos( userData, (err, data) =>{
            if(data&& data.insertId) {
                console.log(data)
                res.json({
                    success: true,
                    msg: 'Formacion Agregada',
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

    formacion.put('/formacion/:id', (req, res) =>{
       
        const userData= {
            idDatoPersonal: req.body.idDatoPersonal,
            GradoInstitucion: req.body.GradoInstitucion,
            TituloPregrado: req.body.TituloPregrado,
            UniversidadPre: req.body.UniversidadPre
            // created_at: null//
            
                    
        };
        Formacion.updateDatos(userData, (err, data) =>{
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

    formacion.delete('/formacion/:id', (req, res) =>{
        Formacion.deleteUser( req.params.id, (err, data) =>{
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
module.exports= formacion;