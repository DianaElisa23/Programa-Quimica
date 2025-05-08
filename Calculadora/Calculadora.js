document.addEventListener('DOMContentLoaded', () => {
  const pesosAtomicos = {
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
      "Ba": 137.33, "Lu": 174.97, "Hf": 178.49, "Ta": 180.95, "W": 183.84,
      "Re": 186.21, "Os": 190.23, "Ir": 192.22, "Pt": 195.08, "Au": 196.97,
      "Hg": 200.59, "Tl": 204.38, "Pb": 207.2, "Bi": 208.98, "Po": 209,
      "At": 210, "Rn": 222, "Fr": 223, "Ra": 226, "Lr": 262, "Rf": 267,
      "Db": 268, "Sg": 271, "Bh": 270, "Hs": 269, "Mt": 278, "Ds": 281,
      "Rg": 282, "Cn": 285, "Nh": 286, "Fl": 289, "Mc": 288, "Lv": 293,
      "Ts": 294, "Og": 294
  };

  const pantallaPrincipal  = document.querySelector('.pantalla-principal');
  const pantallaSecundaria = document.querySelector('.pantalla-secundaria');
  const btnDelete          = document.querySelector('.tabla .elemento.delete');
  const botonesElemento    = document.querySelectorAll('.tabla .elemento:not(.delete)');

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

  btnDelete.addEventListener('click', () => {
      formula = formula.slice(0, -1);
      pantallaPrincipal.textContent = formula;
      const resultado = calcularMasaMolecular(formula);
      pantallaSecundaria.textContent = resultado;
  });

  botonesElemento.forEach(boton => {
      const simbolo = boton.firstChild?.nodeValue?.trim() ?? '';

      // Agregar a fórmula
      boton.addEventListener('click', () => {
          if (!isNaN(simbolo) && formula.length === 0) return;
          formula += simbolo;
          pantallaPrincipal.textContent = formula;
          pantallaSecundaria.textContent = calcularMasaMolecular(formula);
      });

      // Mostrar masa individual en hover
      boton.addEventListener('mouseover', () => {
          if (pesosAtomicos[simbolo]) {
              pantallaSecundaria.textContent = pesosAtomicos[simbolo] + ' uma';
          }
      });

      // Restaurar cálculo al salir del botón
      boton.addEventListener('mouseout', () => {
          pantallaSecundaria.textContent = calcularMasaMolecular(formula);
      });
  });
});
