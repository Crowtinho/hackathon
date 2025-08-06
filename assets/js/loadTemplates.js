function loadTemplate(id, url) {
    fetch(url)
        .then(response => response.text())
        .then(data => {
            document.getElementById(id).innerHTML = data;
        })
        .catch(err => console.error(`Error cargando ${url}:`, err));
}

// Cargar plantillas
loadTemplate("navbar", "components/navbar.html");
loadTemplate("header", "components/header.html");
loadTemplate("footer", "components/footer.html");
loadTemplate("contact", "components/contact.html");
loadTemplate("hero", "components/hero.html");
loadTemplate("hero2", "components/hero.html");
loadTemplate("products", "components/products.html");