const express = require('express');
const path= require('path');
const app= express();
const morgan= require('morgan');
const bodyParser= require('body-parser');

//setting
app.set('port', process.env.PORT || 4000);

//middlewares
app.use(morgan('dev'));
app.use(bodyParser.json());

//Routes
require('./routes/userRoutes')(app);

// static files
app.use(express.static(path.join(__dirname, 'public')))

app.listen(app.get('port'), ()=>{
    console.log('Server on port 4000');
});