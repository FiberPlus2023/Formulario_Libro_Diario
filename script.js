const state = {
  cables: [],
  materials: [],
  tools: []
};

const groupOptions = {
  "Amarras o correas plásticas": ["10 cm", "15 cm", "35 cm", "55 cm"],
  "Anillos / argollas": ["Anillo de distribución o virolas", "Argollas de dispersión","Otro"],
  "Brazo farol": ["0.50 m", "1 m", "1,50 m", "2 m", "Otro"],
  "Cajas / NAP": ["Caja de distribución NAP de 16 puertos", "Otro"],
  "Cintas": ["Eriban rollo x 30 m 1/2", "Eriban rollo x 30 m 3/4", "Otro"],
  "Espirales": ["Espiral blanco x 10 m 1/4 - 6mm", "Espiral blanco x 10 m 3/8 - 9mm", "Otro"],
  "Galerías / soportes": ["Galería porta reserva", "Otro"],
  "Grilletes / guardacabos": ["Grilletes para cruce americano", "Guardacabo tipo U", "Thimble clevis (Guardacabo)", "Otro"],
  "Hebillas": ["Hebilla para cinta eriban 1/2", "Hebilla para cinta eriban 3/4", "Otro"],
  "Herrajes": ["Retención H1", "Retención H2", "Retención H3", "Retención H4", "B (Cónico)", "D (HD)", "Crucero para cruce americano", "Otro"],
  "Identificadores": ["Identificador acrílico 12,50 cm x 6 cm azul", "Otro"],
  "Kits de bajante": ["Kit de bajante de poste 3\" - 2 m", "Otro"],
  "Mangas porta splitter": ["48 a 96 hilos", "144 hilos", "Otro"],
  "Mangueras / manguitas": [
    "Manguera corrugada 3/4\" abr EMT",
    "Manguita termocontraíble de 40 mm", "Otro"
  ],
  "ODF (N° de puertos con pacheo lateral)": ["48", "96", "Otro"],
  "Postes": ["11 m x 350 kg", "12 m x 500 kg", "Otro"],
  "Preformados": [
    "Curvo para cable acero",
    "Helicoidal (11,8 - 12,6 mm)",
    "Helicoidal (12,6 - 13,1 mm)", "Otro"
  ],
  "Rack": ["Rack de piso 2,2 m 19\"", "Otro"],
  "Rondín": ["Rondín", "Otro"],
  "Splitters (1/8)": ["Conectorizado NAP", "No conectorizado", "Otro"]
};

const toolCatalog = {
  "EPP y seguridad": [
    "Casco",
    "Gorra",
    "Botas de seguridad",
    "Gafas",
    "Guantes multiflex",
    "Guantes de vaqueta",
    "Guantes nitrilo",
    "Botas de caucho",
    "Chaleco con reflectivo",
    "Cinturón de seguridad",
    "Botiquín primeros auxilios Tipo B"
  ],
  "Ropa de trabajo": [
    "Camisa",
    "Chaqueta",
    "Pantalón",
  ],
  "Herramientas manuales": [
    "Alicate universal aislado",
    "Segueta con marco",
    "Machete para poda",
    "Bisturí industrial",
    "Cinta métrica 50 mts",
    "Cortafrío industrial",
    "Cortatubo",
    "Cuchillo en acero inoxidable de 4\"",
    "Juego de destornilladores estrella y pala",
    "Juego de destornilladores perilleros",
    "Llave de expansión No. 10",
    "Llaves fijas varias medidas",
    "Martillo",
    "Pala con palo",
    "Pico con palo",
    "Pinzas con punta para corte",
    "Barras"
  ],
  "Herramientas de corte": [
    "Cortadora",
    "Cizalla"
  ],
  "Herramientas de medición": [
    "Multímetro AC/DC rango automático"
  ],
  "Herramientas eléctricas": [
    "Taladro percutor",
    "Extensión eléctrica de 20 mts",
    "Inversor",
    "Bomba de succión"
  ],
  "Equipos de fibra óptica": [
    "Empalmadora de fusión por arco eléctrico",
    "OTDR de rango dinámico 40 dB",
    "Power Meter PON",
    "Bobina de lanzamiento 1000 m",
    "Portabobinas"
  ],
  "Equipos de apoyo en campo": [
    "Escalera",
    "Linterna tipo minero y de mano",
    "Linterna con pilas",
    "Malacate (tensión mensajero)",
    "Antenalla / sapo / mordaza para tensión",
    "Zunchadora para cinta band-it",
    "Pértiga"
  ],
  "Señalización y trabajo en vía": [
    "Conos",
    "Cinta de advertencia"
  ],
  "Oficina y apoyo administrativo": [
    "Laptop",
    "Juego de útiles de escritorio",
    "Muebles de oficina"
  ]
};

