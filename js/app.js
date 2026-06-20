let usuarioVerificado = false;
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

    if (
        data.error &&
        data.error.includes("ya existe")
    ) {

        alert(
            "Este usuario ya existe. Si ya tenés un servicio activo, utilizá la opción RENOVAR."
        );

    } else {

        alert(
            data.error ||
            "Error al crear la preferencia de pago."
        );

    }

    return;
}

window.location.href = data.init_point;

        window.location.href = data.init_point;

    } catch (error) {

        console.error(error);

        alert(
            "Error de conexión con VPS ARG."
        );

    }

});

function abrirRenovacion() {

    document.getElementById(
        "modalRenovacion"
    ).style.display = "block";

}

function cerrarRenovacion() {

    document.getElementById(
        "modalRenovacion"
    ).style.display = "none";

    document.getElementById(
        "btnBuscarUsuario"
    ).style.display = "block";

    document.getElementById(
        "btnBuscarUsuario"
    ).innerHTML =
        "Verificar Usuario";

    document.getElementById(
        "btnBuscarUsuario"
    ).disabled = false;

    document.getElementById(
        "infoUsuario"
    ).innerHTML = "";

    usuarioVerificado = false;
document.getElementById(
    "usuarioRenovar"
).value = "";

document.getElementById(
    "emailRenovar"
).value = "";
document.getElementById(
    "btnBuscarUsuario"
).innerHTML = "Verificar Usuario";

document.getElementById(
    "btnBuscarUsuario"
).disabled = false;

document.getElementById(
    "btnBuscarUsuario"
).style.background = "";
}

document
.getElementById("formRenovacion")
.addEventListener(
    "submit",
    async function(e) {

        e.preventDefault();
if (!usuarioVerificado) {

    alert(
        "Primero verificá el usuario."
    );

    return;

}
        const usuario =
            document.getElementById(
                "usuarioRenovar"
            ).value.trim();
        const usuarioInput = document.getElementById("usuario");

if (usuarioInput) {
    usuarioInput.addEventListener("input", function() {
        if (this.value.length > 0) {
            this.value =
                this.value.charAt(0).toLowerCase() +
                this.value.slice(1);
        }
    });
}

        const email =
            document.getElementById(
                "emailRenovar"
            ).value.trim();

        try {

            const respuesta =
                await fetch(
                    "https://api.vpsarg.com.ar/crear-preferencia-renovacion",
                    {
                        method: "POST",
                        headers: {
                            "Content-Type":
                                "application/json"
                        },
                        body: JSON.stringify({
                            usuario_servex: usuario,
                            email: email
                        })
                    }
                );

            const data =
                await respuesta.json();

            if (!data.ok) {

                alert(
                    "No se pudo crear la renovación."
                );

                return;

            }

            window.location.href =
                data.init_point;

        } catch (error) {

            console.error(error);

            alert(
                "Error al crear la renovación."
            );

        }

    }
);
document
.getElementById("btnBuscarUsuario")
.addEventListener(
    "click",
    async function() {

        const usuario =
            document.getElementById(
                "usuarioRenovar"
            ).value.trim();

        if (!usuario) {

            alert(
                "Ingresá un usuario."
            );

            return;

        }

        const info =
            document.getElementById(
                "infoUsuario"
            );

        info.innerHTML =
            "Buscando usuario...";

        try {

            const respuesta =
                await fetch(
                    "https://api.vpsarg.com.ar/buscar-usuario",
                    {
                        method: "POST",
                        headers: {
                            "Content-Type":
                                "application/json"
                        },
                        body: JSON.stringify({
                            usuario
                        })
                    }
                );

            const data =
                await respuesta.json();

            if (!data.ok) {

                usuarioVerificado = false;

                document.getElementById(
                    "btnBuscarUsuario"
                ).innerHTML =
                    "✗ Usuario no encontrado";

                document.getElementById(
                    "btnBuscarUsuario"
                ).style.background =
                    "#dc2626";

                document.getElementById(
                    "btnBuscarUsuario"
                ).style.color =
                    "#fff";

                info.innerHTML = `
                    <div class="usuario-error">
                        <p>
                        Puede que después de 72 hs
                        de vencido su usuario haya sido
                        eliminado del sistema.

                        Genere o compre un nuevo usuario.
                        </p>
                    </div>
                `;

                return;

            }

            usuarioVerificado = true;

            document.getElementById(
                "btnBuscarUsuario"
            ).innerHTML =
                "✓ Usuario Verificado";

            document.getElementById(
                "btnBuscarUsuario"
            ).disabled = true;

            document.getElementById(
                "btnBuscarUsuario"
            ).style.background =
                "#22c55e";

            document.getElementById(
                "btnBuscarUsuario"
            ).style.color =
                "#fff";
            const diasRestantes = Math.ceil(
                (new Date(data.vence) - new Date()) / 86400000
            );

            info.innerHTML = `
                <div class="usuario-encontrado">

                <h3 style="color:${diasRestantes < 0 ? '#ff4d4d' : '#22c55e'}">
${diasRestantes < 0 ? '❌ Usuario vencido' : '✅ Usuario verificado'}
</h3>

                <p>
                Plan:
                ${
                data.observacion === "IPHONE"
                ? "IPHONE PREMIUM"
                : data.categoria.includes("Gamers")
                ? "GAMERS PREMIUM"
                : "SS PREMIUM"
                }
                </p>

                <p>
                Renovación:
                $${data.precio.toLocaleString("es-AR")}
                </p>

                <p>
                Conexiones:
                ${data.conexiones}
                </p>

                <p>
                Vence:
                ${new Date(data.vence).toLocaleDateString()}
                </p>

                <p>
Restan:
${diasRestantes < 0 ? 'Vencido' : diasRestantes + ' días'}
</p>


                </div>
            `;

        } catch (error) {

            console.error(error);

            info.innerHTML =
                "<p>Error de conexión</p>";

        }

    }
);      
        

document.getElementById(
    "usuarioRenovar"
).addEventListener("input", () => {

    usuarioVerificado = false;

    document.getElementById(
        "infoUsuario"
    ).innerHTML = "";

    document.getElementById(
        "btnBuscarUsuario"
    ).innerHTML = "Verificar Usuario";

    document.getElementById(
        "btnBuscarUsuario"
    ).disabled = false;

    document.getElementById(
        "btnBuscarUsuario"
    ).style.background = "";

    document.getElementById(
        "btnBuscarUsuario"
    ).style.color = "";

});
function abrirModalRenovacion() {
    document.getElementById("modalRenovacion").style.display = "flex";
}
const themeToggle =
document.getElementById("themeToggle");

if (localStorage.getItem("theme") === "light") {

    document.body.classList.add("light-mode");
    themeToggle.innerHTML = "✦";


}

themeToggle.addEventListener("click", () => {

    document.body.classList.toggle("light-mode");

    if (
        document.body.classList.contains("light-mode")
    ) {

        localStorage.setItem(
            "theme",
            "light"
        );

        themeToggle.innerHTML = "✦";


    } else {

        localStorage.setItem(
            "theme",
            "dark"
        );

        themeToggle.innerHTML = "(";

    }

});