const express =  require("express");
const cors = require("cors");

const config = require("../config");

const estudiantes = require("../routes/estudiante.routes");


const app = express();


//middlewares de configuracion
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

//config
app.set('port',config.app.port);//middlewares de configuracion
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

//config
app.set('port', config.app.port);

//Rutas
app.use("/estudiantes", estudiantes);

//End ponit not found
app.use((req,res,next)=>{
    res.status(404).json({
        message: "Endpoint not found"
    });
});

module.exports = app;