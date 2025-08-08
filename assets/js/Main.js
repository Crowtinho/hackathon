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
    countProducts();
}

// ➕ Agregar producto
function addProduct(nombre, precio , imagen) {
    let carrito = getCarrito();
    let product = carrito.find(p => p.nombre === nombre);

    if (product) {
        product.cantidad += 1;
    } else {
        carrito.push({ nombre, precio,imagen, cantidad: 1 });
    }

    updateCarrito(carrito);
    Swal.fire({
        position: "center",
        icon: "success",
        title: `${nombre} agregado con éxito`,
        showConfirmButton: false,
        timer: 1000
    });
}

// ❌ Eliminar producto
function removeProduct(nombre) {
    Swal.fire({
        title: "¿Estás seguro?",
        text: `Vas a eliminar ${nombre} de tu carrito`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        cancelButtonText: "Cancelar",
        confirmButtonText: "Sí, eliminar"
        }).then((result) => {
        if (result.isConfirmed) {
            let carrito = getCarrito().filter(p => p.nombre !== nombre);
            updateCarrito(carrito);
            Swal.fire({
            title: "Eliminado",
            text: `Has eliminado ${nombre} de tu carrito`,
            icon: "success"
            });
        }
    });
}

// 🔼 Aumentar cantidad
function aumentarCantidad(nombre) {
    let carrito = getCarrito();
    let producto = carrito.find(p => p.nombre === nombre);

    if (producto) {
        producto.cantidad += 1;
        updateCarrito(carrito);
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
        totalElement.textContent = `${formatearPrecio(totalProducts())}`;
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
            <img src="${producto.imagen}" alt="${producto.nombre}" class="producto-img">
            <div class="producto-info">
                <h4>${producto.nombre}</h4>
                <div class="producto-precio">${formatearPrecio(producto.precio.toLocaleString())}</div>
                <div class="cantidad-control">
                    <button onclick="disminuirCantidad('${producto.nombre}')">−</button>
                    <span>${producto.cantidad}</span>
                    <button onclick="aumentarCantidad('${producto.nombre}')">+</button>
                </div>
                <button class="btn btn-sm btn-danger mt-2" onclick="removeProduct('${producto.nombre}')">Eliminar</button>
            </div>
        `;
        contenedor.appendChild(nueva);
    });
}

function formatearPrecio(valor) {
    return Number(valor).toLocaleString("es-CO", {
        style: "currency",
        currency: "COP",
        minimumFractionDigits: 0
    });
}

function countProducts() {
    let total = 0;
    let carrito = getCarrito();
    const elementosContador = document.querySelectorAll(".count-products");

    for (let i = 0; i < carrito.length; i++) {
        total += carrito[i].cantidad;
    }

    elementosContador.forEach(el => {
        el.textContent = `${total}`;
    });
}

function cleanForm(){
    const form = document.getElementById('contactForm');
    form.addEventListener('submit', function(event) {
    // Permite que se envíe el formulario
    setTimeout(() => form.reset(), 100); // Da tiempo a Formspree para procesar
  });
}


function generarFacturaHTML(nombreCliente = "Cliente") {
    const carrito = getCarrito();
    if (carrito.length === 0) {
        return "<p>No hay productos en el carrito.</p>";

    }else{
    const fecha = new Date().toLocaleDateString();
    const numeroFactura = Math.floor(Math.random() * 900000 + 100000); // entre 100000 y 999999
    let total = 0;

    const filas = carrito.map(p => {
        const subtotal = p.precio * p.cantidad;
        total += subtotal;
        return `
            <tr>
                <td style="padding: 8px; border: 1px solid #ccc;">${p.nombre}</td>
                <td style="padding: 8px; border: 1px solid #ccc; text-align: center;">${p.cantidad}</td>
                <td style="padding: 8px; border: 1px solid #ccc; text-align: right;">$${p.precio.toLocaleString()}</td>
                <td style="padding: 8px; border: 1px solid #ccc; text-align: right;">$${(p.precio * p.cantidad).toLocaleString()}</td>
            </tr>
        `;
    }).join("");

    return `
        <div style="font-family: Arial, sans-serif; padding: 16px;">
            <h2 style="text-align: center;">Factura de Compra</h2>
            <p><strong>Cliente:</strong> ${nombreCliente}</p>
            <p><strong>Fecha:</strong> ${fecha}</p>
            <p><strong>Factura N.º:</strong> ${numeroFactura}</p>

            <table style="width: 100%; border-collapse: collapse; margin-top: 16px;">
                <thead>
                    <tr>
                        <th style="padding: 8px; border: 1px solid #ccc; background: #f0f0f0;">Producto</th>
                        <th style="padding: 8px; border: 1px solid #ccc; background: #f0f0f0;">Cantidad</th>
                        <th style="padding: 8px; border: 1px solid #ccc; background: #f0f0f0;">Precio</th>
                        <th style="padding: 8px; border: 1px solid #ccc; background: #f0f0f0;">Subtotal</th>
                    </tr>
                </thead>
                <tbody>
                    ${filas}
                </tbody>
                <tfoot>
                    <tr>
                        <td colspan="3" style="padding: 8px; border: 1px solid #ccc; text-align: right;"><strong>Total:</strong></td>
                        <td style="padding: 8px; border: 1px solid #ccc; text-align: right;"><strong>$${total.toLocaleString()}</strong></td>
                    </tr>
                </tfoot>
            </table>

            <p style="margin-top: 24px; text-align: center;">Gracias por su compra. Esperamos verlo pronto 😊</p>
        </div>
    `;
}
}

// ✉️ Enviar factura por Email usando EmailJS
function enviarFacturaPorEmail(nombreCliente = "Cliente") {


    let carrito = getCarrito();
    if (carrito.length !== 0) {

        const htmlFactura = generarFacturaHTML(nombreCliente);
        Swal.fire({
            title: "Deseas realizar la compra?",
            text: "",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#43d630ff",
            cancelButtonColor: "#d33",
            confirmButtonText: "Sí, comprar"
            }).then((result) => {


                if (result.isConfirmed) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Compra realizada co éxito con éxito',
                        showConfirmButton: false,
                        timer: 2000
                    });

                    emailjs.send('service_o1mlg1b', 'template_6a92hg4', {
                    cliente: nombreCliente,
                    mensaje_html: htmlFactura
                    }).then(() => {

                        Swal.fire({
                            icon: 'success',
                            title: 'Factura enviada con éxito',
                            showConfirmButton: false,
                            timer: 2000
                        });
                        localStorage.setItem("carrito", JSON.stringify([]));
                        carrito = getCarrito();
                        updateCarrito(carrito);
                        // carrito = localStorage.setItem("carrito", JSON.stringify([])); // si era un array
                        // updateCarrito(carrito)
                        }).catch((error) => {
                            console.error("❌ Error al enviar factura:", error);
                                Swal.fire({
                                    icon: 'error',
                                    title: 'Error al enviar',
                                    text: 'No se pudo enviar la factura. Intenta más tarde.',
                                });
                        });
                }
            });

    }else{
        Swal.fire({
                icon: "error",
                title: "Oops tú carrito está vacio",
                text: "Aún no agregas productos al carrito de compras",
                // footer: '<a href="#">Why do I have this issue?</a>'
        })
    }

}

document.addEventListener("DOMContentLoaded", function () {
    cleanForm()
});








