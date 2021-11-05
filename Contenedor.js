const fs = require("fs")

class Contenedor {

    constructor(nombreArchivo, productos = [], producto) {

        this.nombreArchivo = nombreArchivo;
        this.productos = productos;

        

    }

    async save(objeto) {

        objeto.id = this.productos.length + 1
        this.productos.push(objeto)
            // objeto.id = data.length + 1
        try {

            await fs.promises.writeFile(this.nombreArchivo, JSON.stringify(this.productos))

            return objeto.id
        } catch (error) {
         console.log("no se pudo guardar", error)
        }
    }

    async getById(id) {

        try {

            const data = await fs.promises.readFile(this.nombreArchivo, "utf-8");

            const productos = JSON.parse(data);

            return productos.filter(producto => producto.id === id)

        } catch (error) {
            console.log(error)
        }

    }
    
    async getAll() {

        try {

            const data = await fs.promises.readFile(this.nombreArchivo, {encoding: "utf-8"});
            const productos = JSON.parse(data);
            return productos

        } catch (error) {

            console.log(error)

        }
    }
   async deleteById(id) {

        try {

            const data = await fs.promises.readFile(this.nombreArchivo, "utf-8");

            const productos = JSON.parse(data);

            this.productos = productos.filter(producto => producto.id !== id)
            await fs.promises.writeFile(this.nombreArchivo, JSON.stringify(this.productos))
        } catch (error) {

            console.log("no se pudo guardar", error)
        }
    }

   async deleteAll() {

        this.productos = [];
        
        await fs.promises.writeFile(this.nombreArchivo, JSON.stringify(this.productos))
    }

}

module.exports = Contenedor