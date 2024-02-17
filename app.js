const express = require("express");
const productManager = require('./product_manager');

const PORT = 3000;
const app = express();

const um = new productManager(); // Crear una instancia de ProductManager

app.get("/productos", async (req, res) => {
    let { limit, skip } = req.query;

    let resultado = um.productos; // Utilizar um.productos en lugar de solo productos

    // Convertir skip y limit a números enteros
    skip = parseInt(skip);
    limit = parseInt(limit);
    
    // Verificar si se proporcionaron valores válidos para skip y limit
    if (!isNaN(skip) && skip > 0) {
        resultado = resultado.slice(skip);
    }

    if (!isNaN(limit) && limit > 0) {
        resultado = resultado.slice(0, limit);
    }

    // Generar la respuesta con los productos
    const respuesta = resultado.map(producto => {
        return `<p>Artículo: ${producto.articulo}, Detalle: ${producto.detalle}, Vencimiento: ${producto.vencimiento}, Stock: ${producto.stock}, Valor: ${producto.valor}</p>`;
    }).join('');
    
    // Enviar los resultados como una respuesta de texto
    res.send(respuesta);
});

app.get("/bienvenido", (req, res) => {
    res.send(`<h2 style="color: blue;">Server básico con Express...!!!</h2>`);
});

app.listen(PORT, () => {
    console.log(`Server OK en puerto ${PORT}`);
});
