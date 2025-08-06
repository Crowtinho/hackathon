// 📦 Funciones auxiliares
function getCarrito() {
    return JSON.parse(localStorage.getItem("carrito")) || [];
}

function saveCarrito(carrito) {
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

function updateCarrito(carrito) {
    saveCarrito(carrito);
    mostrarProducts();
    mostrarTotal();
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

    updateCarrito(carrito);
}

// ❌ Eliminar producto
function removeProduct(nombre) {
    let carrito = getCarrito().filter(p => p.nombre !== nombre);
    updateCarrito(carrito);
    console.log(`Producto "${nombre}" eliminado del carrito.`);
}

// 🔼 Aumentar cantidad
function aumentarCantidad(nombre) {
    let carrito = getCarrito();
    let producto = carrito.find(p => p.nombre === nombre);

    if (producto) {
        producto.cantidad += 1;
        updateCarrito(carrito);
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
        updateCarrito(carrito);
    }
}

// 💰 Calcular total
function totalProducts() {
    let carrito = getCarrito();
    return carrito.reduce((suma, producto) =>
        suma + (producto.precio * producto.cantidad), 0
    );
}

// 📢 Mostrar total en la página
function mostrarTotal() {
    const totalElement = document.getElementById("total");
    if (totalElement) {
        totalElement.textContent = `$${totalProducts().toLocaleString()}`;
    }
}

// 🖥 Mostrar productos en el DOM
function mostrarProducts() {
    const contenedor = document.querySelector(".producto-lista");
    if (!contenedor) return;

    let carrito = getCarrito();
    contenedor.innerHTML = "";

    if (carrito.length === 0) {
        contenedor.innerHTML = "<p>No hay productos en el carrito.</p>";
        return;
    }

    carrito.forEach(producto => {
        const nueva = document.createElement("div");
        nueva.className = "producto-item";
        nueva.innerHTML = `
            <div class="producto-info">
                <h4>${producto.nombre}</h4>
                <div class="producto-precio">$${producto.precio.toLocaleString()}</div>
                <div class="cantidad-control">
                    <button onclick="disminuirCantidad('${producto.nombre}')">−</button>
                    <span>${producto.cantidad}</span>
                    <button onclick="aumentarCantidad('${producto.nombre}')">+</button>
                </div>
                <button class="eliminar" onclick="removeProduct('${producto.nombre}')">Eliminar</button>
            </div>
        `;
        contenedor.appendChild(nueva);
    });
}




// 🚀 Inicializar al cargar la página
document.addEventListener("DOMContentLoaded", () => {
    mostrarProducts();
    mostrarTotal();
});
