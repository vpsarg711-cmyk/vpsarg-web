let planSeleccionado = null;

function comprarSS() {

    document.getElementById("formCompra").reset();

planSeleccionado = "ss";

actualizarConexiones("SS");
actualizarPrecio();
document.getElementById("modalCompra").style.display = "block";


}

function comprarGamers() {

    document.getElementById("formCompra").reset();

planSeleccionado = "gamers";

actualizarConexiones("GAMERS");

actualizarPrecio();
document.getElementById("modalCompra").style.display = "block";


}

function comprarIphone() {

    document.getElementById("formCompra").reset();


planSeleccionado = "iphone";

actualizarConexiones("IPHONE");
actualizarPrecio();
document.getElementById("modalCompra").style.display = "block";


}

function actualizarConexiones(servicio) {


const select = document.getElementById("conexiones");

select.innerHTML = "";

if (servicio === "IPHONE") {

    select.innerHTML += '<option value="1">1 conexión</option>';
    select.innerHTML += '<option value="2">2 conexiones</option>';

} else {

    select.innerHTML += '<option value="1">1 conexión</option>';
    select.innerHTML += '<option value="2">2 conexiones</option>';
    select.innerHTML += '<option value="3">3 conexiones</option>';

}

select.value = "1";


}


function cerrarModal() {

    document.getElementById("modalCompra").style.display = "none";

}

document.getElementById("usuario").addEventListener("input", function() {

    this.value = this.value
        .toLowerCase()
        .replace(/\s/g, "")
        .replace(/[^a-z0-9]/g, "");

});
document.getElementById("whatsapp").addEventListener("input", function() {

    this.value = this.value.replace(/\D/g, "");

});


function generarPassword() {

    const caracteres =
        "abcdefghijklmnopqrstuvwxyz0123456789";

    let password = "";

    for (let i = 0; i < 8; i++) {

        password += caracteres.charAt(
            Math.floor(Math.random() * caracteres.length)
        );

    }

    return password;

}

function obtenerPrecio(plan, conexiones) {


if (plan === "ss") {

    if (conexiones == 1) return 8000;
    if (conexiones == 2) return 14000;
    if (conexiones == 3) return 18000;

}

if (plan === "gamers") {

    if (conexiones == 1) return 10000;
    if (conexiones == 2) return 16000;
    if (conexiones == 3) return 20000;

}

if (plan === "iphone") {

    if (conexiones == 1) return 12000;
    if (conexiones == 2) return 20000;

}

return 0;


}

function obtenerCategoria(plan) {


if (plan === "ss") return 916;

return 946;


}
function actualizarPrecio() {

    const conexiones =
        parseInt(
            document.getElementById("conexiones").value
        );

    const precio =
        obtenerPrecio(
            planSeleccionado,
            conexiones
        );

    document.getElementById(
        "precioSeleccionado"
    ).innerText =
        "Precio: $" + precio.toLocaleString("es-AR");

}
document
.getElementById("conexiones")
.addEventListener("change", actualizarPrecio);

document
document
.getElementById("formCompra")
.addEventListener("submit", async function(e) {

    e.preventDefault();

    const nombre =
        document.getElementById("nombre").value.trim();

    const whatsapp =
        document.getElementById("whatsapp").value.trim();

    const usuario =
        document.getElementById("usuario").value.trim();

    const email =
        document.getElementById("email").value.trim();

    const conexiones =
        parseInt(
            document.getElementById("conexiones").value
        );

    if (nombre.length < 3) {
        alert("Ingrese su nombre completo");
        return;
    }

    if (whatsapp.length < 10) {
        alert("Ingrese un WhatsApp válido");
        return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
        alert("Ingrese un correo electrónico válido");
        return;
    }

    const regex = /^[a-z0-9]{6,8}$/;

    if (!regex.test(usuario)) {
        alert(
            "El usuario debe tener entre 6 y 8 caracteres, solo letras minúsculas y números."
        );
        return;
    }

    const password = generarPassword();

    const precio =
        obtenerPrecio(
            planSeleccionado,
            conexiones
        );

    const categoria =
        obtenerCategoria(
            planSeleccionado
        );

    try {

        const respuesta = await fetch(
            "https://api.vpsarg.com.ar/crear-preferencia",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    nombre,
                    whatsapp,
                    servicio: planSeleccionado,
                    usuario_servex: usuario,
                    password_servex: password,
                    email,
                    categoria,
                    conexiones,
                    precio
                })
            }
        );

        const data = await respuesta.json();

        if (!data.ok) {
            alert("Error al crear la preferencia de pago.");
            return;
        }

        window.location.href = data.init_point;

    } catch (error) {

        console.error(error);

        alert(
            "Error de conexión con VPS ARG."
        );

    }

});

