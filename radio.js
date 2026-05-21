<!DOCTYPE html>
<html lang="es">

<head>
    <script>
        if (!sessionStorage.getItem('at_logged')) {
            window.location.replace('inicio.html');
        }
    </script>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Jam - Audio Traveler</title>
    <link rel="stylesheet" href="styles.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">
</head>

<body class="jam-body no-reproductor">
    <div id="universe"></div>

    <header>
        <nav>
            <div class="logo">
                <a href="index.html">
                    <h1>Audio Traveler</h1>
                </a>
            </div>
            <div class="nav-links">
                <a href="usuarioLoggeado.html" class="btn-nav">Inicio</a>
                <a href="index.html" class="btn-cerrar">Cerrar Sesión</a>
            </div>
        </nav>
    </header>

    <main class="jam-main" style="overflow:visible;">

        <h2 class="jam-titulo">Jam de Usuario</h2>

        <div class="jam-botones">
            <button class="btn-jam" id="btnInvitar">Invitar</button>
            <button class="btn-jam btn-terminar">Terminar</button>
        </div>

        <div class="jam-reproductor">
            <div class="jam-info">
                <p class="jam-escuchando">Estás escuchando:</p>
                <h3 class="jam-estacion">Cargando estación...</h3>
                <p class="jam-lugar">...</p>
            </div>
            <div class="jam-controles">
                <button class="control-btn" id="btnAnterior"><i class="fas fa-backward-step"></i></button>
                <button class="control-btn" id="btnPlayPauseJam"><i class="fas fa-play"></i></button>
                <button class="control-btn" id="btnSiguiente"><i class="fas fa-forward-step"></i></button>
            </div>
        </div>

        <div class="jam-usuarios-container">
            <h4><i class="fas fa-users"></i> Escuchando ahora en esta sala</h4>
            <div id="listaUsuariosJam" class="jam-usuarios-lista">
                <span style="color: var(--text-muted); font-size: 13px;">Cargando exploradores...</span>
            </div>
        </div>

        <div id="searchWrapper" style="width:min(440px, 95vw);">
            <div class="barra-busqueda" style="margin:0;">
                <i class="fas fa-magnifying-glass" id="iconoBusqueda"></i>
                <input type="text" id="inputBusqueda" placeholder="Buscar ciudad, país o estación" autocomplete="off">
                <i class="fas fa-xmark" id="btnLimpiarBusqueda" style="cursor:pointer; display:none; color:var(--text-muted);"></i>
            </div>
        </div>

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

    <div class="panel-amigos" id="panelAmigos">
        <div class="panel-header">
            <h3>Amigos</h3>
            <button class="btn-cerrar-panel" id="cerrarAmigos">
                <i class="fas fa-xmark"></i>
            </button>
        </div>
        <div class="codigo-jam">
            <p>Código de sala:</p>
            <div class="codigo-contenedor">
                <span id="codigoSala">------</span>
                <button class="btn-copiar" id="btnCopiar"><i class="fas fa-copy"></i></button>
            </div>
            <button class="btn-generar" id="btnGenerar" style="display:none;">Generar código</button>
        </div>
        <div class="buscador-amigos">
            <i class="fas fa-magnifying-glass"></i>
            <input type="text" id="inputBuscarAmigo" placeholder="Filtrar mi lista...">
        </div>
        <h4 style="color:var(--text-muted); font-size:11px; text-transform:uppercase; margin-bottom:10px; letter-spacing:1px;">Mis Amigos</h4>
        <div class="lista-amigos" id="listaAmigos"></div>
    </div>

    <div class="modal-overlay" id="customModal">
        <div class="modal-caja">
            <h3 class="modal-titulo" id="modalTitulo">Aviso</h3>
            <p class="modal-texto" id="modalTexto">Mensaje</p>
            <div class="modal-botones">
                <button class="btn-modal btn-modal-ok" id="modalBtnOk">Entendido</button>
            </div>
        </div>
    </div>

    <script src="estrellas.js"></script>

    <script>
        // ── DATOS DE SESIÓN ──
        const jamNombre      = sessionStorage.getItem('jam_estacion_nombre');
        const jamUrlOriginal = sessionStorage.getItem('jam_estacion_url');
        const jamCodigo      = sessionStorage.getItem('jam_codigo');
        const jamLugar       = sessionStorage.getItem('jam_estacion_lugar') || 'Internacional';

        const jamUrl = (location.protocol === 'https:' && jamUrlOriginal && jamUrlOriginal.startsWith('http://'))
            ? jamUrlOriginal.replace('http://', 'https://')
            : jamUrlOriginal;

        if (!jamUrl) {
            alert('No te has unido a ninguna Jam válida.');
            window.location.replace('usuarioLoggeado.html');
        }

        document.querySelector('.jam-estacion').textContent = jamNombre;
        document.querySelector('.jam-lugar').textContent    = jamLugar;
        document.getElementById('codigoSala').textContent   = jamCodigo;

        // ── AUDIO GLOBAL ──
        window.audJam = new Audio(jamUrl);
        const btnPlayPauseJam = document.getElementById('btnPlayPauseJam');

        window.audJam.play().then(() => {
            btnPlayPauseJam.innerHTML = '<i class="fas fa-pause"></i>';
        }).catch(() => {
            btnPlayPauseJam.innerHTML = '<i class="fas fa-play"></i>';
        });

        btnPlayPauseJam.addEventListener('click', () => {
            if (window.audJam.paused) {
                window.audJam.play().catch(() => {});
                btnPlayPauseJam.innerHTML = '<i class="fas fa-pause"></i>';
            } else {
                window.audJam.pause();
                btnPlayPauseJam.innerHTML = '<i class="fas fa-play"></i>';
            }
        });

        // ── TERMINAR / SALIR ──
        document.querySelector('.btn-terminar').addEventListener('click', async () => {
            window.audJam.pause();
            const btn = document.querySelector('.btn-terminar');
            btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
            btn.disabled = true;
            const rol    = sessionStorage.getItem('jam_rol');
            const idJam  = sessionStorage.getItem('jam_id');
            const codigo = sessionStorage.getItem('jam_codigo');
            try {
                if (rol === 'Host' && idJam) {
                    await fetch('backend/jam.php?accion=terminar', {
                        credentials: 'include', method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ idJam })
                    });
                } else if (codigo) {
                    await fetch(`backend/jam.php?accion=salir&codigo=${codigo}`, { credentials: 'include' });
                }
            } catch (e) {}
            sessionStorage.removeItem('jam_rol');
            sessionStorage.removeItem('jam_id');
            sessionStorage.removeItem('jam_codigo');
            window.location.href = 'usuarioLoggeado.html';
        });

        // ── USUARIOS EN SALA ──
        async function actualizarUsuarios() {
            const codigo = sessionStorage.getItem('jam_codigo');
            if (!codigo) return;
            try {
                const res  = await fetch(`backend/jam.php?accion=usuarios&codigo=${codigo}`, { credentials: 'include' });
                const data = await res.json();
                if (data.ok) {
                    const c = document.getElementById('listaUsuariosJam');
                    c.innerHTML = '';
                    (data.usuarios || []).forEach(u => {
                        c.innerHTML += `<span class="jam-usuario-tag"><i class="fas fa-user"></i> @${u.Username}</span>`;
                    });
                }
            } catch (e) {}
        }
        actualizarUsuarios();
        setInterval(actualizarUsuarios, 4000);

        // Sincronización para Invitados: detectar si el Host cambió la estación
        if (sessionStorage.getItem('jam_rol') === 'Invitado') {
            window._streamActual = jamUrl;
            setInterval(async () => {
                const codigo = sessionStorage.getItem('jam_codigo');
                if (!codigo) return;
                try {
                    const res  = await fetch(`backend/jam.php?accion=stream&codigo=${codigo}`, { credentials: 'include' });
                    const data = await res.json();
                    if (!data.ok) return;
                    const nuevoUrl = (location.protocol === 'https:' && data.stream_url.startsWith('http://'))
                        ? data.stream_url.replace('http://', 'https://')
                        : data.stream_url;
                    if (nuevoUrl !== window._streamActual) {
                        window._streamActual = nuevoUrl;
                        window.audJam.src = nuevoUrl;
                        window.audJam.play().catch(() => {});
                        btnPlayPauseJam.innerHTML = '<i class="fas fa-pause"></i>';
                        document.querySelector('.jam-estacion').textContent = data.nombre;
                        document.querySelector('.jam-lugar').textContent    = data.lugar;
                    }
                } catch (e) {}
            }, 4000);
        }

        // ── HEARTBEAT ──
        const codigoActual = sessionStorage.getItem('jam_codigo');
        function heartbeat() {
            if (codigoActual)
                fetch(`backend/jam.php?accion=heartbeat&codigo=${codigoActual}`, { credentials: 'include' }).catch(() => {});
        }
        heartbeat();
        setInterval(heartbeat, 10000);

        window.addEventListener('beforeunload', () => {
            if (codigoActual && sessionStorage.getItem('jam_rol') === 'Invitado')
                navigator.sendBeacon(`backend/jam.php?accion=salir&codigo=${codigoActual}`);
        });

        // ── PANEL AMIGOS ──
        const panelAmigos      = document.getElementById('panelAmigos');
        const btnInvitar       = document.getElementById('btnInvitar');
        const contenedorAmigos = document.getElementById('listaAmigos');

        btnInvitar.addEventListener('click', e => { e.stopPropagation(); panelAmigos.classList.add('abierto'); cargarAmigos(); });
        document.getElementById('cerrarAmigos').addEventListener('click', () => panelAmigos.classList.remove('abierto'));
        document.addEventListener('click', e => {
            if (panelAmigos.classList.contains('abierto') && !panelAmigos.contains(e.target) && !btnInvitar.contains(e.target))
                panelAmigos.classList.remove('abierto');
        });

        document.getElementById('btnCopiar').addEventListener('click', function () {
            navigator.clipboard.writeText(document.getElementById('codigoSala').textContent);
            this.innerHTML = '<i class="fas fa-check"></i>';
            setTimeout(() => this.innerHTML = '<i class="fas fa-copy"></i>', 2000);
        });

        function showModal(msg) {
            document.getElementById('modalTitulo').textContent = 'Audio Traveler';
            document.getElementById('modalTexto').textContent  = msg;
            document.getElementById('customModal').classList.add('activo');
            document.getElementById('modalBtnOk').onclick = () => document.getElementById('customModal').classList.remove('activo');
        }
        window.alert = showModal;

        async function cargarAmigos() {
            contenedorAmigos.innerHTML = '<p style="text-align:center; color:var(--text-muted); font-size:12px;">Cargando amigos...</p>';
            try {
                const res  = await fetch('backend/amigos.php?accion=listar', { credentials: 'include' });
                const data = await res.json();
                contenedorAmigos.innerHTML = '';
                if (!data.ok || !data.amigos.length) {
                    contenedorAmigos.innerHTML = '<p style="text-align:center; color:var(--text-muted); font-size:13px;">No tienes amigos agregados aún.</p>';
                    return;
                }
                data.amigos.forEach(amigo => {
                    const item = document.createElement('div');
                    item.className = 'amigo-item';
                    item.innerHTML = `
                        <div class="lista-info">
                            <i class="fas fa-user-circle"></i>
                            <div><h3>@${amigo.AmigoNombre}</h3><p>Amigo</p></div>
                        </div>
                        <div class="lista-acciones">
                            <button class="control-btn btn-mandar-codigo" data-nombre="${amigo.AmigoNombre}" title="Enviar Invitación"><i class="fas fa-paper-plane"></i></button>
                        </div>`;
                    contenedorAmigos.appendChild(item);
                });
                document.querySelectorAll('.btn-mandar-codigo').forEach(btn => {
                    btn.addEventListener('click', async function () {
                        const amigoNombre = this.dataset.nombre;
                        this.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
                        try {
                            const res  = await fetch('backend/jam.php?accion=invitar', {
                                credentials: 'include', method: 'POST',
                                body: JSON.stringify({ codigo: jamCodigo, amigo: amigoNombre })
                            });
                            const data = await res.json();
                            showModal(data.ok ? `¡Invitación enviada a @${amigoNombre}! 🚀` : 'No se pudo enviar. Intenta de nuevo.');
                        } catch (e) { showModal('Error de red.'); }
                        this.innerHTML = '<i class="fas fa-paper-plane"></i>';
                    });
                });
            } catch (e) {
                contenedorAmigos.innerHTML = '<p style="color:#ff4444; font-size:12px;">Error de conexión.</p>';
            }
        }

        document.getElementById('inputBuscarAmigo').addEventListener('input', function () {
            const t = this.value.toLowerCase();
            document.querySelectorAll('.amigo-item').forEach(item => {
                item.style.display = item.querySelector('h3').textContent.toLowerCase().includes(t) ? 'flex' : 'none';
            });
        });

        document.querySelectorAll('a[href="index.html"].btn-cerrar').forEach(a => {
            a.addEventListener('click', e => {
                e.preventDefault();
                sessionStorage.removeItem('at_logged');
                sessionStorage.removeItem('at_user');
                window.location.href = 'index.html';
            });
        });

        // ── ANTERIOR / SIGUIENTE POR PAÍS ──
        const RADIO_API = 'https://de1.api.radio-browser.info/json';
        const PAISES = {
            "mexico":"MX","estados unidos":"US","usa":"US","united states":"US",
            "canada":"CA","argentina":"AR","brasil":"BR","brazil":"BR","colombia":"CO",
            "chile":"CL","peru":"PE","españa":"ES","spain":"ES","francia":"FR","france":"FR",
            "alemania":"DE","germany":"DE","italia":"IT","italy":"IT",
            "reino unido":"GB","united kingdom":"GB","japon":"JP","japan":"JP"
        };

        let historialJam = [{ nombre: jamNombre, url: jamUrl, lugar: jamLugar }];
        let indexActual  = 0;

        async function estacionAleatoriaPorPais(lugarTexto) {
            try {
                const norm   = lugarTexto.trim().toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
                const codigo = Object.entries(PAISES).find(([k]) => norm.includes(k))?.[1];
                const base   = 'limit=40&hidebroken=true&order=random';
                const url    = codigo
                    ? `${RADIO_API}/stations/bycountrycodeexact/${codigo}?${base}`
                    : `${RADIO_API}/stations/search?name=&${base}`;
                const lista   = await fetch(url).then(r => r.json());
                const validas = lista.filter(s => s.url_resolved);
                if (!validas.length) return null;
                return validas[Math.floor(Math.random() * validas.length)];
            } catch (e) { return null; }
        }

        function reproducirEstacion(est) {
            if (!est) return;
            const url = (location.protocol === 'https:' && est.url.startsWith('http://'))
                ? est.url.replace('http://', 'https://')
                : est.url;
            window.audJam.src = url;
            window.audJam.play().catch(() => {});
            btnPlayPauseJam.innerHTML = '<i class="fas fa-pause"></i>';
            document.querySelector('.jam-estacion').textContent = est.nombre;
            document.querySelector('.jam-lugar').textContent    = est.lugar;
            window._streamActual = url;
            fetch('backend/historial.php?accion=registrar', {
                credentials: 'include', method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ nombre: est.nombre, streamUrl: url, lugar: est.lugar })
            }).catch(() => {});
            // Si es Host, notificar el cambio a todos
            if (sessionStorage.getItem('jam_rol') === 'Host') {
                fetch('backend/jam.php?accion=cambiar', {
                    credentials: 'include', method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ codigo: jamCodigo, streamUrl: est.url, nombre: est.nombre, lugar: est.lugar })
                }).catch(() => {});
            }
        }

        document.getElementById('btnSiguiente').addEventListener('click', async () => {
            const btn = document.getElementById('btnSiguiente');
            btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
            if (indexActual < historialJam.length - 1) {
                indexActual++;
                reproducirEstacion(historialJam[indexActual]);
            } else {
                const lugarActual = document.querySelector('.jam-lugar').textContent || jamLugar;
                const nueva = await estacionAleatoriaPorPais(lugarActual);
                if (nueva) {
                    const est = { nombre: nueva.name, url: nueva.url_resolved, lugar: nueva.country || lugarActual };
                    historialJam.push(est);
                    indexActual = historialJam.length - 1;
                    reproducirEstacion(est);
                }
            }
            btn.innerHTML = '<i class="fas fa-forward-step"></i>';
        });

        document.getElementById('btnAnterior').addEventListener('click', () => {
            if (indexActual > 0) {
                indexActual--;
                reproducirEstacion(historialJam[indexActual]);
            }
        });

        // ── BUSCADOR DE EMISORAS ──
        const cajaBusqueda = document.createElement('div');
        cajaBusqueda.style.cssText = 'display:none; position:fixed; background:var(--bg-glass); backdrop-filter:blur(20px); -webkit-backdrop-filter:blur(20px); border:1px solid rgba(90,26,138,0.6); border-radius:16px; overflow:hidden; box-shadow:0 8px 32px rgba(0,0,0,0.4); z-index:99999; max-height:300px; overflow-y:auto;';
        document.body.appendChild(cajaBusqueda);

        const inputBusqueda = document.getElementById('inputBusqueda');
        const iconoBusq     = document.getElementById('iconoBusqueda');
        const btnLimpiar    = document.getElementById('btnLimpiarBusqueda');
        let timerBusqueda   = null;
        let ctrlBusqueda    = null;

        function posicionarDropdown() {
            const w = document.getElementById('searchWrapper');
            if (!w || cajaBusqueda.style.display === 'none') return;
            const r = w.getBoundingClientRect();
            cajaBusqueda.style.left  = r.left + 'px';
            cajaBusqueda.style.top   = (r.bottom + 6) + 'px';
            cajaBusqueda.style.width = r.width + 'px';
        }
        window.addEventListener('resize', posicionarDropdown);
        document.addEventListener('scroll', posicionarDropdown, true);

        function mostrarCarga() {
            cajaBusqueda.style.display = 'block';
            posicionarDropdown();
            cajaBusqueda.innerHTML = '<div style="padding:20px; text-align:center; color:var(--text-muted); font-size:13px;"><i class="fas fa-spinner fa-spin" style="margin-right:8px;"></i>Buscando emisoras...</div>';
            iconoBusq.className = 'fas fa-spinner fa-spin';
        }

        function ocultarResultados() {
            cajaBusqueda.style.display = 'none';
            cajaBusqueda.innerHTML = '';
            iconoBusq.className = 'fas fa-magnifying-glass';
        }

        function renderizarResultados(estaciones) {
            posicionarDropdown();
            iconoBusq.className = 'fas fa-magnifying-glass';
            if (!estaciones || !estaciones.length) {
                cajaBusqueda.innerHTML = '<div style="padding:20px; text-align:center; color:var(--text-muted); font-size:13px;"><i class="fas fa-radio" style="display:block; font-size:22px; margin-bottom:8px; opacity:0.4;"></i>No se encontraron emisoras</div>';
                return;
            }
            cajaBusqueda.innerHTML = '';
            estaciones.slice(0, 12).forEach((st, i) => {
                const pais   = st.country || 'Internacional';
                const ciudad = st.state ? `${st.state}, ${pais}` : pais;
                const item   = document.createElement('div');
                item.style.cssText = `display:flex; align-items:center; gap:12px; padding:12px 16px; cursor:pointer; border-bottom:${i < 11 ? '1px solid rgba(90,26,138,0.25)' : 'none'}; transition:background 0.15s;`;
                item.onmouseenter = () => item.style.background = 'rgba(255,255,255,0.06)';
                item.onmouseleave = () => item.style.background = 'transparent';
                item.innerHTML = `
                    <div style="width:34px;height:34px;border-radius:8px;background:rgba(90,26,138,0.3);border:1px solid rgba(90,26,138,0.4);display:flex;align-items:center;justify-content:center;flex-shrink:0;overflow:hidden;">
                        ${st.favicon ? `<img src="${st.favicon}" style="width:100%;height:100%;object-fit:cover;border-radius:7px;" onerror="this.parentElement.innerHTML='<i class=\\'fas fa-radio\\' style=\\'font-size:14px;color:var(--accent);\\'></i>'">` : '<i class="fas fa-radio" style="font-size:14px;color:var(--accent);"></i>'}
                    </div>
                    <div style="flex:1;min-width:0;">
                        <div style="color:var(--text-primary);font-size:13px;font-weight:600;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${st.name}</div>
                        <div style="color:var(--text-muted);font-size:11px;margin-top:2px;">${ciudad}</div>
                    </div>
                    <button style="background:var(--accent);border:none;color:var(--bg-dark);border-radius:50%;width:28px;height:28px;display:flex;align-items:center;justify-content:center;cursor:pointer;flex-shrink:0;font-size:11px;" title="Reproducir"><i class="fas fa-play"></i></button>`;

                const btnPlay = item.querySelector('button');
                const reproducir = () => {
                    if (!st.url_resolved) return;
                    const est = { nombre: st.name, url: st.url_resolved, lugar: ciudad };
                    historialJam = historialJam.slice(0, indexActual + 1);
                    historialJam.push(est);
                    indexActual = historialJam.length - 1;
                    reproducirEstacion(est);
                    btnPlay.innerHTML = '<i class="fas fa-pause"></i>';
                    btnPlay.style.background = '#1cf00c';
                    ocultarResultados();
                    inputBusqueda.value = st.name;
                    btnLimpiar.style.display = 'block';
                };
                btnPlay.addEventListener('click', e => { e.stopPropagation(); reproducir(); });
                item.addEventListener('click', reproducir);
                cajaBusqueda.appendChild(item);
            });
        }

        async function buscar(query) {
            if (ctrlBusqueda) ctrlBusqueda.abort();
            ctrlBusqueda = new AbortController();
            const sig  = ctrlBusqueda.signal;
            const norm = query.trim().toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
            mostrarCarga();
            try {
                const enc    = encodeURIComponent(query.trim());
                const encN   = encodeURIComponent(norm);
                const base   = 'limit=20&hidebroken=true&order=votes&reverse=true';
                const codigo = Object.entries(PAISES).find(([k]) => norm === k || norm.includes(k))?.[1];
                const urls   = [
                    `${RADIO_API}/stations/search?name=${enc}&${base}`,
                    `${RADIO_API}/stations/bystate/${enc}?${base}`,
                    `${RADIO_API}/stations/bystate/${encN}?${base}`,
                    `${RADIO_API}/stations/bycountry/${enc}?${base}`,
                    `${RADIO_API}/stations/bycountry/${encN}?${base}`
                ];
                if (codigo) urls.unshift(`${RADIO_API}/stations/bycountrycodeexact/${codigo}?${base}`);
                const respuestas = await Promise.allSettled(urls.map(u => fetch(u, { signal: sig }).then(r => r.json()).catch(() => [])));
                const vistos = new Set();
                const combinados = respuestas
                    .flatMap(r => r.status === 'fulfilled' && Array.isArray(r.value) ? r.value : [])
                    .filter(s => { if (!s?.stationuuid || vistos.has(s.stationuuid)) return false; vistos.add(s.stationuuid); return true; });
                renderizarResultados(combinados);
            } catch (e) {
                if (e.name !== 'AbortError') {
                    cajaBusqueda.innerHTML = '<div style="padding:16px;text-align:center;color:#ff6b6b;font-size:13px;"><i class="fas fa-triangle-exclamation" style="margin-right:6px;"></i>Error al buscar.</div>';
                    iconoBusq.className = 'fas fa-magnifying-glass';
                }
            }
        }

        inputBusqueda.addEventListener('input', function () {
            const q = this.value.trim();
            btnLimpiar.style.display = q ? 'block' : 'none';
            clearTimeout(timerBusqueda);
            if (!q) { ocultarResultados(); return; }
            if (q.length < 2) return;
            timerBusqueda = setTimeout(() => buscar(q), 400);
        });

        inputBusqueda.addEventListener('keydown', function (e) {
            if (e.key === 'Enter') { clearTimeout(timerBusqueda); if (this.value.trim().length >= 2) buscar(this.value.trim()); }
            if (e.key === 'Escape') { ocultarResultados(); this.blur(); }
        });

        btnLimpiar.addEventListener('click', () => {
            inputBusqueda.value = '';
            btnLimpiar.style.display = 'none';
            ocultarResultados();
            inputBusqueda.focus();
        });

        document.addEventListener('click', e => {
            const wrapper = document.getElementById('searchWrapper');
            if (wrapper && !wrapper.contains(e.target) && !cajaBusqueda.contains(e.target))
                ocultarResultados();
        });
    </script>
</body>

</html>