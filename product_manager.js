// product_manager.js

const fs = require('fs');

class ProductManager {
    constructor() {
        this.loadDataFromFile();
    }

    loadDataFromFile() {
        try {
            const data = fs.readFileSync('./data.json', 'utf8');
            this.productos = JSON.parse(data);
        } catch (error) {
            console.log("No se pudo cargar el archivo:", error.message);
            this.productos = [];
        }
    }

    // Otros métodos de la clase ProductManager
}

// Solo ejecuta el código si este archivo es ejecutado directamente, no cuando es importado como un módulo
if (require.main === module) {
    const tm01 = new ProductManager();

    function menu() {
        console.log("1. Agregar Producto");
        console.log("2. Consultar Productos");
        console.log("3. Quitar Producto");
        console.log("4. Modificar Producto");
        console.log("5. Salir");
        // etc...
    }

    menu();
}

module.exports = ProductManager;
