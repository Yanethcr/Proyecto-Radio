/**
 * reproductor-global.js
 * Maneja el audio de forma persistente entre páginas usando sessionStorage.
 * Inyecta un mini-reproductor flotante en páginas que no tienen el reproductor principal.
 */

(function () {
    // ── Claves de sessionStorage ──────────────────────────────────────────
    const KEY_URL    = 'at_stream_url';
    const KEY_NOMBRE = 'at_stream_nombre';
    const KEY_LUGAR  = 'at_stream_lugar';
    const KEY_VOL    = 'at_stream_vol';
    const KEY_PAUSED = 'at_stream_paused';

    // ── Guardar estado antes de salir de cualquier página ────────────────
    window.addEventListener('beforeunload', () => {
        const url = window._audGlobal ? window._audGlobal.src : '';
        if (url && url !== window.location.href) {
            sessionStorage.setItem(KEY_URL,    url);
            sessionStorage.setItem(KEY_NOMBRE, sessionStorage.getItem('_g_nombre') || '');
            sessionStorage.setItem(KEY_LUGAR,  sessionStorage.getItem('_g_lugar')  || '');
            sessionStorage.setItem(KEY_VOL,    window._audGlobal ? window._audGlobal.volume : 0.7);
            sessionStorage.setItem(KEY_PAUSED, window._audGlobal && window._audGlobal.paused ? '1' : '0');
        }
    });

    // ── Detectar si esta página tiene reproductor principal ───────────────
    const tieneReproductorPrincipal = !!document.querySelector('.reproductor') || window.location.pathname.includes('favoritos.html');

    // ── Crear elemento de audio global ────────────────────────────────────
    if (!window._audGlobal) {
        window._audGlobal = new Audio();
        window._audGlobal.volume = parseFloat(sessionStorage.getItem(KEY_VOL) || '0.7');
    }

    const aud = window._audGlobal;

    // ── Función pública para reproducir desde cualquier página ────────────
    window.globalPlay = function (url, nombre, lugar) {
        if (!url) return;
        sessionStorage.setItem('_g_nombre', nombre || '');
        sessionStorage.setItem('_g_lugar',  lugar  || '');
        sessionStorage.setItem(KEY_URL,    url);
        sessionStorage.setItem(KEY_NOMBRE, nombre || '');
        sessionStorage.setItem(KEY_LUGAR,  lugar  || '');
        sessionStorage.setItem(KEY_VOL,    aud.volume);
        sessionStorage.setItem(KEY_PAUSED, '0');

        if (aud.src !== url) {
            aud.src = url;
        }
        aud.play().catch(() => {});
        actualizarMiniReproductor(nombre, lugar, false);
    };

    window.globalPause = function () {
        aud.pause();
        sessionStorage.setItem(KEY_PAUSED, '1');
        actualizarMiniReproductor(null, null, true);
    };

    window.globalResume = function () {
        aud.play().catch(() => {});
        sessionStorage.setItem(KEY_PAUSED, '0');
        actualizarMiniReproductor(null, null, false);
    };

    window.globalStop = function () {
        aud.pause();
        aud.src = '';
        sessionStorage.removeItem(KEY_URL);
        sessionStorage.removeItem(KEY_NOMBRE);
        sessionStorage.removeItem(KEY_LUGAR);
        sessionStorage.removeItem('_g_nombre');
        sessionStorage.removeItem('_g_lugar');
        ocultarMiniReproductor();
    };

    window.globalSetVolume = function (val) {
        aud.volume = val;
        sessionStorage.setItem(KEY_VOL, val);
    };

    // ── Mini reproductor flotante (solo en páginas sin reproductor principal) ──
    function crearMiniReproductor() {
        if (tieneReproductorPrincipal) return;
        if (document.getElementById('mini-reproductor-global')) return;

        const mini = document.createElement('div');
        mini.id = 'mini-reproductor-global';
        mini.innerHTML = `
            <div class="mini-rep-info">
                <i class="fas fa-radio" style="color:#1cf00c; flex-shrink:0;"></i>
                <div style="min-width:0; flex:1;">
                    <div id="mini-rep-nombre" style="font-size:13px; font-weight:600; color:#f0e6ff; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;"></div>
                    <div id="mini-rep-lugar"  style="font-size:11px; color:#8a7aaa; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;"></div>
                </div>
            </div>
            <div class="mini-rep-controles">
                <button id="mini-rep-playpause" class="control-btn" title="Play/Pausa">
                    <i class="fas fa-pause"></i>
                </button>
                <button id="mini-rep-stop" class="control-btn" title="Detener">
                    <i class="fas fa-stop"></i>
                </button>
                <div style="display:flex; align-items:center; gap:6px;">
                    <i class="fas fa-volume-high" style="color:#8a7aaa; font-size:12px;"></i>
                    <input id="mini-rep-vol" type="range" min="0" max="100" value="${Math.round(aud.volume * 100)}"
                        style="width:70px; accent-color:#1cf00c; cursor:pointer;">
                </div>
            </div>
        `;
        mini.style.cssText = `
            display: none;
            position: fixed;
            bottom: 24px;
            left: 50%;
            transform: translateX(-50%);
            background: rgba(14, 0, 28, 0.96);
            backdrop-filter: blur(20px);
            -webkit-backdrop-filter: blur(20px);
            border: 1px solid rgba(28, 240, 12, 0.35);
            border-radius: 50px;
            padding: 10px 20px;
            z-index: 9999;
            box-shadow: 0 4px 32px rgba(0,0,0,0.5), 0 0 20px rgba(28,240,12,0.08);
            width: clamp(300px, 80vw, 540px);
            align-items: center;
            gap: 16px;
        `;

        // Inyectar estilos internos
        const style = document.createElement('style');
        style.textContent = `
            #mini-reproductor-global { display: none; }
            #mini-reproductor-global.visible { display: flex !important; }
            .mini-rep-info {
                display: flex; align-items: center; gap: 10px;
                flex: 1; min-width: 0;
            }
            .mini-rep-controles {
                display: flex; align-items: center; gap: 10px; flex-shrink: 0;
            }
        `;
        document.head.appendChild(style);
        document.body.appendChild(mini);

        // Eventos
        document.getElementById('mini-rep-playpause').addEventListener('click', () => {
            if (aud.paused) {
                window.globalResume();
                document.getElementById('mini-rep-playpause').innerHTML = '<i class="fas fa-pause"></i>';
            } else {
                window.globalPause();
                document.getElementById('mini-rep-playpause').innerHTML = '<i class="fas fa-play"></i>';
            }
        });

        document.getElementById('mini-rep-stop').addEventListener('click', () => {
            window.globalStop();
        });

        document.getElementById('mini-rep-vol').addEventListener('input', function () {
            window.globalSetVolume(this.value / 100);
        });
    }

    function actualizarMiniReproductor(nombre, lugar, pausado) {
        if (tieneReproductorPrincipal) return;

        const mini = document.getElementById('mini-reproductor-global');
        if (!mini) return;

        if (nombre !== null) document.getElementById('mini-rep-nombre').textContent = nombre || sessionStorage.getItem(KEY_NOMBRE) || '';
        if (lugar  !== null) document.getElementById('mini-rep-lugar').textContent  = lugar  || sessionStorage.getItem(KEY_LUGAR)  || '';

        const btn = document.getElementById('mini-rep-playpause');
        if (btn) btn.innerHTML = pausado ? '<i class="fas fa-play"></i>' : '<i class="fas fa-pause"></i>';

        mini.classList.add('visible');
    }

    function ocultarMiniReproductor() {
        const mini = document.getElementById('mini-reproductor-global');
        if (mini) mini.classList.remove('visible');
    }

    // ── Al cargar: reanudar si había algo sonando ─────────────────────────
    window.addEventListener('DOMContentLoaded', () => {
        crearMiniReproductor();

        const url    = sessionStorage.getItem(KEY_URL);
        const nombre = sessionStorage.getItem(KEY_NOMBRE) || '';
        const lugar  = sessionStorage.getItem(KEY_LUGAR)  || '';
        const vol    = parseFloat(sessionStorage.getItem(KEY_VOL) || '0.7');
        const paused = sessionStorage.getItem(KEY_PAUSED) === '1';

        if (!url) return;

        aud.volume = vol;
        sessionStorage.setItem('_g_nombre', nombre);
        sessionStorage.setItem('_g_lugar',  lugar);

        if (tieneReproductorPrincipal) {
            // Delegar al sistema de globo.js (usuarioLoggeado.html)
            // Se activa desde el script de esa página
            return;
        }

        // En páginas secundarias: mostrar mini reproductor y reanudar
        if (aud.src !== url) aud.src = url;

        actualizarMiniReproductor(nombre, lugar, true);

        if (!paused) {
            aud.play().then(() => {
                actualizarMiniReproductor(nombre, lugar, false);
            }).catch(() => {
                // Autoplay bloqueado — mostrar en pausa, el usuario da click
                actualizarMiniReproductor(nombre, lugar, true);
            });
        }

        // Sincronizar volumen con slider
        const volSlider = document.getElementById('mini-rep-vol');
        if (volSlider) volSlider.value = Math.round(vol * 100);
    });

})();