*Aqui para el JS de la pagina de nosotros*
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


*Para el JS de la pagina de servicios*
 if (contenedorObras) {
        var obras = [
            { id: 1, titulo: '"La Carta"', precio: "$14.000 CLP", imagen: "Imagenes/La carta.png" },
            { id: 2, titulo: '"El Huaso y la Lavandera"', precio: "$15.000 CLP", imagen: "Imagenes/El Huaso y la Lavandera.png" },
            { id: 3, titulo: '"La Perla del Mercader"', precio: "$12.000 CLP", imagen: "Imagenes/La Perla del Mercader.png" },
            { id: 4, titulo: '"El Viajero"', precio: "$11.000 CLP", imagen: "Imagenes/El Viajero.png" },
            { id: 5, titulo: '"La Generación del 13"', precio: "$18.500 CLP", imagen: "Imagenes/La Generación del 13.png" },
            { id: 6, titulo: '"El Zamacueca"', precio: "$16.200 CLP", imagen: "Imagenes/El Zamacueca.png" },
            { id: 7, titulo: '"Horizontes de Valparaíso"', precio: "$19.800 CLP", imagen: "Imagenes/Horizontes de Valparaíso.png" },
            { id: 8, titulo: '"Cordillera"', precio: "$22.500 CLP", imagen: "Imagenes/Cordillera.png" }
        ];

        contenedorObras.innerHTML = "";

        obras.forEach(function (obra) {
            var article = document.createElement("article");
            article.className = "tarjeta-galeria";
            article.innerHTML = `
                <div class="galeria-img-container">
                    <img src="${obra.imagen}" alt="${obra.titulo}" onerror="this.src='Imagenes/47b3852a-9059-4808-a445-7b7e8baf6868.png'">
                </div>
                <div class="galeria-info">
                    <p class="galeria-titulo">${obra.titulo}</p>
                    <div class="galeria-footer">
                        <span class="galeria-precio">${obra.precio}</span>
                    </div>
                </div>
            `;
            contenedorObras.appendChild(article);
        });
    }

    /* 2. LÓGICA DEL FORMULARIO Y PUJAS */
    var formOferta = document.getElementById("form-oferta");

    if (!localStorage.getItem("precioBaseActual")) {
        localStorage.setItem("precioBaseActual", "15000");
    }

    var precioBaseActual = Number(localStorage.getItem("precioBaseActual"));
    var precioTexto = document.getElementById("precio-base-texto");
    if (precioTexto) {
        precioTexto.textContent = "$" + precioBaseActual.toLocaleString("es-CL") + " CLP";
    }




* Aqui use la IA para hacer que la parte de las finanzas funcione en el JS*
 var inputCPC = document.getElementById("cpc").value.trim();
        var inputClics = document.getElementById("clics").value.trim();
        var inputTelefono = document.getElementById("telefono-contacto").value.trim();

        // Capturar elementos de error
        var errorCPC = document.getElementById("error-cpc");
        var errorClics = document.getElementById("error-clics");
        var errorTelefono = document.getElementById("error-telefono");
        var resultadoContenedor = document.getElementById("resultado-calculo");
        var advertenciaContenedor = document.getElementById("advertencia-presupuesto");

        // Limpiar mensajes anteriores
        errorCPC.style.display = "none";
        errorCPC.textContent = "";
        errorClics.style.display = "none";
        errorClics.textContent = "";
        errorTelefono.style.display = "none";
        errorTelefono.textContent = "";

        resultadoContenedor.textContent = "";
        advertenciaContenedor.style.display = "none";
        advertenciaContenedor.textContent = "";

        var hayError = false;

        // Validación Campo CPC
        if (inputCPC === "") {
            errorCPC.textContent = "El campo CPC no puede estar vacío.";
            errorCPC.style.display = "block";
            hayError = true;
            
        } else if (isNaN(inputCPC) || Number(inputCPC) <= 0) {
            errorCPC.textContent = "Ingresa un número válido para el CPC.";
            errorCPC.style.display = "block";
            hayError = true;
        }

        // Validación Campo Clics
        if (inputClics === "") {
            errorClics.textContent = "El campo de clics no puede estar vacío.";
            errorClics.style.display = "block";
            hayError = true;
        } else if (isNaN(inputClics) || Number(inputClics) <= 0) {
            errorClics.textContent = "Ingresa una cantidad numérica válida de clics.";
            errorClics.style.display = "block";
            hayError = true;
        }

        // Validación Campo Teléfono
        if (inputTelefono === "") {
            errorTelefono.textContent = "Por favor ingresa tu número de teléfono.";
            errorTelefono.style.display = "block";
            hayError = true;
        } else if (isNaN(inputTelefono)) {
            errorTelefono.textContent = "El teléfono solo debe contener números (sin letras).";
            errorTelefono.style.display = "block";
            hayError = true;
        }

        // Detener si hay errores
        if (hayError) return;

        // Operación matemática: Costo de Marketing
        var cpcVal = Number(inputCPC);
        var clicsVal = Number(inputClics);
        var costoTotal = cpcVal * clicsVal;

        // Inyección del resultado en pantalla especificando Google Ads
        resultadoContenedor.textContent = "Presupuesto estimado de Google Ads: $" + costoTotal.toLocaleString("es-CL") + " CLP";

        // Alerta Amarilla si supera los $50.000
        if (costoTotal > 50000) {
            advertenciaContenedor.textContent = "El presupuesto mensual de Google Ads ($" + costoTotal.toLocaleString("es-CL") + " CLP) supera el límite sugerido de $50.000 CLP.";
            advertenciaContenedor.style.display = "block";
        }
    });
});