function getEl(id) {
  return document.getElementById(id);
}

function getValue(id) {
  const el = getEl(id);
  if (!el) return "";
  return String(el.value ?? "").trim();
}

function safeFileName(inputId) {
  const input = getEl(inputId);
  return input && input.files && input.files[0] ? input.files[0].name : "";
}

function scrollToSection(id) {
  const element = getEl(id);
  if (element) {
    element.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

function showToast(message, type = "success") {
  let toast = document.querySelector(".message-toast");

  if (!toast) {
    toast = document.createElement("div");
    toast.className = "message-toast";
    document.body.appendChild(toast);
  }

  toast.textContent = message;
  toast.className = `message-toast ${type}`;
  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 3000);
}

function buildPreview() {
  return;
}

function switchCableType(type) {
  const tabs = document.querySelectorAll(".selector-tab");
  tabs.forEach(tab => tab.classList.remove("active"));

  const activeTab = document.querySelector(`.selector-tab[data-cable="${type}"]`);
  if (activeTab) activeTab.classList.add("active");

  const forms = document.querySelectorAll(".cable-form");
  forms.forEach(form => form.classList.remove("active"));

  const activeForm = getEl(`form-${type}`);
  if (activeForm) activeForm.classList.add("active");
}

function addCable(type) {
  let item = {};

  if (type === "fibra") {
    const tipo = getValue("fibraTipo");
    const bobina = getValue("fibraBobina");
    const hilos = getValue("fibraHilos");
    const despacho = getValue("fibraDespacho");
    const utilizado = getValue("fibraUtilizado");
    const puntoInicial = getValue("fibraPuntoInicial");
    const puntoFinal = getValue("fibraPuntoFinal");
    const devuelto = getValue("fibraDevuelto");

    if (!tipo && !bobina && !hilos && !despacho && !utilizado && !puntoInicial && !puntoFinal && !devuelto) {
      showToast("Por favor ingresa al menos un dato del cable", "warning");
      return;
    }

    item = {
      seccion: "Cable",
      categoria: "Fibra óptica",
      tipo: tipo || "-",
      detalle: bobina ? `Bobina: ${bobina}` : "-",
      hilos: hilos || "-",
      despacho: despacho || "0",
      utilizado: utilizado || "0",
      puntoInicial: puntoInicial || "0",
      puntoFinal: puntoFinal || "0",
      devuelto: devuelto || "0",
      fotoDespacho: safeFileName("fibraFotoDespacho"),
      fotoInicial: safeFileName("fibraFotoInicial"),
      fotoFinal: safeFileName("fibraFotoFinal"),
      fotoDevuelto: safeFileName("fibraFotoDevuelto")
    };
  }

  if (type === "cobre") {
    const tipo = getValue("cobreTipo");
    const despacho = getValue("cobreDespacho");
    const utilizado = getValue("cobreUtilizado");
    const puntoInicial = getValue("cobrePuntoInicial");
    const puntoFinal = getValue("cobrePuntoFinal");
    const devuelto = getValue("cobreDevuelto");

    if (!tipo && !despacho && !utilizado && !puntoInicial && !puntoFinal && !devuelto) {
      showToast("Por favor ingresa al menos un dato del cable", "warning");
      return;
    }

    item = {
      seccion: "Cable",
      categoria: "Cable cobre",
      tipo: tipo || "-",
      detalle: "-",
      hilos: "-",
      despacho: despacho || "0",
      utilizado: utilizado || "0",
      puntoInicial: puntoInicial || "0",
      puntoFinal: puntoFinal || "0",
      devuelto: devuelto || "0",
      fotoDespacho: safeFileName("cobreFotoDespacho"),
      fotoInicial: safeFileName("cobreFotoInicial"),
      fotoFinal: safeFileName("cobreFotoFinal"),
      fotoDevuelto: safeFileName("cobreFotoDevuelto")
    };
  }

  if (type === "acerado") {
    const despacho = getValue("aceradoM1");
    const utilizado = getValue("aceradoM2");

    if (!despacho && !utilizado) {
      showToast("Por favor ingresa al menos un dato del cable acerado", "warning");
      return;
    }

    item = {
      seccion: "Cable",
      categoria: "Cable acerado",
      tipo: "-",
      detalle: "-",
      hilos: "-",
      despacho: despacho || "0",
      utilizado: utilizado || "0",
      puntoInicial: "0",
      puntoFinal: "0",
      devuelto: "0",
      fotoDespacho: safeFileName("aceradoFotoDespacho"),
      fotoInicial: safeFileName("aceradoFotoUtilizado"),
      fotoFinal: "",
      fotoDevuelto: ""
    };
  }

  state.cables.push(item);
  renderCableList();
  clearCableFormOnly(type);
  showToast(`${item.categoria} agregado correctamente`, "success");
}

function clearCableForm(type) {
  const fields = {
    fibra: [
      "fibraTipo", "fibraBobina", "fibraHilos", "fibraDespacho",
      "fibraUtilizado", "fibraPuntoInicial", "fibraPuntoFinal",
      "fibraDevuelto", "fibraFotoDespacho", "fibraFotoInicial",
      "fibraFotoFinal", "fibraFotoDevuelto"
    ],
    cobre: [
      "cobreTipo", "cobreDespacho", "cobreUtilizado",
      "cobrePuntoInicial", "cobrePuntoFinal", "cobreDevuelto",
      "cobreFotoDespacho", "cobreFotoInicial", "cobreFotoFinal",
      "cobreFotoDevuelto"
    ],
    acerado: [
      "aceradoM1", "aceradoM2", "aceradoFotoDespacho", "aceradoFotoUtilizado"
    ]
  };

  if (fields[type]) {
    fields[type].forEach(id => {
      const el = getEl(id);
      if (!el) return;
      if (el.tagName === "SELECT") {
        el.selectedIndex = 0;
      } else {
        el.value = "";
      }
    });
  }
}

function renderCableList() {
  const container = getEl("cable-list");
  if (!container) return;

  if (!state.cables.length) {
    container.innerHTML = '<div class="empty-state"><i class="fas fa-plug"></i><br>No hay cables registrados aún</div>';
    return;
  }

  const rows = state.cables.map((item, idx) => `
    <tr>
      <td>${idx + 1}</td>
      <td>${item.categoria}</td>
      <td>${item.tipo !== "-" ? item.tipo : ""} ${item.detalle !== "-" ? item.detalle : ""}</td>
      <td>${item.hilos !== "-" ? `${item.hilos} hilos` : "-"}</td>
      <td>${item.despacho !== "0" ? `${item.despacho} m` : "-"}</td>
      <td>${item.utilizado !== "0" ? `${item.utilizado} m` : "-"}</td>
      <td>${item.puntoInicial !== "0" ? `${item.puntoInicial} m` : "-"}</td>
      <td>${item.puntoFinal !== "0" ? `${item.puntoFinal} m` : "-"}</td>
      <td>${item.devuelto !== "0" ? `${item.devuelto} m` : "-"}</td>
    </tr>
  `).join("");

  container.innerHTML = `
    <div class="list-wrap">
      <table class="list-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Tipo</th>
            <th>Detalle</th>
            <th>Hilos</th>
            <th>Despacho</th>
            <th>Usado</th>
            <th>P. Inicial</th>
            <th>P. Final</th>
            <th>Devuelto</th>
          </tr>
        </thead>
        <tbody>${rows}</tbody>
      </table>
    </div>
  `;
}

function handleGroupChange() {
  const group = getValue("materialGroup");
  const typeSelect = getEl("materialType");
  const typeLabel = getEl("materialTypeLabel");
  const otherLabel = getEl("materialOtherLabel");
  const otherInput = getEl("materialOther");
  const extensionGroup = getEl("brazoFarolExtensionGroup");
  const extensionSelect = getEl("brazoFarolExtension");

  if (!typeSelect) return;

  typeSelect.innerHTML = '<option value="">Seleccione</option>';

  const options = groupOptions[group] || [];
  options.forEach(option => {
    const opt = document.createElement("option");
    opt.value = option;
    opt.textContent = option;
    typeSelect.appendChild(opt);
  });

  if (group === "Brazo farol") {
    if (typeLabel) typeLabel.textContent = "Tipo de Ancho";
    if (otherLabel) otherLabel.textContent = "Otro ancho";
    if (otherInput) otherInput.placeholder = "Especifique otro ancho";
    if (extensionGroup) extensionGroup.style.display = "block";
  } else {
    if (typeLabel) typeLabel.textContent = "Detalle específico";
    if (otherLabel) otherLabel.textContent = "Tipo alterno / otro";
    if (otherInput) otherInput.placeholder = "Solo si no está en la lista";
    if (extensionGroup) extensionGroup.style.display = "none";
    if (extensionSelect) extensionSelect.value = "";
  }

  handleMaterialTypeChange();
}

function handleMaterialTypeChange() {
  const group = getValue("materialGroup");
  const type = getValue("materialType");
  const otherLabel = getEl("materialOtherLabel");
  const otherInput = getEl("materialOther");

  if (group === "Brazo farol" && type.toUpperCase() === "Otro") {
    if (otherLabel) otherLabel.textContent = "Especificar otro ancho";
    if (otherInput) otherInput.placeholder = "Ej. 2.50 m";
  } else if (group === "Brazo farol") {
    if (otherLabel) otherLabel.textContent = "Otro ancho";
    if (otherInput) otherInput.placeholder = "Solo si eliges OTRO";
  } else {
    if (otherLabel) otherLabel.textContent = "Tipo alterno / otro";
    if (otherInput) otherInput.placeholder = "Solo si no está en la lista";
  }
}

function addGroupMaterial() {
  const group = getValue("materialGroup");
  const type = getValue("materialType");
  const other = getValue("materialOther");
  const qty = getValue("materialQty");
  const obs = getValue("materialObs");
  const extension = getValue("brazoFarolExtension");

  if (!group) {
    showToast("Por favor selecciona el tipo de material", "warning");
    return;
  }

  if (!qty || Number(qty) <= 0) {
    showToast("Por favor ingresa una cantidad válida", "warning");
    return;
  }

  let finalType = "";
  let finalObs = obs || "-";

  if (group === "Brazo farol") {
    if (!type) {
      showToast("Por favor selecciona el tipo de ancho", "warning");
      return;
    }

    if (type.toUpperCase() === "OTRO" && !other) {
      showToast("Por favor especifica el otro ancho", "warning");
      return;
    }

    if (!extension) {
      showToast("Por favor selecciona el N° de extensión", "warning");
      return;
    }

    finalType = type.toUpperCase() === "OTRO" ? other : type;
    finalType = `${finalType} | ${extension}`;
  } else {
    if (!type && !other) {
      showToast("Por favor selecciona un tipo o escribe uno alterno", "warning");
      return;
    }

    finalType = type.toUpperCase() === "Otro" ? other : (other || type);
  }

  state.materials.push({
    seccion: "Material",
    grupo: group,
    tipo: finalType,
    cantidad: qty,
    observacion: finalObs,
    foto: safeFileName("materialFoto")
  });

  renderGroupMaterialList();
  clearGroupFormOnly();
  showToast("Material agregado correctamente", "success");
}

function clearGroupForm() {
  const materialGroup = getEl("materialGroup");
  const materialType = getEl("materialType");
  const materialQty = getEl("materialQty");
  const materialOther = getEl("materialOther");
  const materialObs = getEl("materialObs");
  const materialFoto = getEl("materialFoto");
  const materialTypeLabel = getEl("materialTypeLabel");
  const materialOtherLabel = getEl("materialOtherLabel");
  const brazoFarolExtensionGroup = getEl("brazoFarolExtensionGroup");
  const brazoFarolExtension = getEl("brazoFarolExtension");

  if (materialGroup) materialGroup.value = "";
  if (materialType) materialType.innerHTML = '<option value="">Primero selecciona el tipo</option>';
  if (materialQty) materialQty.value = "";
  if (materialOther) materialOther.value = "";
  if (materialObs) materialObs.value = "";
  if (materialFoto) materialFoto.value = "";

  if (materialTypeLabel) materialTypeLabel.textContent = "Detalle específico";
  if (materialOtherLabel) materialOtherLabel.textContent = "Tipo alterno / otro";
  if (materialOther) materialOther.placeholder = "Solo si no está en la lista";

  if (brazoFarolExtensionGroup) brazoFarolExtensionGroup.style.display = "none";
  if (brazoFarolExtension) brazoFarolExtension.value = "";
}

function renderGroupMaterialList() {
  const container = getEl("group-material-list");
  if (!container) return;

  if (!state.materials.length) {
    container.innerHTML = '<div class="empty-state"><i class="fas fa-boxes"></i><br>No hay materiales registrados aún</div>';
    return;
  }

  const rows = state.materials.map((item, idx) => `
    <tr>
      <td>${idx + 1}</td>
      <td>${item.grupo}</td>
      <td>${item.tipo}</td>
      <td><strong>${item.cantidad}</strong> und</td>
      <td>${item.observacion}${item.foto ? `<br><small>📸 ${item.foto}</small>` : ""}</td>
    </tr>
  `).join("");

  container.innerHTML = `
    <div class="list-wrap">
      <table class="list-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Grupo</th>
            <th>Detalle</th>
            <th>Cantidad</th>
            <th>Observación</th>
          </tr>
        </thead>
        <tbody>${rows}</tbody>
      </table>
    </div>
  `;
}

function handleToolGroupChange() {
  const group = getValue("toolGroup");
  const toolSelect = getEl("toolName");
  const otherDiv = getEl("divOtraHerramienta");
  const otherInput = getEl("otraHerramienta");

  if (!toolSelect) return;

  toolSelect.innerHTML = '<option value="">Seleccione</option>';

  const options = toolCatalog[group] || [];
  options.forEach(option => {
    const opt = document.createElement("option");
    opt.value = option;
    opt.textContent = option;
    toolSelect.appendChild(opt);
  });

  if (group) {
    const otherOption = document.createElement("option");
    otherOption.value = "OTRA_HERRAMIENTA";
    otherOption.textContent = "Otro";
    toolSelect.appendChild(otherOption);
  } else {
    toolSelect.innerHTML = '<option value="">Primero selecciona el grupo</option>';
  }

  if (otherDiv) otherDiv.style.display = "none";
  if (otherInput) otherInput.value = "";
}

function mostrarCampoOtraHerramienta() {
  const toolSelect = getEl("toolName");
  const divOtraHerramienta = getEl("divOtraHerramienta");
  const otraHerramientaInput = getEl("otraHerramienta");

  if (toolSelect && divOtraHerramienta && otraHerramientaInput) {
    if (toolSelect.value === "OTRA_HERRAMIENTA") {
      divOtraHerramienta.style.display = "block";
      otraHerramientaInput.required = true;
      otraHerramientaInput.focus();
    } else {
      divOtraHerramienta.style.display = "none";
      otraHerramientaInput.required = false;
      otraHerramientaInput.value = "";
    }
  }
}

// ====================
// LIMPIEZA INTELIGENTE
// ====================

function pedirAccionLimpieza(nombreSeccion) {
  return prompt(
    `Sección: ${nombreSeccion}\n\n` +
    `Escribe una opción:\n` +
    `1 = Limpiar solo los campos\n` +
    `2 = Eliminar un registro del historial\n` +
    `3 = Eliminar todo el historial de esta sección\n` +
    `4 = Cancelar`
  );
}

// ====================
// CABLES
// ====================

function clearCableFormOnly(type) {
  const fields = {
    fibra: [
      'fibraTipo', 'fibraBobina', 'fibraHilos', 'fibraDespacho',
      'fibraUtilizado', 'fibraPuntoInicial', 'fibraPuntoFinal',
      'fibraDevuelto', 'fibraFotoDespacho', 'fibraFotoInicial',
      'fibraFotoFinal', 'fibraFotoDevuelto'
    ],
    cobre: [
      'cobreTipo', 'cobreDespacho', 'cobreUtilizado',
      'cobrePuntoInicial', 'cobrePuntoFinal', 'cobreDevuelto',
      'cobreFotoDespacho', 'cobreFotoInicial', 'cobreFotoFinal',
      'cobreFotoDevuelto'
    ],
    acerado: [
      'aceradoM1', 'aceradoM2', 'aceradoFotoDespacho', 'aceradoFotoUtilizado'
    ]
  };

  if (fields[type]) {
    fields[type].forEach(id => {
      const el = getEl(id);
      if (!el) return;

      if (el.tagName === 'SELECT') {
        el.selectedIndex = 0;
      } else {
        el.value = '';
      }
    });
  }
}

function clearCableForm(type) {
  const accion = pedirAccionLimpieza(`Cables (${type})`);
  if (!accion || accion === '4') return;

  if (accion === '1') {
    clearCableFormOnly(type);
    showToast('Campos de cable limpiados', 'info');
    return;
  }

  if (accion === '2') {
    if (!state.cables.length) {
      showToast('No hay registros de cables para eliminar', 'warning');
      return;
    }

    const listado = state.cables
      .map((item, i) => `${i + 1}. ${item.categoria} - ${item.tipo !== '-' ? item.tipo : item.detalle}`)
      .join('\n');

    const indice = prompt(`Historial de cables:\n\n${listado}\n\nEscribe el número del registro a eliminar:`);

    if (!indice) return;

    const pos = Number(indice) - 1;
    if (isNaN(pos) || pos < 0 || pos >= state.cables.length) {
      showToast('Número inválido', 'error');
      return;
    }

    state.cables.splice(pos, 1);
    renderCableList();
    showToast('Registro de cable eliminado', 'success');
    return;
  }

  if (accion === '3') {
    if (!state.cables.length) {
      showToast('No hay historial de cables para eliminar', 'warning');
      return;
    }

    if (confirm('¿Seguro que deseas eliminar todo el historial de cables?')) {
      state.cables = [];
      renderCableList();
      showToast('Historial de cables eliminado', 'success');
    }
    return;
  }

  showToast('Opción no válida', 'error');
}

// ====================
// MATERIALES
// ====================

function clearGroupFormOnly() {
  const materialGroup = getEl('materialGroup');
  const materialType = getEl('materialType');
  const materialQty = getEl('materialQty');
  const materialOther = getEl('materialOther');
  const materialObs = getEl('materialObs');
  const materialFoto = getEl('materialFoto');
  const materialTypeLabel = getEl('materialTypeLabel');
  const materialOtherLabel = getEl('materialOtherLabel');
  const brazoFarolExtensionGroup = getEl('brazoFarolExtensionGroup');
  const brazoFarolExtension = getEl('brazoFarolExtension');

  if (materialGroup) materialGroup.value = '';
  if (materialType) materialType.innerHTML = '<option value="">Primero selecciona el tipo</option>';
  if (materialQty) materialQty.value = '';
  if (materialOther) materialOther.value = '';
  if (materialObs) materialObs.value = '';
  if (materialFoto) materialFoto.value = '';

  if (materialTypeLabel) materialTypeLabel.textContent = 'Detalle específico';
  if (materialOtherLabel) materialOtherLabel.textContent = 'Tipo alterno / otro';
  if (materialOther) materialOther.placeholder = 'Solo si no está en la lista';

  if (brazoFarolExtensionGroup) brazoFarolExtensionGroup.style.display = 'none';
  if (brazoFarolExtension) brazoFarolExtension.value = '';
}

function clearGroupForm() {
  const accion = pedirAccionLimpieza('Materiales');
  if (!accion || accion === '4') return;

  if (accion === '1') {
    clearGroupFormOnly();
    showToast('Campos de materiales limpiados', 'info');
    return;
  }

  if (accion === '2') {
    if (!state.materials.length) {
      showToast('No hay registros de materiales para eliminar', 'warning');
      return;
    }

    const listado = state.materials
      .map((item, i) => `${i + 1}. ${item.grupo} - ${item.tipo}`)
      .join('\n');

    const indice = prompt(`Historial de materiales:\n\n${listado}\n\nEscribe el número del registro a eliminar:`);

    if (!indice) return;

    const pos = Number(indice) - 1;
    if (isNaN(pos) || pos < 0 || pos >= state.materials.length) {
      showToast('Número inválido', 'error');
      return;
    }

    state.materials.splice(pos, 1);
    renderGroupMaterialList();
    showToast('Registro de material eliminado', 'success');
    return;
  }

  if (accion === '3') {
    if (!state.materials.length) {
      showToast('No hay historial de materiales para eliminar', 'warning');
      return;
    }

    if (confirm('¿Seguro que deseas eliminar todo el historial de materiales?')) {
      state.materials = [];
      renderGroupMaterialList();
      showToast('Historial de materiales eliminado', 'success');
    }
    return;
  }

  showToast('Opción no válida', 'error');
}

// ====================
// HERRAMIENTAS
// ====================

function clearToolForm() {
  const accion = pedirAccionLimpieza('Herramientas');
  if (!accion || accion === '4') return;

  if (accion === '1') {
    clearToolFormOnly();
    showToast('Campos de herramientas limpiados', 'info');
    return;
  }

  if (accion === '2') {
    if (!state.tools.length) {
      showToast('No hay registros de herramientas para eliminar', 'warning');
      return;
    }

    const listado = state.tools
      .map((item, i) => `${i + 1}. ${item.grupo} - ${item.herramienta}`)
      .join('\n');

    const indice = prompt(`Historial de herramientas:\n\n${listado}\n\nEscribe el número del registro a eliminar:`);

    if (!indice) return;

    const pos = Number(indice) - 1;
    if (isNaN(pos) || pos < 0 || pos >= state.tools.length) {
      showToast('Número inválido', 'error');
      return;
    }

    state.tools.splice(pos, 1);
    renderToolList();
    showToast('Registro de herramienta eliminado', 'success');
    return;
  }

  if (accion === '3') {
    if (!state.tools.length) {
      showToast('No hay historial de herramientas para eliminar', 'warning');
      return;
    }

    if (confirm('¿Seguro que deseas eliminar todo el historial de herramientas?')) {
      state.tools = [];
      renderToolList();
      showToast('Historial de herramientas eliminado', 'success');
    }
    return;
  }

  showToast('Opción no válida', 'error');
}






function addTool() {
  const group = getValue("toolGroup");
  let tool = getValue("toolName");
  const customTool = getValue("otraHerramienta");
  const qty = getValue("toolQty");
  const obs = getValue("toolObs");

  if (!group) {
    showToast("Por favor selecciona el grupo de herramientas", "warning");
    return;
  }

  if (!tool) {
    showToast("Por favor selecciona una herramienta", "warning");
    return;
  }

  if (tool === "OTRA_HERRAMIENTA") {
    if (!customTool) {
      showToast("Por favor escribe la otra herramienta", "warning");
      return;
    }
    tool = customTool;
  }

  if (!qty || Number(qty) <= 0) {
    showToast("Por favor ingresa una cantidad válida", "warning");
    return;
  }

  state.tools.push({
    seccion: "Herramientas",
    grupo: group,
    herramienta: tool,
    cantidad: qty,
    observacion: obs || "-",
    foto: safeFileName("toolFoto")
  });

  renderToolList();
  clearToolFormOnly();
  showToast("Herramienta agregada correctamente", "success");
}

// ====================
// HERRAMIENTAS
// ====================

function clearToolFormOnly() {
  const toolGroup = getEl("toolGroup");
  const toolName = getEl("toolName");
  const otraHerramienta = getEl("otraHerramienta");
  const toolQty = getEl("toolQty");
  const toolObs = getEl("toolObs");
  const toolFoto = getEl("toolFoto");
  const divOtraHerramienta = getEl("divOtraHerramienta");

  if (toolGroup) toolGroup.value = "";
  if (toolName) toolName.innerHTML = '<option value="">Primero selecciona el grupo</option>';
  if (otraHerramienta) otraHerramienta.value = "";
  if (toolQty) toolQty.value = "";
  if (toolObs) toolObs.value = "";
  if (toolFoto) toolFoto.value = "";
  if (divOtraHerramienta) divOtraHerramienta.style.display = "none";
}

function clearToolForm() {
  const accion = pedirAccionLimpieza("Herramientas");
  if (!accion || accion === "4") return;

  if (accion === "1") {
    clearToolFormOnly();
    showToast("Campos de herramientas limpiados", "info");
    return;
  }

  if (accion === "2") {
    if (!state.tools.length) {
      showToast("No hay registros de herramientas para eliminar", "warning");
      return;
    }

    const listado = state.tools
      .map((item, i) => `${i + 1}. ${item.grupo} - ${item.herramienta}`)
      .join("\n");

    const indice = prompt(
      `Historial de herramientas:\n\n${listado}\n\nEscribe el número del registro a eliminar:`
    );

    if (!indice) return;

    const pos = Number(indice) - 1;
    if (isNaN(pos) || pos < 0 || pos >= state.tools.length) {
      showToast("Número inválido", "error");
      return;
    }

    state.tools.splice(pos, 1);
    renderToolList();
    showToast("Registro de herramienta eliminado", "success");
    return;
  }

  if (accion === "3") {
    if (!state.tools.length) {
      showToast("No hay historial de herramientas para eliminar", "warning");
      return;
    }

    if (confirm("¿Seguro que deseas eliminar todo el historial de herramientas?")) {
      state.tools = [];
      renderToolList();
      showToast("Historial de herramientas eliminado", "success");
    }
    return;
  }

  showToast("Opción no válida", "error");
}

function addTool() {
  const group = getValue("toolGroup");
  let tool = getValue("toolName");
  const customTool = getValue("otraHerramienta");
  const qty = getValue("toolQty");
  const obs = getValue("toolObs");

  if (!group) {
    showToast("Por favor selecciona el grupo de herramientas", "warning");
    return;
  }

  if (!tool) {
    showToast("Por favor selecciona una herramienta", "warning");
    return;
  }

  if (tool === "OTRA_HERRAMIENTA") {
    if (!customTool) {
      showToast("Por favor escribe la otra herramienta", "warning");
      return;
    }
    tool = customTool;
  }

  if (!qty || Number(qty) <= 0) {
    showToast("Por favor ingresa una cantidad válida", "warning");
    return;
  }

  state.tools.push({
    seccion: "Herramientas",
    grupo: group,
    herramienta: tool,
    cantidad: qty,
    observacion: obs || "-",
    foto: safeFileName("toolFoto")
  });

  renderToolList();
  clearToolFormOnly();
  showToast("Herramienta agregada correctamente", "success");
}

function renderToolList() {
  const container = getEl("tool-list");
  if (!container) return;

  if (!state.tools.length) {
    container.innerHTML = '<div class="empty-state"><i class="fas fa-tools"></i><br>No hay herramientas registradas aún</div>';
    return;
  }

  const rows = state.tools.map((item, idx) => `
    <tr>
      <td>${idx + 1}</td>
      <td>${item.grupo}</td>
      <td>${item.herramienta}</td>
      <td><strong>${item.cantidad}</strong> und</td>
      <td>${item.observacion}${item.foto ? `<br><small>📸 ${item.foto}</small>` : ""}</td>
    </tr>
  `).join("");

  container.innerHTML = `
    <div class="list-wrap">
      <table class="list-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Grupo</th>
            <th>Herramienta</th>
            <th>Cantidad</th>
            <th>Observación</th>
          </tr>
        </thead>
        <tbody>${rows}</tbody>
      </table>
    </div>
  `;
}

function mostrarCampoOtroCliente() {
  const clienteSelect = getEl("cliente");
  const divOtroCliente = getEl("divOtroCliente");
  const otroClienteInput = getEl("otroCliente");

  if (clienteSelect && divOtroCliente && otroClienteInput) {
    if (clienteSelect.value === "OTROS") {
      divOtroCliente.style.display = "block";
      otroClienteInput.required = true;
      otroClienteInput.focus();
    } else {
      divOtroCliente.style.display = "none";
      otroClienteInput.required = false;
      otroClienteInput.value = "";
    }
  }
}

function getHeaderData() {
  let cliente = getValue("cliente");
  const otroCliente = getValue("otroCliente");

  if (cliente === "OTROS" && otroCliente) {
    cliente = otroCliente;
  }

  const supervisorNombre = getValue("supervisorNombre");
  const supervisorApellido = getValue("supervisorApellido");
  const supervisor = `${supervisorNombre} ${supervisorApellido}`.trim();

  return {
    fecha: getValue("fecha"),
    ciudad: getValue("ciudad"),
    supervisor: supervisor,
    liderCuadrilla: getValue("lider"),
    cliente: cliente,
    tarea: getValue("tarea"),
    observacionesGenerales: getValue("observacionesGenerales")
  };
}

function enviarFormulario() {
  const header = getHeaderData();

  if (!header.fecha) {
    showToast("Por favor selecciona la fecha antes de enviar", "warning");
    return;
  }

  const payload = {
    datosGenerales: header,
    cables: state.cables,
    materiales: state.materials,
    herramientas: state.tools
  };

  console.log("Formulario enviado:", payload);
  showToast("Formulario listo y enviado correctamente", "success");
}

function resetAll() {
  if (!confirm("⚠️ ¿Seguro que quieres limpiar todos los datos registrados?\n\nEsta acción no se puede deshacer.")) return;

  document.querySelectorAll("input, textarea").forEach(el => {
    el.value = "";
  });

  document.querySelectorAll("select").forEach(el => {
    el.selectedIndex = 0;
  });

  state.cables = [];
  state.materials = [];
  state.tools = [];

  const materialType = getEl("materialType");
  if (materialType) materialType.innerHTML = '<option value="">Primero selecciona el tipo</option>';

  const toolName = getEl("toolName");
  if (toolName) toolName.innerHTML = '<option value="">Primero selecciona el grupo</option>';

  const divOtroCliente = getEl("divOtroCliente");
  if (divOtroCliente) divOtroCliente.style.display = "none";

  const divOtraHerramienta = getEl("divOtraHerramienta");
  if (divOtraHerramienta) divOtraHerramienta.style.display = "none";

  const brazoFarolExtensionGroup = getEl("brazoFarolExtensionGroup");
  if (brazoFarolExtensionGroup) brazoFarolExtensionGroup.style.display = "none";

  renderCableList();
  renderGroupMaterialList();
  renderToolList();

  showToast("Todos los datos han sido eliminados", "info");
}

document.addEventListener("DOMContentLoaded", function () {
  renderCableList();
  renderGroupMaterialList();
  renderToolList();

  const materialGroup = getEl("materialGroup");
  if (materialGroup) {
    materialGroup.addEventListener("change", handleGroupChange);
  }

  const materialType = getEl("materialType");
  if (materialType) {
    materialType.addEventListener("change", handleMaterialTypeChange);
  }

  const toolGroup = getEl("toolGroup");
  if (toolGroup) {
    toolGroup.addEventListener("change", handleToolGroupChange);
  }

  const clienteSelect = getEl("cliente");
  if (clienteSelect) {
    clienteSelect.addEventListener("change", mostrarCampoOtroCliente);
  }

  const cableTabs = document.querySelectorAll(".selector-tab");
  cableTabs.forEach(tab => {
    tab.addEventListener("click", function (e) {
      e.preventDefault();
      const cableType = this.getAttribute("data-cable");
      if (cableType) {
        switchCableType(cableType);
      }
    });
  });
});
