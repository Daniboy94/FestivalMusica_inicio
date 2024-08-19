const { src, dest, watch, parallel } = require("gulp"); //require extrae las dependencias y funcionalidad, en este caso gulp

//Dependencias CSS
const sass = require("gulp-sass")(require("sass"));
const plumber = require("gulp-plumber");
const autoprefixer = require("autoprefixer");
const cssnano = require("cssnano");
const postcss = require("gulp-postcss");
const sourcemaps = require("gulp-sourcemaps");

// Dependencias Imágenes
const cache = require("gulp-cache");
const imagemin = require ("gulp-imagemin");
const webp = require("gulp-webp");
const avif = require("gulp-avif");


// Javascript

const terser = require("gulp-terser-js");

function css(done) {
  src("src/scss/**/*.scss") //identificar el archivo de SASS
  .pipe(sourcemaps.init())
    .pipe(plumber()) // previene que los errores detengan el workflow de la consola
    .pipe(sass()) //compilarlo
    .pipe( postcss([ autoprefixer(), cssnano() ]) ) //mejora rendimiento del código css
    .pipe(sourcemaps.write('.'))
    .pipe(dest("build/css")) //guardarlo en el disco duro
    done(); //callback que avisa al gulp que llegamos al final de la función
}

function imagenes(done) {
  const opciones = {
    optimizationLevel: 3,
  };

  src("src/img/**/*.{png,jpg}")
    .pipe(cache(imagemin(opciones)))
    .pipe(dest("build/img"));

  done();
}

function versionWebp(done) {
  //función para convertir imagenes a webp

  const opciones = {
    quality: 50,
  };

  src("src/img/**/*.{png,jpg}") // se va a encargar de buscar imagenes en esos dos formatos
    .pipe(webp(opciones))
    .pipe(dest("build/img"));

  done();
}

function versionAvif(done) {
  //función para convertir imagenes a webp

  const opciones = {
    quality: 50,
  };

  src("src/img/**/*.{png,jpg}") // se va a encargar de buscar imagenes en esos dos formatos
    .pipe(avif(opciones))
    .pipe(dest("build/img"));

  done();
}

function javascript(done) {
   src("src/js/**/*.js") //va a buscar todos los archivos que terminen en .js
   .pipe(sourcemaps.init())
   .pipe (terser())
   .pipe (sourcemaps.write("."))
   .pipe(dest("build/js"));//se guardará en el build/js

  done();

}

function dev(done) {
  watch("src/scss/**/*.scss", css); //los asteriscos hace que se compilen todas las carpetas de sass
  watch("src/js/**/*.js", javascript);
  done();
}

exports.css = css;
exports.js = javascript;
exports.imagenes = imagenes;
exports.versionWebp = versionWebp; //los exports mandan a llamar las funciones
exports.versionAvif = versionAvif;
exports.dev = parallel(imagenes, versionWebp, versionAvif, javascript, dev);

// series: diferentes tareas se ejecutan una tras otras de forman secuencial.parallel: todas las tareas se ejecutan al mismo tiempo.
