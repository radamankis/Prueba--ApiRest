const express = require('express');
const cors = require('cors')
const path= require('path');
const app= express();
const morgan= require('morgan');
const bodyParser= require('body-parser');

//setting
app.set('port', process.env.PORT || 4000);

//middlewares
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}))
// static files
app.use(express.static(path.join(__dirname, 'public')))

var Users= require('./routes/userRoutes');
var DatosPersonal= require('./routes/datosPersonalRoutes');
var cargoOpsu= require('./routes/cargoOpsuRoutes');
var cargo= require('./routes/cargoRoutes');
var detalles= require('./routes/detallesRoutes');
var formacion= require('./routes/formacionRoutes');
var postgrado= require('./routes/postgradoRoutes');
var rumuneracion= require('./routes/remuneracionRoutes');
var tipoCargo= require('./routes/tipoCargoRoutes');
var tipoPersonal= require('./routes/tipoPersonalRoutes');
//Routes
app.use('/', Users);
app.use('/', DatosPersonal);
app.use('/', cargoOpsu);
app.use('/', cargo);
app.use('/', detalles);
app.use('/', formacion);
app.use('/', postgrado);
app.use('/', rumuneracion);
app.use('/', tipoCargo);
app.use('/', tipoPersonal);

app.listen(app.get('port'), ()=>{
    console.log('Server on port 4000');
});