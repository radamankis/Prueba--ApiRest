const jwt= require('jsonwebtoken')

//===================
//VERIFICAR TOKEN
//======================

let verificaToken= (req, res, next)=>{

    let token= req.get('token');

    jwt.verify( token, "secret", (err, decoded)=>{
        if( err){
            return res.status(401).json({
                ok: false,
                err
            });
        }
        const a= decoded.Usuario;
        req.Usuario = decoded.Usuario;
        console.log(a)
        next();
    })

};

//===================
//VERIFICAR ROLE ADMIN
//======================
let verificaAdmin= (req, res, next)=>{

    let Usuario= req.Usuario
    console.log(Usuario[0].role)
    if(! Usuario[0].role === 'ADMIN' ){
        return res.json({
            ok:false,
            err:{
                message: " no es administrador"
            }
        })
        

    }else{
        
        next();
    }

    

};
module.exports ={
    verificaToken,
    verificaAdmin
}