// console.log('desde node');

import express from "express";
import dotenv from "dotenv";
import cors from 'cors';
import conectarDB from "./config/db.js";
import veterinarioRoutes from './routes/veterinarioRoutes.js';
import pacienteRoutes from './routes/pacienteRoutes.js';

//const app = express();
//app.use(express.json); // para leer body de postman

dotenv.config();

conectarDB();

const app = express();
app.use(express.json); 


const dominiosPermitidos = [process.env.FRONTEND_URL];
const corsOptions ={
    origin: function(origin, callback){
        if(dominiosPermitidos.indexOf(origin) !==-1 ){
            // el origen del request esta permitido
            callback(null,true);
        } else {
            callback(new Error('No permitido por CORS'));
        }
    },
};
app.use(cors(corsOptions));


//console.log(process.env.MONGO_URI);
/* app.use("/",(req, res) => {
    res.send("recargando!!");
}) */

app.use("/api/veterinarios", veterinarioRoutes);
app.use("/api/pacientes", pacienteRoutes);

const PORT = process.env.PORT || 3000;

/*
app.listen(PORT, '0.0.0.0', () => {
    console.log(`servidor funcionando en el puerto ${PORT}`);
});
*/

app.listen(PORT, (err) => {
    if (err) {
      console.error('Error al iniciar el servidor:', err);
    } else {
      console.log(`servidor funcionando en el puerto ${PORT}`);
    }
  });