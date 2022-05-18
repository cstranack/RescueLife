module.exports = {
    isAuth: (req, res, next) =>{
        try{
            if(req.isAuthenticated()){
                //do something only if user is authenticated
                return next();
            }else{
                res.redirect('/');
            }

        } catch (err){
            console.log(err.message);
            res.status(500).send('Server Error');
        }

    }
}