const User=require('../models/user');

module.exports = function(app){

    app.get('/users', (req,res) => {
        User.getUsers((err,data) => {
            res.json(data);
        });
    });


    app.post('/users', (req, res) => {
        const userData= {
            id: null,
            username: req.body.username,
            password: req.body.password,
            email: req.body.email,
            created_at: null
            
        };

        User.postUsers( userData, (err, data) =>{
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

    app.put('/users/:id', (req, res) =>{
       
        const userData= {
            id: req.params.id,
            username: req.body.username,
            password: req.body.password,
            email: req.body.email,
            created_at: null
            
        };
        User.updateUser(userData, (err, data) =>{
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

    app.delete('/users/:id', (req, res) =>{
        User.deleteUser( req.params.id, (err, data) =>{
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
}