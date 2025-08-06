
function addProduct(nombre, precio) {
    //Aquí [] es un array vacío, lo que asegura que siempre se tenga una lista con la que trabajar, 
    // incluso si el carrito todavía no existe en localStorage.
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    // Buscar si el producto ya existe, p => p.nombre === nombre es una función al vuelo
    // en ella se compara que el nombre del producto a agregar sea igual que el del carrito
    let product = carrito.find(p => p.nombre === nombre);
    if (product) {
        product.cantidad += 1;
    } else {
        carrito.push({ nombre, precio, cantidad: 1 });
    }
    localStorage.setItem("carrito", JSON.stringify(carrito));
}


function removeProduct(nombre) {
    // 1. Recuperar carrito
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    // 2. Filtrar quitando el producto
    carrito = carrito.filter(p => p.nombre !== nombre);

    // 3. Guardar de nuevo
    localStorage.setItem("carrito", JSON.stringify(carrito));

    console.log(`Producto "${nombre}" eliminado del carrito.`);
}


function aumentarCantidad(nombre) {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    let producto = carrito.find(p => p.nombre === nombre);

    if (producto) {
        producto.cantidad += 1;
        localStorage.setItem("carrito", JSON.stringify(carrito));
        console.log(`Cantidad de "${nombre}" aumentada a ${producto.cantidad}`);
    }
}


function disminuirCantidad(nombre) {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    let producto = carrito.find(p => p.nombre === nombre);

    if (producto) {
        producto.cantidad -= 1;
        if (producto.cantidad <= 0) {
            carrito = carrito.filter(p => p.nombre !== nombre);
            console.log(`"${nombre}" eliminado del carrito`);
        }
        localStorage.setItem("carrito", JSON.stringify(carrito));
    }
}

