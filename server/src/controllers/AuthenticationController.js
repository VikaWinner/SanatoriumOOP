const authService = require('../services/auth.service');

module.exports={
    login,
    register,
    getById,
    _delete,
    getAll, 
    logout,
    refreshTokens
}

function login(req, res, next){
    authService.authenticate(req.body)
        .then((user)=>{
            if(user){
                res.cookie('user',user, {maxAge: 3600, httpOnly: true}).send(user);
//                res.json(user);
            }
            else{
                res.status(400).json({success: false, message: 'Email  or password is incorrect'});
            }
        })
        .catch(err=> next(err))
}

function refreshTokens(req,res,next){
    authService.refreshTokens(req.refreshToken)
        .then(tokens=>tokens? res.json(tokens):res.status(400).json({success: false, message: 'Invalid token'}))
        .catch(err=> next(err));
}

function logout(req,res,next){
    authService.logout(req.userId)
        .then(()=> res.json({message: 'Logout was success'}))
        .catch(err=>next(err))
}

function register(req,res,next){
    authService.create(req.body)
        .then(()=> res.json({message: 'Registation was success'}))
        .catch(err=>next(err))
}

function  refreshToken(req,res,next) {
    authService.refreshToken(req.body)
        .then(()=> res.json({message: 'refreshToken'}))
        .catch(err=>next(err))
}



function getAll(req, res, next) {
    authService.getAll()
        .then(users => res.json(users))
        .catch(err => next(err));
}

function getById(req, res, next){
    authService.getById(req.params.id)
        .then(user=>user? res.json(user): res.sendStatus(404))
        .catch(err=>next(err))
}

function _delete(req, res, next) {
    authService.delete(req.params.id)
        .then(() => res.json({}))
        .catch(err => next(err));
}
