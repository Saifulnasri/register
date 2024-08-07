const express = require('express');
const app = express()
const ejs = require('ejs')
const mongoose = require('mongoose')
const expressSession =require('express-session')
const flash =require('connect-flash')


//mongodb connect การเชื่อมต่อ
mongoose.connect('mongodb+srv://admin:1234@cluster0.5axwly7.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true
})


global.loggedIn = null



const indexControler =require('./controllers/indexController')
const loginControler =require('./controllers/loginController')
const registerControler =require('./controllers/registerController')
const storeUserControler =require('./controllers/storeUserController')
const loginUserControler =require('./controllers/loginUserController')
const logoutControler =require('./controllers/logoutControler')
const homeControler =require('./controllers/homeController')



//middleware
const redirectIfAuth =require('./middleware/redirectIfAuth')
const authMiddleware =require('./middleware/authMiddleware')



app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded())
app.use(flash())
app.use(expressSession({
  secret:"node secret"
}))
app.use("*", (req, res, next)=>{
  loggedIn = req.session.userId
  next()
})
app.set('view engine', 'ejs')


app.get('/' , indexControler) 
app.get('/home' ,authMiddleware, homeControler)
app.get('/login' ,redirectIfAuth, loginControler) 
app.get('/register' ,redirectIfAuth, registerControler) 
app.post('/user/register',redirectIfAuth , storeUserControler)
app.post('/user/login',redirectIfAuth, loginUserControler)
app.get('/logout' , logoutControler)

app.listen(4000, () => {
    console.log("App listening on port 4000")
})