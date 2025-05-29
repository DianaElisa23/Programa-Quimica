window.addEventListener('DOMContentLoaded', () => {
  // Creamos un <canvas> dentro de #drawing-container
  const container = document.getElementById('drawing-container');
  const canvasEl = document.createElement('canvas');
  canvasEl.id = 'canvas';
  canvasEl.width = window.innerWidth;
  canvasEl.height = window.innerHeight;
  container.appendChild(canvasEl);

  // Inicializamos Fabric.js
  const canvas = new fabric.Canvas('canvas', {
    backgroundColor: '#f5f5f5',
    isDrawingMode: false
  });
  canvas.freeDrawingBrush.color = '#000';
  canvas.freeDrawingBrush.width = 2;

  let isDrawingLine = false;
  let lineStart = null;
  let tempLine = null;

  

  // Hexágono: 6 lados
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
    autoajustarObjeto(grupo);
  }

function agregarHexagonoConEnlaces(x, y, r = 40) {
  const puntos = [];
  const lados = 6;

  // Generar vértices del hexágono
  for (let i = 0; i < lados; i++) {
    const ang = (Math.PI * 2 / lados) * i;
    puntos.push({
      x: x + r * Math.cos(ang),
      y: y + r * Math.sin(ang)
    });
  }

  // Hexágono base
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
  const offsetInterno = -6; // hacia adentro
  const acortar = 8; // cuánto se acortan las líneas en cada extremo

  for (let i of [0, 2, 4]) {
    const p1 = puntos[i];
    const p2 = puntos[(i + 1) % lados];

    // Vector del lado
    const dx = p2.x - p1.x;
    const dy = p2.y - p1.y;
    const len = Math.hypot(dx, dy);
    const ux = dx / len;
    const uy = dy / len;

    // Vector perpendicular hacia adentro
    const perpX = uy * offsetInterno;
    const perpY = -ux * offsetInterno;

    // Punto de inicio y fin acortados
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
    const ang = (2 * Math.PI / 5) * i - Math.PI / 2; // Rota para que uno de los vértices quede arriba
    puntos.push({ x: r * Math.cos(ang), y: r * Math.sin(ang) });
  }

  const pentagono = new fabric.Polygon(puntos, {
    left: x, top: y,
    fill: '', stroke: '#000',
    strokeWidth: 2,
    originX: 'center', originY: 'center'
  });

  canvas.add(pentagono);
  autoajustarObjeto(grupo);
}


function borrarSeleccion() {
  const seleccion = canvas.getActiveObject();
  if (!seleccion) return;

  if (seleccion.type === 'activeSelection') {
    seleccion.forEachObject(obj => canvas.remove(obj));
  } else {
    canvas.remove(seleccion);
  }

  canvas.discardActiveObject();
  canvas.requestRenderAll();
}


// Al hacer clic en el canvas
canvas.on('mouse:down', function (opt) {
  if (!isDrawingLine) return;

  const pointer = canvas.getPointer(opt.e);

  if (!lineStart) {
    // Primer clic: iniciamos línea
    lineStart = { x: pointer.x, y: pointer.y };
    tempLine = new fabric.Line(
      [lineStart.x, lineStart.y, lineStart.x, lineStart.y],
      {
        stroke: 'black',
        strokeWidth: 2,
        selectable: true,
        evented: true,
      }
    );
    canvas.add(tempLine);
  } else {
    // Segundo clic: fijamos el extremo y limpiamos estado
    tempLine.set({ x2: pointer.x, y2: pointer.y });
    tempLine.setCoords();
    tempLine = null;
    lineStart = null;
  }
});

// Mientras se mueve el ratón, se actualiza la previsualización
canvas.on('mouse:move', function (opt) {
  if (!isDrawingLine || !tempLine) return;
  const pointer = canvas.getPointer(opt.e);
  tempLine.set({ x2: pointer.x, y2: pointer.y });
  canvas.renderAll();
});





  // Botones
  document.getElementById('hexagonLines-btn')
    .addEventListener('click', () => agregarHexagonoConEnlaces(window.innerWidth/2, window.innerHeight/2));
  document.getElementById('hexagon-btn')
    .addEventListener('click', () => agregarHexagono(window.innerWidth/2, window.innerHeight/2));

  document.getElementById('pentagon-btn')
    .addEventListener('click', () => agregarPentagono(window.innerWidth/2, window.innerHeight/2));
  
// Botón para alternar modo línea
  document.getElementById('free-draw-btn')
   .addEventListener('click', () => {
    isDrawingLine = !isDrawingLine;
    canvas.defaultCursor = isDrawingLine ? 'crosshair' : 'default';
    // Reiniciar si estábamos a medias
    lineStart = null;
    tempLine = null;
  });


  document.getElementById('clear-btn')
    .addEventListener('click', () => canvas.clear());
  

  document.addEventListener('keydown', function(e) {
    if (e.key === 'Delete' || e.key === 'Backspace') {
      borrarSeleccion();
    }
  });


  
  // Redimensionar al cambiar tamaño de ventana
  window.addEventListener('resize', () => {
    canvasEl.width = window.innerWidth;
    canvasEl.height = window.innerHeight;
    canvas.setWidth(window.innerWidth);
    canvas.setHeight(window.innerHeight);
  });

});

function autoajustarObjeto(obj) {
  // Escala y centra el objeto dentro del canvas
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

function irAtras() {
    window.history.back();
  }


