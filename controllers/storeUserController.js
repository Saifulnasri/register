const User = require('../models/User')

module.exports =(req ,res) =>{
    User.create(req.body).then(() =>{
        console.log("สมัครสมาชิกสำเร็จ")
        res.redirect('/')
    }).catch((error) =>{
      
        if (error){
            const validationErrors = Object.keys(error.errors).map(keys => error.error[keys].message)
            req.flash('validationErrors' , validationErrors)
            req.flash('data', req.body)

            return res.redirect('/register')
        }
    });
 
}