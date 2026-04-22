const aud = new Audio();
aud.crossOrigin = 'anonymous';
 
// Pide las estaciones a Radio Browser
async function cargar() {
    const res  = await fetch(`https://de1.api.radio-browser.info/json/stations?hidebroken=true&order=votes&reverse=true`);
    const data = await res.json();
    return data;
}
 
// Reproduce el stream
function reproducir(url) {
    aud.src = url;
    aud.play().catch(() => console.log('No se pudo conectar'));
}
 
// Pausa
function detener() {
    aud.pause();
    aud.currentTime = 0;
}
 
// Subir y bajar el volumen
function volumen(val) {
    aud.volume = val / 100;
}
