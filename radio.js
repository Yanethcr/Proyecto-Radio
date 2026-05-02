const aud = new Audio();

// --- ESCUCHADOR GLOBAL DE ERRORES ---
aud.addEventListener('error', () => {
    // Si el error (código 1) es MEDIA_ERR_ABORTED, lo ignoramos porque fue por cambio de emisora
    if (aud.error && aud.error.code === 1) return;

    const elNombre = document.getElementById('rep-nombre');
    if (elNombre) elNombre.textContent = '❗ Esta estación no está disponible';
});

// Estación actualmente reproduciéndose — accesible para favoritos
window.estacionActualData = null;

async function cargar() {
    try {
        const res  = await fetch('https://de1.api.radio-browser.info/json/stations?hidebroken=true&order=votes&reverse=true');
        const data = await res.json();
        return data;
    } catch(e) {
        console.log('Error al cargar estaciones:', e);
        return [];
    }
}

async function buscar(nombre) {
    try {
        const res  = await fetch(`https://de1.api.radio-browser.info/json/stations/byname/${encodeURIComponent(nombre)}?hidebroken=true&order=votes&reverse=true`);
        const data = await res.json();
        return data;
    } catch(e) {
        console.log('Error al buscar estaciones:', e);
        return [];
    }
}

async function porPais(pais) {
    try {
        const res  = await fetch(`https://de1.api.radio-browser.info/json/stations/bycountry/${encodeURIComponent(pais)}?hidebroken=true&order=votes&reverse=true`);
        const data = await res.json();
        return data;
    } catch(e) {
        console.log('Error al filtrar por país:', e);
        return [];
    }
}

async function porGenero(genero) {
    try {
        const res  = await fetch(`https://de1.api.radio-browser.info/json/stations/bytag/${encodeURIComponent(genero)}?hidebroken=true&order=votes&reverse=true`);
        const data = await res.json();
        return data;
    } catch(e) {
        console.log('Error al filtrar por género:', e);
        return [];
    }
}

async function porIdioma(idioma) {
    try {
        const res  = await fetch(`https://de1.api.radio-browser.info/json/stations/bylanguage/${encodeURIComponent(idioma)}?hidebroken=true&order=votes&reverse=true`);
        const data = await res.json();
        return data;
    } catch(e) {
        console.log('Error al filtrar por idioma:', e);
        return [];
    }
}

async function porBitrate(min) {
    try {
        const res  = await fetch(`https://de1.api.radio-browser.info/json/stations?hidebroken=true&order=votes&reverse=true&bitrateMin=${min}`);
        const data = await res.json();
        return data;
    } catch(e) {
        console.log('Error al filtrar por bitrate:', e);
        return [];
    }
}

async function click(uuid) {
    try {
        const res  = await fetch(`https://de1.api.radio-browser.info/json/url/${uuid}`);
        const data = await res.json();
        return data;
    } catch(e) {
        console.log('Error al registrar click:', e);
        return { ok: false };
    }
}

function reproducir(urlOriginal, nombre, lugar) {
    if (!urlOriginal) {
        console.log('Esta estación no tiene stream disponible');
        return false;
    }

    const url = (location.protocol === 'https:' && urlOriginal.startsWith('http://')) 
                ? urlOriginal.replace('http://', 'https://') 
                : urlOriginal;

    window.estacionActualData = { url: url, nombre: nombre || '', lugar: lugar || '' };

    aud.pause(); // Pausamos antes de asignar la nueva URL
    aud.src = url;

    const promesa = aud.play();

    if (promesa !== undefined) {
        promesa.catch(e => {
            if (e.name === 'AbortError') return; // Ignorar cancelaciones por clics rápidos
            console.log('No se pudo conectar:', e);
        });
    }
}

function detener() {
    aud.pause();
    aud.currentTime = 0;
    window.estacionActualData = null;
}

function volumen(val) {
    if (window._audGlobo) window._audGlobo.volume = val / 100;
    aud.volume = val / 100;
}

async function iniciarSesion(correo, contrasena) {
    try {
        const res  = await fetch('backend/login.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ correo, contrasena })
        });
        const data = await res.json();
        return data;
    } catch(e) {
        console.log('Error al iniciar sesión:', e);
        return { ok: false, mensaje: 'Error de conexión' };
    }
}

async function registrarse(username, correo, contrasena, confirmar) {
    try {
        const res  = await fetch('backend/registro.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, correo, contrasena, confirmar })
        });
        const data = await res.json();
        return data;
    } catch(e) {
        console.log('Error al registrarse:', e);
        return { ok: false, mensaje: 'Error de conexión' };
    }
}

