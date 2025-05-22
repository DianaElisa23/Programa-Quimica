document.addEventListener('DOMContentLoaded', () => {
  const pesosAtomicos = {
    /* ... tu objeto completo de pesos atómicos aquí ... */
    "H": 1.008, "He": 4.0026, "Li": 6.941, "Be": 9.0122, "B": 10.81,
    "C": 12.011, "N": 14.007, "O": 15.999, "F": 18.998, "Ne": 20.180,
    "Na": 22.990, "Mg": 24.305, "Al": 26.982, "Si": 28.085, "P": 30.974,
    "S": 32.06, "Cl": 35.45, "Ar": 39.948, "K": 39.098, "Ca": 40.078,
    "Sc": 44.955, "Ti": 47.867, "V": 50.941, "Cr": 51.996, "Mn": 54.938,
    "Fe": 55.845, "Co": 58.933, "Ni": 58.693, "Cu": 63.546, "Zn": 65.38,
    "Ga": 69.723, "Ge": 72.63, "As": 74.922, "Se": 78.971, "Br": 79.904,
    "Kr": 83.798, "Rb": 85.468, "Sr": 87.62, "Y": 88.905, "Zr": 91.224,
    "Nb": 92.906, "Mo": 95.95, "Tc": 98, "Ru": 101.07, "Rh": 102.91,
    "Pd": 106.42, "Ag": 107.87, "Cd": 112.41, "In": 114.82, "Sn": 118.71,
    "Sb": 121.76, "Te": 127.6, "I": 126.9, "Xe": 131.29, "Cs": 132.91,
    "Ba": 137.33, "La": 138.91, "Ce": 140.12, "Pr": 140.91, "Nd": 144.24,
    "Pm": 145, "Sm": 150.36, "Eu": 151.96, "Gd": 157.25, "Tb": 158.93,
    "Dy": 162.50, "Ho": 164.93, "Er": 167.26, "Tm": 168.93, "Yb": 173.04,
    "Lu": 174.97, "Hf": 178.49, "Ta": 180.95, "W": 183.84, "Re": 186.21,
    "Os": 190.23, "Ir": 192.22, "Pt": 195.08, "Au": 196.97, "Hg": 200.59,
    "Tl": 204.38, "Pb": 207.2, "Bi": 208.98, "Po": 209, "At": 210,
    "Rn": 222, "Fr": 223, "Ra": 226, "Ac": 227, "Rf": 267, "Db": 268,
    "Sg": 271, "Bh": 270, "Hs": 269, "Mt": 278, "Ds": 281, "Rg": 282,
    "Cn": 285, "Nh": 286, "Fl": 289, "Mc": 288, "Lv": 293, "Ts": 294,
    "Og": 294
  };

  const tiposQuimicos = {
    "H": "No metal", "He": "Gas noble", "Li": "Metal alcalino", "Be": "Metal alcalinotérreo",
    "B": "Metaloide", "C": "No metal", "N": "No metal", "O": "No metal", "F": "Halógeno",
    "Ne": "Gas noble", "Na": "Metal alcalino", "Mg": "Metal alcalinotérreo", "Al": "Metal del bloque p",
    "Si": "Metaloide", "P": "No metal", "S": "No metal", "Cl": "Halógeno", "Ar": "Gas noble",
    "K": "Metal alcalino", "Ca": "Metal alcalinotérreo", "Sc": "Metal de transición", "Ti": "Metal de transición",
    "V": "Metal de transición", "Cr": "Metal de transición", "Mn": "Metal de transición", "Fe": "Metal de transición",
    "Co": "Metal de transición", "Ni": "Metal de transición", "Cu": "Metal de transición", "Zn": "Metal de transición",
    "Ga": "Metal del bloque p", "Ge": "Metaloide", "As": "Metaloide", "Se": "No metal", "Br": "Halógeno",
    "Kr": "Gas noble", "Rb": "Metal alcalino", "Sr": "Metal alcalinotérreo", "Y": "Metal de transición",
    "Zr": "Metal de transición", "Nb": "Metal de transición", "Mo": "Metal de transición", "Tc": "Metal de transición",
    "Ru": "Metal de transición", "Rh": "Metal de transición", "Pd": "Metal de transición", "Ag": "Metal de transición",
    "Cd": "Metal de transición", "In": "Metal del bloque p", "Sn": "Metal del bloque p", "Sb": "Metaloide",
    "Te": "Metaloide", "I": "Halógeno", "Xe": "Gas noble", "Cs": "Metal alcalino", "Ba": "Metal alcalinotérreo",
    "La": "Lantánido", "Ce": "Lantánido", "Pr": "Lantánido", "Nd": "Lantánido", "Pm": "Lantánido",
    "Sm": "Lantánido", "Eu": "Lantánido", "Gd": "Lantánido", "Tb": "Lantánido", "Dy": "Lantánido",
    "Ho": "Lantánido", "Er": "Lantánido", "Tm": "Lantánido", "Yb": "Lantánido", "Lu": "Metal de transición",
    "Hf": "Metal de transición", "Ta": "Metal de transición", "W": "Metal de transición", "Re": "Metal de transición",
    "Os": "Metal de transición", "Ir": "Metal de transición", "Pt": "Metal de transición", "Au": "Metal de transición",
    "Hg": "Metal de transición", "Tl": "Metal del bloque p", "Pb": "Metal del bloque p", "Bi": "Metal del bloque p",
    "Po": "Metal del bloque p", "At": "Halógeno", "Rn": "Gas noble", "Fr": "Metal alcalino",
    "Ra": "Metal alcalinotérreo", "Ac": "Actínido", "Rf": "Metal de transición", "Db": "Metal de transición",
    "Sg": "Metal de transición", "Bh": "Metal de transición", "Hs": "Metal de transición", "Mt": "Metal de transición",
    "Ds": "Metal de transición", "Rg": "Metal de transición", "Cn": "Metal de transición", "Nh": "Metal de transición",
    "Fl": "Metal de transición", "Mc": "Metal de transición", "Lv": "Metal de transición", "Ts": "Halógeno", "Og": "Gas noble"
  };

  const electronConfig = {
    "H": "1",
    "He": "2",
    "Li": "2, 1",
    "Be": "2, 2",
    "B": "2, 3",
    "C": "2, 4",
    "N": "2, 5",
    "O": "2, 6",
    "F": "2, 7",
    "Ne": "2, 8",
    "Na": "2, 8, 1",
    "Mg": "2, 8, 2",
    "Al": "2, 8, 3",
    "Si": "2, 8, 4",
    "P": "2, 8, 5",
    "S": "2, 8, 6",
    "Cl": "2, 8, 7",
    "Ar": "2, 8, 8",
    "K": "2, 8, 8, 1",
    "Ca": "2, 8, 8, 2",
    "Sc": "2, 8, 9, 2",
    "Ti": "2, 8, 10, 2",
    "V": "2, 8, 11, 2",
    "Cr": "2, 8, 12, 2",
    "Mn": "2, 8, 13, 2",
    "Fe": "2, 8, 14, 2",
    "Co": "2, 8, 15, 2",
    "Ni": "2, 8, 16, 2",
    "Cu": "2, 8, 18, 1",
    "Zn": "2, 8, 18, 2",
    "Ga": "2, 8, 18, 3",
    "Ge": "2, 8, 18, 4",
    "As": "2, 8, 18, 5",
    "Se": "2, 8, 18, 6",
    "Br": "2, 8, 18, 7",
    "Kr": "2, 8, 18, 8",
    "Rb": "2, 8, 18, 8, 1",
    "Sr": "2, 8, 18, 8, 2",
    "Y": "2, 8, 18, 9, 2",
    "Zr": "2, 8, 18, 10, 2",
    "Nb": "2, 8, 18, 13, 1",
    "Mo": "2, 8, 18, 13, 2",
    "Tc": "2, 8, 18, 13, 3",
    "Ru": "2, 8, 18, 15, 1",
    "Rh": "2, 8, 18, 16, 1",
    "Pd": "2, 8, 18, 18, 0",
    "Ag": "2, 8, 18, 18, 1",
    "Cd": "2, 8, 18, 18, 2",
    "In": "2, 8, 18, 18, 3",
    "Sn": "2, 8, 18, 18, 4",
    "Sb": "2, 8, 18, 18, 5",
    "Te": "2, 8, 18, 18, 6",
    "I": "2, 8, 18, 18, 7",
    "Xe": "2, 8, 18, 18, 8",
    "Cs": "2, 8, 18, 18, 8, 1",
    "Ba": "2, 8, 18, 18, 8, 2",
    "La": "2, 8, 18, 18, 9, 2",
    "Hf": "2, 8, 18, 32, 8, 2",
    "Ta": "2, 8, 18, 32, 8, 2, 1",
    "W": "2, 8, 18, 32, 12, 2, 1",
    "Re": "2, 8, 18, 32, 13, 2, 1",
    "Os": "2, 8, 18, 32, 14, 2, 2",
    "Ir": "2, 8, 18, 32, 15, 2, 2",
    "Pt": "2, 8, 18, 32, 17, 1, 1",
    "Au": "2, 8, 18, 32, 18, 1, 1",
    "Hg": "2, 8, 18, 32, 18, 2, 1",
    "Tl": "2, 8, 18, 32, 18, 3, 1",
    "Pb": "2, 8, 18, 32, 18, 4, 2",
    "Bi": "2, 8, 18, 32, 18, 5, 2",
    "Po": "2, 8, 18, 32, 18, 6, 2",
    "At": "2, 8, 18, 32, 18, 7, 2",
    "Rn": "2, 8, 18, 32, 18, 8, 2",
    "Fr": "2, 8, 18, 32, 18, 8, 1",
    "Ra": "2, 8, 18, 32, 18, 8, 2",
    "Ac": "2, 8, 18, 32, 32, 8, 2",
    "Rf": "2, 8, 18, 32, 32, 10, 2",
    "Db": "2, 8, 18, 32, 32, 11, 2",
    "Sg": "2, 8, 18, 32, 32, 12, 2",
    "Bh": "2, 8, 18, 32, 32, 13, 2",
    "Hs": "2, 8, 18, 32, 32, 14, 2",
    "Mt": "2, 8, 18, 32, 32, 15, 2",
    "Ds": "2, 8, 18, 32, 32, 16, 2",
    "Rg": "2, 8, 18, 32, 32, 17, 2",
    "Cn": "2, 8, 18, 32, 32, 18, 2",
    "Nh": "2, 8, 18, 32, 32, 18, 3",
    "Fl": "2, 8, 18, 32, 32, 18, 4",
    "Mc": "2, 8, 18, 32, 32, 18, 5",
    "Lv": "2, 8, 18, 32, 32, 18, 6",
    "Ts": "2, 8, 18, 32, 32, 18, 7",
    "Og": "2, 8, 18, 32, 32, 18, 8"
  };

  const pantallaPrincipal = document.getElementById('pantallaPrincipal');
  const pantallaSecundaria = document.getElementById('pantallaSecundaria');
  const btnDelete = document.querySelector('.tabla .elemento.delete');
  const botonesElemento = document.querySelectorAll('.tabla .elemento:not(.delete):not(.numero):not(.limpiar):not([data-valor])');
  const botonesNumero = document.querySelectorAll('.elemento.numero');
  const botonLimpiar = document.querySelector('.elemento.limpiar');
  const infoDiv = document.getElementById('info-elemento');

  let formula = '';

  function calcularMasaMolecular(formula) {
    const regex = /([A-Z][a-z]*)(\d*)/g;
    let match;
    let masaTotal = 0;
    let elementosUnicos = new Set();

    while ((match = regex.exec(formula)) !== null) {
      const elemento = match[1];
      const cantidad = parseInt(match[2]) || 1;
      elementosUnicos.add(elemento);

      if (pesosAtomicos[elemento]) {
        masaTotal += pesosAtomicos[elemento] * cantidad;
      } else {
        return 'Elemento desconocido';
      }
    }

    if (masaTotal === 0) return 'Fórmula vacía';

    const unidad = elementosUnicos.size > 1 ? 'g/mol' : 'uma';
    return 'Masa molecular: ' + masaTotal.toFixed(3) + ' ' + unidad;
  }

  if (btnDelete) {
    btnDelete.addEventListener('click', () => {
      formula = formula.slice(0, -1);
      pantallaPrincipal.textContent = formula || '';
      pantallaSecundaria.textContent = calcularMasaMolecular(formula);
    });
  }

  botonesElemento.forEach(boton => {
    boton.addEventListener('click', () => {
      const simbolo = boton.getAttribute("data-simbolo");
      if (!isNaN(simbolo) && formula.length === 0) return;
      formula += simbolo;
      pantallaPrincipal.textContent = formula;
      pantallaSecundaria.textContent = calcularMasaMolecular(formula);
    });

    boton.addEventListener('mouseover', () => {
      const simbolo = boton.getAttribute("data-simbolo");
      const nombre = boton.getAttribute("data-nombre");
      const grupo = tiposQuimicos[simbolo] || "Desconocido";
      const config = electronConfig[simbolo] || "N/D";
      // Mostrar info solo como texto para evitar relayout
      infoDiv.textContent = `Nombre: ${nombre} | Grupo: ${grupo} | Configuración de electrones: ${config}`;
      pantallaSecundaria.textContent = `${simbolo}: ${pesosAtomicos[simbolo]} uma — ${grupo}`;
    });

    boton.addEventListener('mouseout', () => {
      infoDiv.textContent = 'Pasa el cursor sobre un elemento';
      pantallaSecundaria.textContent = calcularMasaMolecular(formula);
    });
  });

  botonesNumero.forEach(boton => {
    boton.addEventListener('click', () => {
      const valor = boton.getAttribute('data-valor');
      formula += valor;
      pantallaPrincipal.textContent = formula;
      pantallaSecundaria.textContent = calcularMasaMolecular(formula);
    });
  });

  if (botonLimpiar) {
    botonLimpiar.addEventListener('click', () => {
      formula = '';
      pantallaPrincipal.textContent = '';
      pantallaSecundaria.textContent = 'Fórmula vacía';
      infoDiv.textContent = 'Pasa el cursor sobre un elemento';
    });
  }

  // Manejar paréntesis
  const botonesParentesis = document.querySelectorAll('.elemento[data-valor="("], .elemento[data-valor=")"]');
  botonesParentesis.forEach(boton => {
    boton.addEventListener('click', () => {
      const valor = boton.getAttribute('data-valor');
      formula += valor;
      pantallaPrincipal.textContent = formula;
      pantallaSecundaria.textContent = calcularMasaMolecular(formula);
    });
  });
});
