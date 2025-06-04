window.addEventListener('DOMContentLoaded', () => {
  // Crear canvas dinámicamente
  const container = document.getElementById('drawing-container');
  const canvasEl = document.createElement('canvas');
  canvasEl.id = 'canvas';
  canvasEl.width = window.innerWidth;
  canvasEl.height = window.innerHeight;
  container.appendChild(canvasEl);

  // Inicializar Fabric.js
  window.canvas = new fabric.Canvas('canvas', {
    backgroundColor: '#f5f5f5',
    isDrawingMode: false
  });
  canvas.freeDrawingBrush.color = '#000';
  canvas.freeDrawingBrush.width = 2;

  function guardarProyecto() {
  const modal = document.getElementById("nombre-proyecto-modal");
  const input = document.getElementById("nombre-input");

  input.value = "";
  modal.style.display = "flex";

  document.getElementById("confirmar-guardar").onclick = () => {
    const nombre = input.value.trim();
    if (!nombre) {
      alert("Escribe un nombre válido");
      return;
    }

    const json = JSON.stringify(canvas.toJSON());
    const imagen = canvas.toDataURL({ format: 'png' });

    let proyectos = JSON.parse(localStorage.getItem('proyectos') || '[]');
    const existenteIndex = proyectos.findIndex(p => p.nombre === nombre);

    if (existenteIndex !== -1) {
      const confirmar = confirm("Ya existe un proyecto con ese nombre. ¿Quieres sobrescribirlo?");
      if (!confirmar) return;
      proyectos[existenteIndex] = { nombre, imagen, json };
    } else {
      proyectos.push({ nombre, imagen, json });
    }

    localStorage.setItem('proyectos', JSON.stringify(proyectos));
    modal.style.display = "none";
    window.location.href = '../Proyectos/proyectos.html';
  };

  document.getElementById("cancelar-guardar").onclick = () => {
    modal.style.display = "none";
  };
}

  
  // Cargar proyecto si fue seleccionado
  const proyectosGuardados = JSON.parse(localStorage.getItem('proyectos') || '[]');
  const indexSeleccionado = localStorage.getItem('proyectoActual');
  if (indexSeleccionado !== null && proyectosGuardados[indexSeleccionado]) {
    const json = JSON.parse(proyectosGuardados[indexSeleccionado].json);
    canvas.loadFromJSON(json, () => {
      canvas.renderAll();
    });
  }

  // Variables de dibujo de línea
  let isDrawingLine = false;
  let lineStart = null;
  let tempLine = null;

  function desactivarLineaRecta() {
    isDrawingLine = false;
    lineStart = null;
    tempLine = null;
    canvas.defaultCursor = 'default';
  }

  function agregarHexagono(x, y, r = 40) {
    const puntos = [];
    for (let i = 0; i < 6; i++) {
      const ang = (Math.PI / 3) * i;
      puntos.push({ x: r * Math.cos(ang), y: r * Math.sin(ang) });
    }
    const hex = new fabric.Polygon(puntos, {
      left: x, top: y,
      fill: '', stroke: '#000',
      strokeWidth: 2,
      originX: 'center', originY: 'center'
    });
    canvas.add(hex);
    autoajustarObjeto(hex);
  }

  function agregarHexagonoConEnlaces(x, y, r = 40) {
    const puntos = [];
    const lados = 6;
    for (let i = 0; i < lados; i++) {
      const ang = (Math.PI * 2 / lados) * i;
      puntos.push({
        x: x + r * Math.cos(ang),
        y: y + r * Math.sin(ang)
      });
    }

    const hex = new fabric.Polygon(
      puntos.map(p => ({ x: p.x - x, y: p.y - y })), {
        left: x,
        top: y,
        fill: '',
        stroke: '#000',
        strokeWidth: 2,
        originX: 'center',
        originY: 'center'
      }
    );

    const enlaces = [];
    const offsetInterno = -6;
    const acortar = 8;

    for (let i of [0, 2, 4]) {
      const p1 = puntos[i];
      const p2 = puntos[(i + 1) % lados];

      const dx = p2.x - p1.x;
      const dy = p2.y - p1.y;
      const len = Math.hypot(dx, dy);
      const ux = dx / len;
      const uy = dy / len;

      const perpX = uy * offsetInterno;
      const perpY = -ux * offsetInterno;

      const startX = p1.x + perpX + ux * acortar;
      const startY = p1.y + perpY + uy * acortar;
      const endX = p2.x + perpX - ux * acortar;
      const endY = p2.y + perpY - uy * acortar;

      const linea = new fabric.Line([startX, startY, endX, endY], {
        stroke: '#000',
        strokeWidth: 2,
        selectable: false,
        evented: false
      });

      enlaces.push(linea);
    }

    const grupo = new fabric.Group([hex, ...enlaces], {
      left: x,
      top: y,
      originX: 'center',
      originY: 'center',
      hasControls: true
    });

    canvas.add(grupo);
    autoajustarObjeto(grupo);
  }

  function agregarPentagono(x, y, r = 40) {
    const puntos = [];
    for (let i = 0; i < 5; i++) {
      const ang = (2 * Math.PI / 5) * i - Math.PI / 2;
      puntos.push({ x: r * Math.cos(ang), y: r * Math.sin(ang) });
    }

    const pentagono = new fabric.Polygon(puntos, {
      left: x, top: y,
      fill: '', stroke: '#000',
      strokeWidth: 2,
      originX: 'center', originY: 'center'
    });

    canvas.add(pentagono);
    autoajustarObjeto(pentagono);
  }

  function agregarDobleLinea(canvas, x = canvas.getWidth() / 2, y = canvas.getHeight() / 2, length = 100, separation = 8) {
    const line1 = new fabric.Line([x - length / 2, y - separation, x + length / 2, y - separation], {
      stroke: '#000',
      strokeWidth: 2,
      selectable: true,
      evented: true
    });

    const line2 = new fabric.Line([x - length / 2, y + separation, x + length / 2, y + separation], {
      stroke: '#000',
      strokeWidth: 2,
      selectable: true,
      evented: true
    });

    const grupo = new fabric.Group([line1, line2], {
      left: x,
      top: y,
      originX: 'center',
      originY: 'center',
      hasControls: true
    });

    canvas.add(grupo);
    autoajustarObjeto(grupo);
  }

  function agregarTexto(canvas, texto = ' ', x = canvas.getWidth() / 2, y = canvas.getHeight() / 2) {
    const objetoTexto = new fabric.IText(texto, {
      left: x,
      top: y,
      fill: '#000',
      fontSize: 24,
      fontWeight: 'bold',
      fontFamily: 'Arial',
      selectable: true,
      originX: 'center',
      originY: 'center'
    });

    canvas.add(objetoTexto);
    canvas.setActiveObject(objetoTexto);
    canvas.renderAll();
    setTimeout(() => objetoTexto.enterEditing(), 100);
  }

  function borrarSeleccion() {
    const activeObject = canvas.getActiveObject();

    if (!activeObject) return;

    if (activeObject.type === 'activeSelection') {
      activeObject.forEachObject(obj => canvas.remove(obj));
    } else if (activeObject.type === 'group') {
      const items = activeObject._objects;
      canvas.remove(activeObject);
      items.forEach(obj => canvas.remove(obj));
    } else {
      canvas.remove(activeObject);
    }

    canvas.discardActiveObject();
    canvas.requestRenderAll();
  }

  function snapToNearby(obj, threshold = 15) {
    const objCenter = obj.getCenterPoint();

    canvas.getObjects().forEach(other => {
      if (other === obj) return;

      const otherCenter = other.getCenterPoint();

      let snapped = false;

      if (Math.abs(objCenter.x - otherCenter.x) < threshold) {
        obj.setPositionByOrigin(new fabric.Point(otherCenter.x, objCenter.y), 'center', 'center');
        snapped = true;
      }

      if (Math.abs(objCenter.y - otherCenter.y) < threshold) {
        obj.setPositionByOrigin(new fabric.Point(obj.getCenterPoint().x, otherCenter.y), 'center', 'center');
        snapped = true;
      }

      if (snapped) obj.setCoords();
    });

    canvas.renderAll();
  }



  // Eventos del canvas
  canvas.on('mouse:down', function (opt) {
    if (!isDrawingLine) return;

    const pointer = canvas.getPointer(opt.e);

    if (!lineStart) {
      lineStart = { x: pointer.x, y: pointer.y };
      tempLine = new fabric.Line([lineStart.x, lineStart.y, lineStart.x, lineStart.y], {
        stroke: 'black',
        strokeWidth: 2,
        selectable: true,
        evented: true
      });
      canvas.add(tempLine);
    } else {
      tempLine.set({ x2: pointer.x, y2: pointer.y });
      tempLine.setCoords();
      tempLine = null;
      lineStart = null;
    }
  });

  canvas.on('mouse:move', function (opt) {
    if (!isDrawingLine || !tempLine) return;
    const pointer = canvas.getPointer(opt.e);
    tempLine.set({ x2: pointer.x, y2: pointer.y });
    canvas.renderAll();
  });

  canvas.on('object:moving', function (e) {
    const obj = e.target;
    snapToNearby(obj);
  });

  // Botones de UI
  document.getElementById('hexagonLines-btn').addEventListener('click', () => {
    desactivarLineaRecta();
    agregarHexagonoConEnlaces(window.innerWidth / 2, window.innerHeight / 2);
  });

  document.getElementById('hexagon-btn').addEventListener('click', () => {
    desactivarLineaRecta();
    agregarHexagono(window.innerWidth / 2, window.innerHeight / 2);
  });

  document.getElementById('pentagon-btn').addEventListener('click', () => {
    desactivarLineaRecta();
    agregarPentagono(window.innerWidth / 2, window.innerHeight / 2);
  });

  document.getElementById('double-line-btn').addEventListener('click', () => {
    desactivarLineaRecta();
    agregarDobleLinea(canvas);
  });

  document.getElementById('text-btn').addEventListener('click', () => {
    desactivarLineaRecta();
    agregarTexto(canvas);
  });

  document.getElementById('save-btn').addEventListener('click', guardarProyecto);

  document.getElementById('free-draw-btn').addEventListener('click', () => {
    isDrawingLine = !isDrawingLine;
    canvas.defaultCursor = isDrawingLine ? 'crosshair' : 'default';
    lineStart = null;
    tempLine = null;
  });

  document.getElementById('clear-btn').addEventListener('click', () => canvas.clear());

  document.addEventListener('keydown', function (e) {
    const obj = canvas.getActiveObject();
    if (obj && obj.isEditing) return;

    if (e.key === 'Delete' || e.key === 'Backspace') {
      e.preventDefault();
      borrarSeleccion();
    }
  });

  window.addEventListener('resize', () => {
    canvasEl.width = window.innerWidth;
    canvasEl.height = window.innerHeight;
    canvas.setWidth(window.innerWidth);
    canvas.setHeight(window.innerHeight);
  });

  function autoajustarObjeto(obj) {
    const maxW = canvas.getWidth() * 0.6;
    const maxH = canvas.getHeight() * 0.6;
    const escalaW = maxW / obj.width;
    const escalaH = maxH / obj.height;
    const escala = Math.min(1, escalaW, escalaH);

    obj.scale(escala);
    obj.set({
      left: canvas.getWidth() / 2,
      top: canvas.getHeight() / 2,
      originX: 'center',
      originY: 'center'
    });

    canvas.renderAll();
  }
  window.irAtras = function () {
  window.history.back();
  };

});
