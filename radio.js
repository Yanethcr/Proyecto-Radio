const aud = new Audio();
aud.crossOrigin = 'anonymous';

// Carga las estaciones
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

// Buscar estaciones por nombre
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

// Estaciones por país
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

// Estaciones por género
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

// Estaciones por idioma
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

// Estaciones por bitrate mínimo
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

// Registra un click en la estación
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

function reproducir(url) {
    if (!url) {
        console.log('Esta estación no tiene stream disponible');
        return false;
    }
    aud.src = url;
    return aud.play().catch(e => {
        console.log('No se pudo conectar:', e);
        return false;
    });
}

function detener() {
    aud.pause();
    aud.currentTime = 0;
}

function volumen(val) {
    aud.volume = val / 100;
}

// login.php
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

// registro.php
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

// favoritos.php 
async function guardarFav(estacion) {
    try {
        const res  = await fetch('backend/favoritos.php?accion=guardar', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                nombre:      estacion.name,
                streamUrl:   estacion.url_resolved || estacion.url,
                genero:      estacion.tags ? estacion.tags.split(',')[0].trim() : 'Radio',
                descripcion: estacion.name || '',
                vvidApi:     estacion.stationuuid || '',
                ciudad:      estacion.state        || 'Desconocida',
                latitud:     estacion.geo_lat       || null,
                longitud:    estacion.geo_long      || null,
                pais:        estacion.country       || 'Desconocido',
                codigoISO:   estacion.countrycode   || ''
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

// Registra cuando el usuario empieza a escuchar — historial.php
async function registrarHist(idEstacion) {
    try {
        const res  = await fetch('backend/historial.php?accion=registrar', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ idEstacion })
        });
        const data = await res.json();
        return data; // Devuelve { ok, idHistorial }
    } catch(e) {
        console.log('Error al registrar historial:', e);
        return { ok: false, mensaje: 'Error de conexión' };
    }
}

// Guarda Duracion
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

// Busca usuarios por username
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

// Envía solicitud 
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

// Responde solicitud 
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

// Crea sala Jam 
async function crearJam(idEstacion) {
    try {
        const res  = await fetch('backend/jam.php?accion=crear', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ idEstacion })
        });
        const data = await res.json();
        return data; // Devuelve { ok, codigo, idJam }
    } catch(e) {
        console.log('Error al crear jam:', e);
        return { ok: false, mensaje: 'Error de conexión' };
    }
}

// Une al usuario al Jam 
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

// Carga usuarios de la sala 
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

// Termina la sala
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
