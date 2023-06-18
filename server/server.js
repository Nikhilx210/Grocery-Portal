import express from 'express'
import colors from 'colors'
import dotenv from 'dotenv'
import morgan from 'morgan';
import p from './passport.js'
import connectDB from './config/db.js';
import authroutes from './routes/authRoute.js';
import categoryRoutes from './routes/categoryRoutes.js'
import cors from 'cors'
import ProductRoutes from './routes/productRoutes.js'
import passport from 'passport';
import cookieSession from 'cookie-session';
//config env
dotenv.config();
//database config
connectDB();
//rest object
const app =express();


//middlewares
app.use(
    cookieSession({ name: "session", keys: ["lama"], maxAge: 24 * 60 * 60 * 100 })
);
app.use(express.json())
app.use(morgan('dev'))
app.use(
	cors({
		origin: "http://localhost:3000",
		methods: "GET,POST,PUT,DELETE",
		credentials: true,
	})
);

  
app.use(passport.initialize());
app.use(passport.session());
app.use(function(request, response, next) {
    if (request.session && !request.session.regenerate) {
        request.session.regenerate = (cb) => {
            cb()
        }
    }
    if (request.session && !request.session.save) {
        request.session.save = (cb) => {
            cb()
        }
    }
    next()
})
//Routes
app.use('/api/v1/auth',authroutes);
app.use('/api/v1/category',categoryRoutes);
app.use('/api/v1/product',ProductRoutes);
//rest api
app.get('/',(req,res)=>{
    res.send({
        message:"Welcome to ecommerce app"
    })
})

//PORT
const PORT=process.env.PORT || 4000 ;

//run listen
app.listen(PORT,()=>{
    console.log(`Server Running on ${process.env.DEV_MODE} mode on Port ${PORT}`.bgCyan.white)
})