<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Registro - Audio Traveler</title>
    <link rel="stylesheet" href="styles.css">
</head>

<body class="no-reproductor">
    <div id="universe"></div>

    <header>
        <nav>
            <div class="logo">
                <a href="index.html">
                    <h1>Audio Traveler</h1>
                </a>
            </div>
            <div class="nav-links">
                <a href="index.html" class="btn-nav">Inicio</a>
                <a href="registro.html" class="btn-nav">Registrarse</a>
                <a href="inicio.html" class="btn-cerrar">Iniciar sesión</a>
            </div>
        </nav>
    </header>

    <main class="main-form">
        <section class="registro-layout">
            <div class="registro-texto">
                <h2>Crear una cuenta</h2>
                <p>Únete a Audio Traveler y explora miles de estaciones de radio alrededor del mundo.</p>
            </div>
            <div class="form-container">
                <!-- aparecen los mensajes de error/éxito -->
                <div id="mensaje" style="display:none; padding:10px; border-radius:8px; margin-bottom:15px; text-align:center; font-size:14px;"></div>
                <div class="form-grupo">
                    <label>Nombre</label>
                    <input type="text" id="username" placeholder="Tu nombre de usuario">
                </div>
                <!--div class="form-grupo">
                    <label>Apellidos</label>
                    <input type="text" id="correo" placeholder="Tus apellidos">
                </div>
                <div class="form-grupo">
                    <label>Fecha de nacimiento</label>
                    <input type="date" id="cumple">
                </div-->
                <div class="form-grupo">
                    <label>Correo electrónico</label>
                    <input type="email" id="correo" placeholder="correo@ejemplo.com">
                </div>
                <div class="form-grupo">
                    <label>Contraseña</label>
                    <input type="password" id="contrasena" placeholder="••••••••">
                </div>
                <div class="form-grupo">
                    <label>Confirmar contraseña</label>
                    <input type="password" id="confirmar" placeholder="••••••••">
                </div>
                <button class="btn" id="btnRegistro" style="width:100%;text-align:center;display:block;margin-top:8px;padding:12px;">Crear cuenta</button>
                <p class="form-link">¿Ya tienes cuenta? <a href="inicio.html">Inicia sesión</a></p>
            </div>
        </section>
    </main>

    <footer>
        <div class="footer-inner">
            <p class="footer-copy">&copy; 2026 Audio Traveler. Todos los derechos reservados.</p>
            <div class="footer-team">
                <span class="footer-team-label">Equipo:</span>
                <div class="footer-team-names">
                    <span>Karla Yaneth Cruz Sandoval</span>
                    <span>Arturo Huerta Maldonado</span>
                    <span>Josue Francisco Hernández Iturbide</span>
                    <span>Abisai Tapia Ulloa</span>
                    <span>Gael Askary Razo Montañez</span>
                </div>
            </div>
        </div>
    </footer>

    <script src="estrellas.js"></script>

    <script>
        // Enter en cualquier campo del registro
        ['username', 'correo', 'contrasena', 'confirmar'].forEach(id => {
            const el = document.getElementById(id);
            if (el) el.addEventListener('keydown', function(e) {
                if (e.key === 'Enter') document.getElementById('btnRegistro').click();
            });
        });

        document.getElementById("btnRegistro").addEventListener("click", async () => {
            const username   = document.getElementById("username").value.trim();
            const correo     = document.getElementById("correo").value.trim();
            const contrasena = document.getElementById("contrasena").value.trim();
            const confirmar  = document.getElementById("confirmar").value.trim();
 
            if (!username || !correo || !contrasena || !confirmar) {
                mostrarMensaje("Por favor completa todos los campos.", "error");
                return;
            }
 
            try {
                const res  = await fetch("backend/registro.php", {
                    method:  "POST",
                    headers: { "Content-Type": "application/json" },
                    body:    JSON.stringify({ username, correo, contrasena, confirmar })
                });
                const data = await res.json();
 
                if (data.ok) {
                    mostrarMensaje(data.mensaje, "exito");
                    setTimeout(() => window.location.href = "inicio.html", 1500);
                } else {
                    mostrarMensaje(data.mensaje, "error");
                }
            } catch (err) {
                mostrarMensaje("No se pudo conectar con el servidor.", "error");
            }
        });
 
        function mostrarMensaje(texto, tipo) {
            const box = document.getElementById("mensaje");
            box.textContent = texto;
            box.style.display = "block";
            box.style.background = tipo === "exito" ? "#1cf00c33" : "#ff444433";
            box.style.color      = tipo === "exito" ? "#1cf00c"   : "#ff6666";
            box.style.border     = `1px solid ${tipo === "exito" ? "#1cf00c" : "#ff4444"}`;
        }
    </script>
</body>

</html>