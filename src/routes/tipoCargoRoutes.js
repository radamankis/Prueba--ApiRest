const express = require("express");
const tipoCargo = express.Router();
const TipoCargo=require('../models/tipoCargo');
const cors = require('cors')
tipoCargo.use(cors());



tipoCargo.get('/tipocargo', (req,res) => {
        TipoCargo.getUsers((err,data) => {
            res.json(data);
        });
    });

    tipoCargo.get('/tipocargo/:id', (req,res) => {
        TipoCargo.getDato( req.params.id, (err, data) => {
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



    tipoCargo.post('/tipocargo', (req, res) => {
        const datosData= {
            idDatoPersonal: req.body.idDatoPersonal,
            Generico: req.body.Generico,
            Especifico: req.body.Especifico,
            DedicacionLaboral: req.body.DedicacionLaboral,
            ActividadLaboral: req.body.ActividadLaboral,
            Categoria: req.body.Categoria,
            CondicionLaboral: req.body.CondicionLaboral
        };

        TipoCargo.postDatos( datosData, (err, data) =>{
            if(data&& data.insertId) {
                console.log(data)
                res.json({
                    success: true,
                    msg: 'Tipo de cargo creado',
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

    tipoCargo.put('/tipocargo/:id', (req, res) =>{
       
        const datosData= {
            idDatoPersonal: req.body.idDatoPersonal,
            Generico: req.body.Generico,
            Especifico: req.body.Especifico,
            DedicacionLaboral: req.body.DedicacionLaboral,
            ActividadLaboral: req.body.ActividadLaboral,
            Categoria: req.body.Categoria,
            CondicionLaboral: req.body.CondicionLaboral
        };
        
        TipoCargo.updateDatos(datosData, (err, data) =>{
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

    tipoCargo.delete('/tipocargo/:id', (req, res) =>{
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
module.exports= tipoCargo;