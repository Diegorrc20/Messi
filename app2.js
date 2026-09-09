document.addEventListener("DOMContentLoaded", function () {
  var formLogin = document.getElementById("form-login");
  var seccionPublica = document.getElementById("seccion-publica");
  var panelAdmin = document.getElementById("panel-admin");
  var btnCerrar = document.getElementById("btn-cerrar");
  var cuerpoTabla = document.getElementById("cuerpo-tabla");

  var errorUsuario = document.getElementById("error-usuario");
  var errorClave = document.getElementById("error-clave");

  // Estado inicial: Comprobar si hay sesión activa
  if (localStorage.getItem("sesionIniciada") === "true") {
    if (seccionPublica) seccionPublica.style.display = "none";
    if (panelAdmin) panelAdmin.style.display = "block";
    mostrarDatos();
  } else {
    // Si no hay sesión, aseguramos ocultar el panel admin
    if (panelAdmin) panelAdmin.style.display = "none";
    if (seccionPublica) seccionPublica.style.display = "block";
  }

  // Evento de Login
  if (formLogin) {
    formLogin.addEventListener("submit", function (e) {
      e.preventDefault();

      var user = document.getElementById("usuario").value.trim();
      var pass = document.getElementById("clave").value.trim();

      if (errorUsuario) {
        errorUsuario.style.display = "none";
        errorUsuario.textContent = "";
      }
      if (errorClave) {
        errorClave.style.display = "none";
        errorClave.textContent = "";
      }

      // Validaciones de campos vacíos
      if (user === "") {
        if (errorUsuario) {
          errorUsuario.textContent = "Por favor, ingresa tu usuario o nombre.";
          errorUsuario.style.display = "block";
        }
        return;
      }

      if (pass === "") {
        if (errorClave) {
          errorClave.textContent = "Por favor, ingresa la contraseña.";
          errorClave.style.display = "block";
        }
        return;
      }

      // Permite cualquier nombre, solo exige que la clave sea "1234"
      if (pass !== "1234") {
        if (errorClave) {
          errorClave.textContent = "Contraseña incorrecta.";
          errorClave.style.display = "block";
        }
      } else {
        // Credenciales correctas
        localStorage.setItem("sesionIniciada", "true");
        localStorage.setItem("nombreUsuario", user);

        if (seccionPublica) seccionPublica.style.display = "none";
        if (panelAdmin) panelAdmin.style.display = "block";
        mostrarDatos();
      }
    });
  }

  // Leer LocalStorage y llenar la tabla
  function mostrarDatos() {
    if (!cuerpoTabla) return;

    cuerpoTabla.innerHTML = "";
    var hayCompras = false;

    for (var i = 0; i < localStorage.length; i++) {
      var clave = localStorage.key(i);

      // Ignorar las claves de control para no mostrarlas como compras
      if (clave !== "sesionIniciada" && clave !== "nombreUsuario") {
        var valor = localStorage.getItem(clave);
        hayCompras = true;

        var fila = document.createElement("tr");

        var colClave = document.createElement("td");
        colClave.textContent = clave;

        var colValor = document.createElement("td");
        colValor.textContent = valor;

        fila.appendChild(colClave);
        fila.appendChild(colValor);
        cuerpoTabla.appendChild(fila);
      }
    }

    if (!hayCompras) {
      cuerpoTabla.innerHTML =
        "<tr><td colspan='2' style='text-align: center;'>No hay reservas ni compras registradas actualmente.</td></tr>";
    }
  }

  // Cerrar Sesión
  if (btnCerrar) {
    btnCerrar.addEventListener("click", function () {
      localStorage.removeItem("sesionIniciada");
      localStorage.removeItem("nombreUsuario");
      if (panelAdmin) panelAdmin.style.display = "none";
      if (seccionPublica) seccionPublica.style.display = "block";
      if (formLogin) formLogin.reset();
    });
  }
});