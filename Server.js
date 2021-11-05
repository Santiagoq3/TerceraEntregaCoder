const express = require("express");
const Contenedor = require("./Contenedor");


const app  = express();
const PORT = 8080;

const path = "./db/productos.json"
const contenedor = new Contenedor(path, [] );





app.get("/productos", async(req,res)=>{

    const productos = await contenedor.getAll()

    res.send(productos)
    
})

app.get("/productosRandom", async(req,res)=>{

    let productos = await contenedor.getAll()
    const random = Math.floor(Math.random() * ((productos.length + 1) - 1) + 1) ;

     productos = await contenedor.getById(random)

    res.send(productos)
})



app.listen(PORT, ()=>{
    console.log(`servidor conectado en el puerto ${PORT}`)
})


