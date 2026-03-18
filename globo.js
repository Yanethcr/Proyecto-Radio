/* =============================================
   AUDIO TRAVELER — globo.js v2
   Globo 3D interactivo con Three.js + TopoJSON
   Emisoras via Radio Browser API
   ============================================= */

(function () {

  const RADIO_API   = 'https://de1.api.radio-browser.info/json';
  const GLOBE_R     = 1;
  const SEG         = 64;

  // ── Contenedor ───────────────────────────────
  const container = document.getElementById('globo-canvas');
  if (!container) return;
  const W = () => container.clientWidth  || 500;
  const H = () => container.clientHeight || 500;

  // ── Panel emisoras ────────────────────────────
  const panel       = document.getElementById('panel-emisoras');
  const panelTitulo = document.getElementById('panel-pais');
  const panelLista  = document.getElementById('panel-lista');
  const panelCerrar = document.getElementById('panel-cerrar');
  const panelLoader = document.getElementById('panel-loader');

  // ── Audio (expuesto globalmente para el slider de volumen) ──
  const aud = new Audio();
  aud.crossOrigin = 'anonymous';
  window._audGlobo = aud;
  let audioActivo = null;

  // Actualiza el reproductor inferior
  function actualizarReproductor(nombre, lugar) {
    const elNombre = document.getElementById('rep-nombre');
    const elLugar  = document.getElementById('rep-lugar');
    const elBtn    = document.getElementById('rep-playpause');
    if (elNombre) elNombre.textContent = nombre;
    if (elLugar)  elLugar.textContent  = lugar;
    if (elBtn)    elBtn.innerHTML = '<i class="fas fa-pause"></i>';
  }

  function reproducir(url, nombre, lugar, btn) {
    // Toggle si es la misma emisora
    if (audioActivo === url) {
      if (aud.paused) {
        aud.play().catch(() => {});
        if (btn) btn.innerHTML = '<i class="fas fa-pause"></i>';
        const elBtn = document.getElementById('rep-playpause');
        if (elBtn) elBtn.innerHTML = '<i class="fas fa-pause"></i>';
      } else {
        aud.pause();
        if (btn) btn.innerHTML = '<i class="fas fa-play"></i>';
        const elBtn = document.getElementById('rep-playpause');
        if (elBtn) elBtn.innerHTML = '<i class="fas fa-play"></i>';
      }
      return;
    }
    // Nueva emisora
    aud.src = url;
    aud.play().catch(() => {
      // Si falla el stream, mostrar error sutil
      if (btn) btn.innerHTML = '<i class="fas fa-exclamation-triangle"></i>';
      setTimeout(() => { if (btn) btn.innerHTML = '<i class="fas fa-play"></i>'; }, 2000);
    });
    audioActivo = url;
    // Resetear todos los botones del panel
    document.querySelectorAll('.em-play').forEach(b => b.innerHTML = '<i class="fas fa-play"></i>');
    if (btn) btn.innerHTML = '<i class="fas fa-pause"></i>';
    actualizarReproductor(nombre, lugar);
  }

  // Botón play/pause del reproductor inferior
  document.getElementById('rep-playpause')?.addEventListener('click', () => {
    if (!audioActivo) return;
    if (aud.paused) {
      aud.play().catch(() => {});
      document.getElementById('rep-playpause').innerHTML = '<i class="fas fa-pause"></i>';
    } else {
      aud.pause();
      document.getElementById('rep-playpause').innerHTML = '<i class="fas fa-play"></i>';
    }
  });

  // ── Three.js ─────────────────────────────────
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(W(), H());
  renderer.setClearColor(0x000000, 0);
  container.appendChild(renderer.domElement);

  const scene  = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, W() / H(), 0.1, 100);
  camera.position.set(0, 0, 2.8);

  // Luces
  scene.add(new THREE.AmbientLight(0xffffff, 0.6));
  const sun = new THREE.DirectionalLight(0xffffff, 1.0);
  sun.position.set(5, 3, 5);
  scene.add(sun);
  const rimLight = new THREE.DirectionalLight(0x4400aa, 0.4);
  rimLight.position.set(-4, -2, -4);
  scene.add(rimLight);

  // ── Grupo rotable ─────────────────────────────
  const globeGroup = new THREE.Group();
  scene.add(globeGroup);

  // ── Océano (esfera base) ──────────────────────
  // Color azul oscuro marino para diferenciarlo de los continentes
  const oceanMesh = new THREE.Mesh(
    new THREE.SphereGeometry(GLOBE_R, SEG, SEG),
    new THREE.MeshPhongMaterial({
      color:     0x061428,   // azul marino muy oscuro
      emissive:  0x020814,
      shininess: 80,
    })
  );
  globeGroup.add(oceanMesh);

  // ── Atmósfera ─────────────────────────────────
  globeGroup.add(new THREE.Mesh(
    new THREE.SphereGeometry(GLOBE_R * 1.05, SEG, SEG),
    new THREE.MeshPhongMaterial({
      color: 0x1144cc,
      side: THREE.BackSide,
      transparent: true,
      opacity: 0.08,
    })
  ));

  // ── Materiales de países ──────────────────────
  // Verde azulado suave para los continentes — contrasta con el azul oscuro del mar
  const mkMat = (color, emissive, opacity) => new THREE.MeshPhongMaterial({
    color, emissive: emissive || 0x000000,
    transparent: true, opacity: opacity || 1,
    side: THREE.DoubleSide,
  });

  const MAT_DEFAULT  = mkMat(0x1a4a2e, 0x0a2218, 0.95);  // verde bosque oscuro
  const MAT_HOVER    = mkMat(0x2d7a50, 0x143d28, 0.97);  // verde medio
  const MAT_SELECTED = mkMat(0x1cf00c, 0x0a6005, 0.97);  // verde néon (acento)
  const MAT_BORDER   = new THREE.LineBasicMaterial({
    color: 0x3dff9a, transparent: true, opacity: 0.5,
  });

  // ── Lat/Lon → Vector3 ─────────────────────────
  function ll2v(lat, lon, r) {
    const phi   = (90 - lat) * Math.PI / 180;
    const theta = (lon + 180) * Math.PI / 180;
    return new THREE.Vector3(
      -r * Math.sin(phi) * Math.cos(theta),
       r * Math.cos(phi),
       r * Math.sin(phi) * Math.sin(theta)
    );
  }

  // ── Construir mesh de un polígono ────────────
  function buildPoly(rings, r) {
    const meshes = [], lines = [];
    rings.forEach(ring => {
      if (ring.length < 3) return;
      const pts    = ring.map(([lon, lat]) => ll2v(lat, lon, r));
      const center = pts.reduce((a, b) => a.clone().add(b), new THREE.Vector3())
                        .divideScalar(pts.length).normalize().multiplyScalar(r);
      const verts  = [];
      for (let i = 0; i < pts.length - 1; i++) {
        verts.push(center.x, center.y, center.z,
                   pts[i].x, pts[i].y, pts[i].z,
                   pts[i+1].x, pts[i+1].y, pts[i+1].z);
      }
      const geo = new THREE.BufferGeometry();
      geo.setAttribute('position', new THREE.Float32BufferAttribute(verts, 3));
      geo.computeVertexNormals();
      const mesh = new THREE.Mesh(geo, MAT_DEFAULT.clone());
      mesh.renderOrder = 1;
      meshes.push(mesh);

      const lGeo = new THREE.BufferGeometry().setFromPoints([...pts, pts[0]]);
      lines.push(new THREE.Line(lGeo, MAT_BORDER.clone()));
    });
    return { meshes, lines };
  }

  // ── Mapa numId → ISO2 embebido (los más comunes) ──
  // Evita dependencia de un CDN extra que puede fallar
  const NUM_TO_ISO = {
    4:'AF',8:'AL',12:'DZ',24:'AO',32:'AR',36:'AU',40:'AT',50:'BD',56:'BE',
    68:'BO',76:'BR',100:'BG',116:'KH',120:'CM',124:'CA',152:'CL',156:'CN',
    170:'CO',178:'CG',180:'CD',188:'CR',191:'HR',192:'CU',203:'CZ',208:'DK',
    218:'EC',818:'EG',222:'SV',231:'ET',246:'FI',250:'FR',276:'DE',288:'GH',
    300:'GR',320:'GT',332:'HT',340:'HN',348:'HU',356:'IN',360:'ID',364:'IR',
    368:'IQ',372:'IE',376:'IL',380:'IT',388:'JM',392:'JP',400:'JO',404:'KE',
    408:'KP',410:'KR',414:'KW',422:'LB',434:'LY',484:'MX',504:'MA',508:'MZ',
    516:'NA',524:'NP',528:'NL',540:'NC',554:'NZ',558:'NI',566:'NG',578:'NO',
    586:'PK',591:'PA',598:'PG',600:'PY',604:'PE',608:'PH',616:'PL',620:'PT',
    630:'PR',634:'QA',642:'RO',643:'RU',682:'SA',686:'SN',694:'SL',706:'SO',
    710:'ZA',724:'ES',729:'SD',752:'SE',756:'CH',760:'SY',764:'TH',788:'TN',
    792:'TR',800:'UG',804:'UA',784:'AE',826:'GB',840:'US',858:'UY',860:'UZ',
    862:'VE',704:'VN',887:'YE',716:'ZW',466:'ML',562:'NE',854:'BF',148:'TD',
    478:'MR',706:'SO',686:'SN',324:'GN',430:'LR',694:'SL',288:'GH',204:'BJ',
    768:'TG',288:'GH',426:'LS',748:'SZ',72:'BW',454:'MW',894:'ZM',834:'TZ',
    174:'KM',646:'RW',108:'BI',86:'IO',736:'SD',196:'CY',440:'LT',428:'LV',
    233:'EE',112:'BY',498:'MD',275:'PS',268:'GE',31:'AZ',51:'AM',792:'TR',
    398:'KZ',417:'KG',762:'TJ',795:'TM',496:'MN',418:'LA',116:'KH',96:'BN',
    104:'MM',144:'LK',462:'MV',64:'BT',524:'NP',792:'TR',70:'BA',807:'MK',
    688:'RS',8:'AL',499:'ME',705:'SI',191:'HR',703:'SK',348:'HU',642:'RO',
    100:'BG',300:'GR',724:'ES',620:'PT',380:'IT',250:'FR',276:'DE',56:'BE',
    528:'NL',442:'LU',756:'CH',40:'AT',203:'CZ',616:'PL',208:'DK',578:'NO',
    752:'SE',246:'FI',372:'IE',826:'GB',352:'IS',492:'MC',674:'SM',336:'VA',
    20:'AD',470:'MT',196:'CY',440:'LT',428:'LV',233:'EE',112:'BY',804:'UA',
    498:'MD',388:'JM',214:'DO',332:'HT',630:'PR',192:'CU',28:'AG',52:'BB',
    84:'BZ',308:'GD',320:'GT',332:'HT',340:'HN',388:'JM',484:'MX',558:'NI',
    591:'PA',630:'PR',659:'KN',662:'LC',670:'VC',780:'TT',840:'US',
  };

  const PAIS_ES = {
    AF:'Afganistán',AL:'Albania',DZ:'Argelia',AO:'Angola',AR:'Argentina',
    AU:'Australia',AT:'Austria',BD:'Bangladesh',BE:'Bélgica',BO:'Bolivia',
    BR:'Brasil',BG:'Bulgaria',KH:'Camboya',CM:'Camerún',CA:'Canadá',
    CL:'Chile',CN:'China',CO:'Colombia',CG:'Congo',CD:'Congo (RDC)',
    CR:'Costa Rica',HR:'Croacia',CU:'Cuba',CZ:'República Checa',DK:'Dinamarca',
    EC:'Ecuador',EG:'Egipto',SV:'El Salvador',ET:'Etiopía',FI:'Finlandia',
    FR:'Francia',DE:'Alemania',GH:'Ghana',GR:'Grecia',GT:'Guatemala',
    HT:'Haití',HN:'Honduras',HU:'Hungría',IN:'India',ID:'Indonesia',
    IR:'Irán',IQ:'Irak',IE:'Irlanda',IL:'Israel',IT:'Italia',
    JM:'Jamaica',JP:'Japón',JO:'Jordania',KE:'Kenia',KP:'Corea del Norte',
    KR:'Corea del Sur',KW:'Kuwait',LB:'Líbano',LY:'Libia',MX:'México',
    MA:'Marruecos',MZ:'Mozambique',NA:'Namibia',NP:'Nepal',NL:'Países Bajos',
    NZ:'Nueva Zelanda',NI:'Nicaragua',NG:'Nigeria',NO:'Noruega',PK:'Pakistán',
    PA:'Panamá',PG:'Papúa Nueva Guinea',PY:'Paraguay',PE:'Perú',PH:'Filipinas',
    PL:'Polonia',PT:'Portugal',QA:'Catar',RO:'Rumanía',RU:'Rusia',
    SA:'Arabia Saudita',ZA:'Sudáfrica',ES:'España',SD:'Sudán',SE:'Suecia',
    CH:'Suiza',SY:'Siria',TH:'Tailandia',TN:'Túnez',TR:'Turquía',
    UG:'Uganda',UA:'Ucrania',AE:'Emiratos Árabes',GB:'Reino Unido',
    US:'Estados Unidos',UY:'Uruguay',VE:'Venezuela',VN:'Vietnam',
    YE:'Yemen',ZW:'Zimbabue',ML:'Malí',NE:'Níger',BF:'Burkina Faso',
    TD:'Chad',MR:'Mauritania',LR:'Liberia',SL:'Sierra Leona',BJ:'Benín',
    TG:'Togo',LS:'Lesoto',SZ:'Esuatini',BW:'Botsuana',MW:'Malaui',
    ZM:'Zambia',TZ:'Tanzania',RW:'Ruanda',BI:'Burundi',GE:'Georgia',
    AZ:'Azerbaiyán',AM:'Armenia',KZ:'Kazajistán',KG:'Kirguistán',
    TJ:'Tayikistán',TM:'Turkmenistán',MN:'Mongolia',LA:'Laos',
    MM:'Myanmar',LK:'Sri Lanka',BT:'Bután',BA:'Bosnia y Herzegovina',
    MK:'Macedonia del Norte',RS:'Serbia',ME:'Montenegro',SI:'Eslovenia',
    SK:'Eslovaquia',LT:'Lituania',LV:'Letonia',EE:'Estonia',BY:'Bielorrusia',
    MD:'Moldavia',CY:'Chipre',IS:'Islandia',LU:'Luxemburgo',
    DO:'Rep. Dominicana',TT:'Trinidad y Tobago',
  };

  // ── Datos cargados ────────────────────────────
  const countryObjects = [];
  let hoveredCountry  = null;
  let selectedCountry = null;

  function setMat(obj, mat) {
    obj.meshes.forEach(m => { m.material = mat.clone(); });
  }

  // ── Carga del mapa ────────────────────────────
  fetch('https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json')
    .then(r => r.json())
    .then(topo => {
      const geo = topojson.feature(topo, topo.objects.countries);
      geo.features.forEach(f => {
        const numId = String(f.id);
        const iso2  = NUM_TO_ISO[parseInt(numId)] || '';
        const name  = PAIS_ES[iso2] || iso2 || `País ${numId}`;

        const group     = new THREE.Group();
        const allMeshes = [];
        const polys = f.geometry.type === 'Polygon'
          ? [f.geometry.coordinates]
          : f.geometry.coordinates;

        polys.forEach(poly => {
          const { meshes, lines } = buildPoly(poly, GLOBE_R * 1.001);
          meshes.forEach(m => {
            m.userData = { iso2, name, numId };
            group.add(m);
            allMeshes.push(m);
          });
          lines.forEach(l => group.add(l));
        });

        globeGroup.add(group);
        countryObjects.push({ group, code: iso2, numId, name, meshes: allMeshes });
      });
    })
    .catch(err => console.error('Error cargando mapa:', err));

  // ── Raycaster ─────────────────────────────────
  const raycaster = new THREE.Raycaster();
  const mouse     = new THREE.Vector2();

  function getHit(e) {
    const rect = renderer.domElement.getBoundingClientRect();
    mouse.x =  ((e.clientX - rect.left) / rect.width)  * 2 - 1;
    mouse.y = -((e.clientY - rect.top)  / rect.height) * 2 + 1;
    raycaster.setFromCamera(mouse, camera);
    const allM = countryObjects.flatMap(o => o.meshes);
    const hits  = raycaster.intersectObjects(allM, false);
    if (!hits.length) return null;
    const d = hits[0].object.userData;
    return countryObjects.find(o => o.numId === d.numId) || null;
  }

  // ── Hover ─────────────────────────────────────
  renderer.domElement.addEventListener('mousemove', e => {
    if (isDragging) return;
    const obj = getHit(e);
    if (obj !== hoveredCountry) {
      if (hoveredCountry && hoveredCountry !== selectedCountry) setMat(hoveredCountry, MAT_DEFAULT);
      hoveredCountry = obj;
      if (obj && obj !== selectedCountry) {
        setMat(obj, MAT_HOVER);
        renderer.domElement.style.cursor = 'pointer';
      } else {
        renderer.domElement.style.cursor = isDragging ? 'grabbing' : 'grab';
      }
    }
  });

  // ── Click ─────────────────────────────────────
  let clickMovido = false;
  renderer.domElement.addEventListener('mousedown', () => { clickMovido = false; });
  renderer.domElement.addEventListener('mousemove', () => { clickMovido = true; });
  renderer.domElement.addEventListener('click', e => {
    if (clickMovido) return;
    const obj = getHit(e);
    if (!obj) return;
    if (selectedCountry && selectedCountry !== obj) setMat(selectedCountry, MAT_DEFAULT);
    selectedCountry = obj;
    setMat(obj, MAT_SELECTED);
    cargarEmisoras(obj.code, obj.name);
  });

  // ── Emisoras ──────────────────────────────────
  async function cargarEmisoras(code, name) {
    panel.classList.add('abierto');
    panelTitulo.textContent   = name || code || 'País';
    panelLista.innerHTML      = '';
    panelLoader.style.display = 'flex';

    if (!code) {
      panelLoader.style.display = 'none';
      panelLista.innerHTML = `<p class="panel-vacio">No hay datos de emisoras para esta región.</p>`;
      return;
    }

    // Radio Browser acepta ISO 2 directamente
    const urls = [
      `${RADIO_API}/stations/bycountrycodeexact/${code}?hidebroken=true&order=votes&reverse=true&limit=30`,
      `${RADIO_API}/stations/bycountry/${encodeURIComponent(name)}?hidebroken=true&order=votes&reverse=true&limit=30`,
    ];

    let stations = [];
    for (const url of urls) {
      try {
        const res = await fetch(url);
        stations  = await res.json();
        if (stations.length) break;
      } catch (_) {}
    }

    panelLoader.style.display = 'none';

    if (!stations.length) {
      panelLista.innerHTML = `<p class="panel-vacio">Sin emisoras registradas para <strong>${name}</strong>.<br>Prueba otro país.</p>`;
      return;
    }

    stations.forEach(st => {
      const item = document.createElement('div');
      item.className = 'em-item';
      const favicon = st.favicon
        ? `<img class="em-icon" src="${st.favicon}" alt="" onerror="this.outerHTML='<i class=\\'fas fa-radio em-icon-fa\\'></i>'">`
        : `<i class="fas fa-radio em-icon-fa"></i>`;
      const tags = st.tags ? st.tags.split(',').filter(Boolean).slice(0,3).join(' · ') : 'Radio';
      item.innerHTML = `
        <div class="em-info">
          ${favicon}
          <div>
            <p class="em-nombre">${st.name}</p>
            <p class="em-tags">${tags}</p>
          </div>
        </div>
        <button class="em-play control-btn" title="Reproducir">
          <i class="fas fa-play"></i>
        </button>`;
      const btn = item.querySelector('.em-play');
      btn.addEventListener('click', () =>
        reproducir(st.url_resolved || st.url, st.name, name, btn)
      );
      panelLista.appendChild(item);
    });
  }

  panelCerrar.addEventListener('click', () => {
    panel.classList.remove('abierto');
    aud.pause(); aud.src = ''; audioActivo = null;
    const elBtn = document.getElementById('rep-playpause');
    if (elBtn) elBtn.innerHTML = '<i class="fas fa-play"></i>';
    if (selectedCountry) { setMat(selectedCountry, MAT_DEFAULT); selectedCountry = null; }
  });

  // ── Drag ──────────────────────────────────────
  let isDragging = false;
  let prev       = { x: 0, y: 0 };
  let vel        = { x: 0, y: 0 };
  let autoRotate = true;
  let autoTimer  = null;

  renderer.domElement.addEventListener('mousedown', e => {
    isDragging = true; autoRotate = false;
    prev = { x: e.clientX, y: e.clientY };
    vel  = { x: 0, y: 0 };
    renderer.domElement.style.cursor = 'grabbing';
  });
  window.addEventListener('mousemove', e => {
    if (!isDragging) return;
    vel = { x: (e.clientY - prev.y) * 0.003, y: (e.clientX - prev.x) * 0.003 };
    globeGroup.rotation.x += vel.x;
    globeGroup.rotation.y += vel.y;
    prev = { x: e.clientX, y: e.clientY };
  });
  window.addEventListener('mouseup', () => {
    if (!isDragging) return;
    isDragging = false;
    renderer.domElement.style.cursor = 'grab';
    clearTimeout(autoTimer);
    autoTimer = setTimeout(() => { autoRotate = true; }, 2500);
  });

  // Touch
  let pt = null;
  renderer.domElement.addEventListener('touchstart', e => {
    pt = e.touches[0]; autoRotate = false; clickMovido = false;
  }, { passive: true });
  renderer.domElement.addEventListener('touchmove', e => {
    if (!pt) return; clickMovido = true;
    const dx = e.touches[0].clientX - pt.clientX;
    const dy = e.touches[0].clientY - pt.clientY;
    globeGroup.rotation.x += dy * 0.003;
    globeGroup.rotation.y += dx * 0.003;
    pt = e.touches[0];
  }, { passive: true });
  renderer.domElement.addEventListener('touchend', () => {
    pt = null;
    autoTimer = setTimeout(() => { autoRotate = true; }, 2500);
  });

  // ── Resize ────────────────────────────────────
  window.addEventListener('resize', () => {
    camera.aspect = W() / H();
    camera.updateProjectionMatrix();
    renderer.setSize(W(), H());
  });

  // ── Loop ──────────────────────────────────────
  function animate() {
    requestAnimationFrame(animate);
    if (autoRotate) {
      globeGroup.rotation.y += 0.0015;
    } else if (!isDragging) {
      vel.x *= 0.93; vel.y *= 0.93;
      globeGroup.rotation.x += vel.x;
      globeGroup.rotation.y += vel.y;
    }
    renderer.render(scene, camera);
  }
  animate();

})();