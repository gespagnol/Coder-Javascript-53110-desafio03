const fs = require('fs');
let rutaArchivo = "./data.json";
const prompt = require('prompt-sync')();

class ProductManager {
    constructor() {
        this.loadDataFromFile();
    }

    loadDataFromFile() {
        try {
            const data = fs.readFileSync(rutaArchivo, 'utf8');
            this.productos = JSON.parse(data);
        } catch (error) {
            console.log("No se pudo cargar el archivo:", error.message);
            this.productos = [];
        }
    }

    saveDataToFile() {
        fs.writeFileSync(rutaArchivo, JSON.stringify(this.productos, null, 2));
    }

    addProduct() {
        const articulo = prompt("Ingrese el nombre del artículo:");
        const detalle = prompt("Ingrese el detalle del artículo:");
        const vencimiento = new Date(prompt("Ingrese la fecha de vencimiento (YYYY-MM-DD):"));
        const stock = parseInt(prompt("Ingrese la cantidad en stock:"));
        const valor = parseFloat(prompt("Ingrese el valor del artículo:"));

        if (!articulo || !detalle || isNaN(vencimiento.getTime()) || isNaN(stock) || isNaN(valor)) {
            console.log("Todos los campos deben ser completados correctamente.");
            return;
        }

        const code = this.productos.length > 0 ? this.productos[this.productos.length - 1].code + 1 : 1;

        const nuevoProducto = {
            code,
            articulo,
            detalle,
            vencimiento,
            stock,
            valor
        };

        this.productos.push(nuevoProducto);
        this.saveDataToFile();
        console.log("Se ha agregado el producto correctamente.");
    }

    removeProduct(codeToRemove) {
        const index = this.productos.findIndex(producto => producto.code === codeToRemove);
        if (index !== -1) {
            this.productos.splice(index, 1);
            this.saveDataToFile();
            console.log(`Se ha quitado el producto con código ${codeToRemove}.`);
        } else {
            console.log(`No se encontró ningún producto con código ${codeToRemove}.`);
        }
    }

    modifyProduct(codeToModify) {
        const index = this.productos.findIndex(producto => producto.code === codeToModify);
        if (index !== -1) {
            const nuevoArticulo = prompt("Ingrese el nuevo nombre del artículo:");
            const nuevoDetalle = prompt("Ingrese el nuevo detalle del artículo:");
            const nuevoVencimiento = new Date(prompt("Ingrese la nueva fecha de vencimiento (YYYY-MM-DD):"));
            const nuevoStock = parseInt(prompt("Ingrese la nueva cantidad en stock:"));
            const nuevoValor = parseFloat(prompt("Ingrese el nuevo valor del artículo:"));

            if (!nuevoArticulo || !nuevoDetalle || isNaN(nuevoVencimiento.getTime()) || isNaN(nuevoStock) || isNaN(nuevoValor)) {
                console.log("Todos los campos deben ser completados correctamente.");
                return;
            }

            this.productos[index].articulo = nuevoArticulo;
            this.productos[index].detalle = nuevoDetalle;
            this.productos[index].vencimiento = nuevoVencimiento;
            this.productos[index].stock = nuevoStock;
            this.productos[index].valor = nuevoValor;

            this.saveDataToFile();
            console.log(`Se ha modificado el producto con código ${codeToModify}.`);
        } else {
            console.log(`No se encontró ningún producto con código ${codeToModify}.`);
        }
    }

    displayProducts() {
        console.log("Lista de productos:");
        this.productos.forEach(producto => {
            console.log(`Código: ${producto.code}, Artículo: ${producto.articulo}, Stock: ${producto.stock}`);
        });
    }
}

const tm01 = new ProductManager();

function menu() {
    console.log("1. Agregar Producto");
    console.log("2. Consultar Productos");
    console.log("3. Quitar Producto");
    console.log("4. Modificar Producto");
    console.log("5. Salir");
    const opcion = parseInt(prompt("Ingrese el número de la opción que desea realizar:"));

    switch (opcion) {
        case 1:
            tm01.addProduct();
            break;
        case 2:
            tm01.displayProducts();
            break;
        case 3:
            const codeToRemove = parseInt(prompt("Ingrese el código del producto que desea quitar:"));
            tm01.removeProduct(codeToRemove);
            break;
        case 4:
            const codeToModify = parseInt(prompt("Ingrese el código del producto que desea modificar:"));
            tm01.modifyProduct(codeToModify);
            break;
        case 5:
            console.log("¡Hasta luego!");
            return;
        default:
            console.log("Opción inválida. Por favor, ingrese una opción válida.");
    }

    menu();
}

menu();