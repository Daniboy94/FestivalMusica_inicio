document.addEventListener("DOMContentLoaded", function () {
  iniciarApp();
});

function iniciarApp() {
  navegacionFija();
  crearGaleria();
  scrollNav();
}

function navegacionFija() {
  const barra = document.querySelector(".header");
  const sobreFestival = document.querySelector(".sobre-festival");
  const body = document.querySelector("body");

  window.addEventListener("scroll", function () {
    if (sobreFestival.getBoundingClientRect().bottom < 0) {
      barra.classList.add("fijo");
      body.classList.add("body-scroll");
    } else {
      barra.classList.remove("fijo");
      body.classList.remove("body-scroll");
    }
  });
}

function scrollNav() {
  const enlances = document.querySelectorAll(".navegacion-principal a"); //"All" para que seleccione todos los enlaces

  enlances.forEach((enlace) => {
    //para que itere entre todos los enlaces
    enlace.addEventListener("click", function (e) {
      e.preventDefault(); //para prevenir el efecto default de los enlances y se vuelva smooth

      const seccionScroll = e.target.attributes.href.value;
      const seccion = document.querySelector(seccionScroll);
      seccion.scrollIntoView({ behavior: "smooth" });
    });
  });
}

function crearGaleria() {
  const galeria = document.querySelector(".galeria-imagenes");

  for (let i = 1; i <= 12; i++) {
    //que se ejecute hasta que sea igual o menor a 12 y se incremente en 1 con el i++, son 12 imagenes queremos que recorra todas

    const imagen = document.createElement("picture");
    imagen.innerHTML = ` 
  
    <source srcset="build/img/thumb/${i}.avif" type="image/avif">
    <source srcset="build/img/thumb/${i}.webp" type="image/webp">
    <img loading="lazy" width="200" height="300" src="build/img/thumb/${i}.jpg" alt="imagen galeria">
  `;

    imagen.onclick = function () {
      mostrarImagen(i);
    };

    galeria.appendChild(imagen);
  }
}

function mostrarImagen(id) {
  // el callback "id" hace que se llamen las imagenes dentro de la carpeta /grande

  const imagen = document.createElement("picture");
  imagen.innerHTML = ` 
  
    <source srcset="build/img/grande/${id}.avif" type="image/avif">
    <source srcset="build/img/grande/${id}.webp" type="image/webp">
    <img loading="lazy" width="200" height="300" src="build/img/grande/${id}.jpg" alt="imagen galeria">
  
  
  `;

  //crea el overlay con la imagen
  const overlay = document.createElement("DIV");
  overlay.appendChild(imagen);
  overlay.classList.add("overlay"); //para crear una clase y darle estilos CSS

  overlay.onclick = function () {
    //codigo para que se cierre el overlay dando click en cualquier parte de la pantalla
    const body = document.querySelector("body");
    body.classList.remove("fijar-body");
    overlay.remove();
  };

  // Botón para cerrar la ventana modal

  const cerrarModal = document.createElement("P"); //crea un elemento HTML
  cerrarModal.textContent = "X";
  cerrarModal.classList.add("btn-cerrar");

  cerrarModal.onclick = function () {
    const body = document.querySelector("body"); // se usa para seleccionar una etiqueta HTML
    body.classList.remove("fijar-body");
    overlay.remove();
  };

  overlay.appendChild(cerrarModal); //para agregar el overlay a modal

  //Añadirlo al HTML
  const body = document.querySelector("body"); // seleccionamos la etiqueta  de HTML body
  body.appendChild(overlay); // le agregamos los valores de overlay con append Child
  body.classList.add("fijar-body");
}