async function guardarFav(estacion) {
    const datos = estacion || window.estacionActualData;

    if (!datos) {
        console.log('No hay estación activa para guardar en favoritos');
        return { ok: false, mensaje: 'Primero selecciona una estación' };
    }

    try {
        const res  = await fetch('backend/favoritos.php?accion=guardar', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                nombre:    datos.name    || datos.nombre    || '',
                streamUrl: datos.url_resolved || datos.url  || '',
                genero:    datos.tags ? datos.tags.split(',')[0].trim() : 'Radio',
                ciudad:    datos.state   || datos.lugar     || 'Desconocida',
                pais:      datos.country || 'Desconocido'
            })
        });
        const data = await res.json();
        return data;
    } catch(e) {
        console.log('Error al guardar favorito:', e);
        return { ok: false, mensaje: 'Error de conexión' };
    }
}

async function cargarFavs() {
    try {
        const res  = await fetch('backend/favoritos.php?accion=cargar');
        const data = await res.json();
        if (data.ok) return data.favoritos;
        return [];
    } catch(e) {
        console.log('Error al cargar favoritos:', e);
        return [];
    }
}

async function eliminarFav(idFavorito) {
    try {
        const res  = await fetch('backend/favoritos.php?accion=eliminar', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ idFavorito })
        });
        const data = await res.json();
        return data;
    } catch(e) {
        console.log('Error al eliminar favorito:', e);
        return { ok: false, mensaje: 'Error de conexión' };
    }
}

async function registrarHist(idEstacion) {
    try {
        const res  = await fetch('backend/historial.php?accion=registrar', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ idEstacion })
        });
        const data = await res.json();
        return data;
    } catch(e) {
        console.log('Error al registrar historial:', e);
        return { ok: false, mensaje: 'Error de conexión' };
    }
}

async function guardarDur(idHistorial, duracionSegundos) {
    try {
        const res  = await fetch('backend/historial.php?accion=duracion', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ idHistorial, duracionSegundos })
        });
        const data = await res.json();
        return data;
    } catch(e) {
        console.log('Error al guardar duración:', e);
        return { ok: false, mensaje: 'Error de conexión' };
    }
}

async function cargarHist() {
    try {
        const res  = await fetch('backend/historial.php?accion=cargar');
        const data = await res.json();
        if (data.ok) return data.historial;
        return [];
    } catch(e) {
        console.log('Error al cargar historial:', e);
        return [];
    }
}

async function buscarAmigo(username) {
    try {
        const res  = await fetch(`backend/amigos.php?accion=buscar&username=${encodeURIComponent(username)}`);
        const data = await res.json();
        return data;
    } catch(e) {
        console.log('Error al buscar usuario:', e);
        return { ok: false, mensaje: 'Error de conexión' };
    }
}

async function enviarSol(idUsuarioAmigo) {
    try {
        const res  = await fetch('backend/amigos.php?accion=enviar', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ idUsuarioAmigo })
        });
        const data = await res.json();
        return data;
    } catch(e) {
        console.log('Error al enviar solicitud:', e);
        return { ok: false, mensaje: 'Error de conexión' };
    }
}

async function responderSol(idAmigos, estado) {
    try {
        const res  = await fetch('backend/amigos.php?accion=responder', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ idAmigos, estado })
        });
        const data = await res.json();
        return data;
    } catch(e) {
        console.log('Error al responder solicitud:', e);
        return { ok: false, mensaje: 'Error de conexión' };
    }
}

async function cargarAmigos() {
    try {
        const res  = await fetch('backend/amigos.php?accion=cargar');
        const data = await res.json();
        if (data.ok) return data.amigos;
        return [];
    } catch(e) {
        console.log('Error al cargar amigos:', e);
        return [];
    }
}

async function crearJam(codigo, streamUrl, nombre) {
    try {
        const res  = await fetch('backend/jam.php?accion=crear', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ codigo, streamUrl, nombre })
        });
        const data = await res.json();
        return data;
    } catch(e) {
        console.log('Error al crear jam:', e);
        return { ok: false, mensaje: 'Error de conexión' };
    }
}

async function unirseJam(codigo) {
    try {
        const res  = await fetch('backend/jam.php?accion=unirse', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ codigo })
        });
        const data = await res.json();
        return data;
    } catch(e) {
        console.log('Error al unirse al jam:', e);
        return { ok: false, mensaje: 'Error de conexión' };
    }
}

async function usuariosJam(idJam) {
    try {
        const res  = await fetch(`backend/jam.php?accion=usuarios&idJam=${idJam}`);
        const data = await res.json();
        if (data.ok) return data.usuarios;
        return [];
    } catch(e) {
        console.log('Error al cargar usuarios del jam:', e);
        return [];
    }
}

async function terminarJam(idJam) {
    try {
        const res  = await fetch('backend/jam.php?accion=terminar', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ idJam })
        });
        const data = await res.json();
        return data;
    } catch(e) {
        console.log('Error al terminar jam:', e);
        return { ok: false, mensaje: 'Error de conexión' };
    }
}