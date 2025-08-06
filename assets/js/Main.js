// 📦 Funciones auxiliares
function getCarrito() {
    return JSON.parse(localStorage.getItem("carrito")) || [];
}

function saveCarrito(carrito) {
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

// ➕ Agregar producto
function addProduct(nombre, precio) {
    let carrito = getCarrito();

    let product = carrito.find(p => p.nombre === nombre);
    if (product) {
        product.cantidad += 1;
    } else {
        carrito.push({ nombre, precio, cantidad: 1 });
    }

    saveCarrito(carrito);
}

// ❌ Eliminar producto
function removeProduct(nombre) {
    let carrito = getCarrito();
    carrito = carrito.filter(p => p.nombre !== nombre);
    saveCarrito(carrito);
    console.log(`Producto "${nombre}" eliminado del carrito.`);
}

// 🔼 Aumentar cantidad
function aumentarCantidad(nombre) {
    let carrito = getCarrito();
    let producto = carrito.find(p => p.nombre === nombre);

    if (producto) {
        producto.cantidad += 1;
        saveCarrito(carrito);
        console.log(`Cantidad de "${nombre}" aumentada a ${producto.cantidad}`);
    }
}

// 🔽 Disminuir cantidad
function disminuirCantidad(nombre) {
    let carrito = getCarrito();
    let producto = carrito.find(p => p.nombre === nombre);

    if (producto) {
        producto.cantidad -= 1;
        if (producto.cantidad <= 0) {
            carrito = carrito.filter(p => p.nombre !== nombre);
            console.log(`"${nombre}" eliminado del carrito`);
        }
        saveCarrito(carrito);
    }
}

// 💰 Calcular total
function totalProducts() {
    let carrito = getCarrito();
    let total = carrito.reduce((suma, producto) => 
        suma + (producto.precio * producto.cantidad), 0
    );
    return total;
}

// 📢 Mostrar total en la página
function mostrarTotal() {
    const totalElement = document.getElementById("total");
    if (totalElement) {
        totalElement.textContent = totalProducts();
    }
}
