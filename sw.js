console.log("Registrado");
const CACHE_ELEMENTS = [
  "./",
  "https://unpkg.com/react@17/umd/react.production.min.js",
  "https://unpkg.com/react-dom@17/umd/react-dom.production.min.js",
  "https://unpkg.com/@babel/standalone/babel.min.js",
  "./style.css",
  "./component/Contador.js",
];

const CACHE_NAME = "v3_cache_contado_react";

// self - primer evento del service worker
//const self = this // self es una constante
//no hace falta tipear const self=this; con solo poner self ya esta
self.addEventListener("install", (e) => {
  //console.log(e);
  // waitUntil; esperar a que algo se ejecute
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      cache
        .addAll(CACHE_ELEMENTS)
        .then(() => {
          self.skipWaiting();
        })
        .catch((err) => console.log(err));
    })
  );
});

self.addEventListener("activate", (e) => {
  const cacheWhiteList = [CACHE_NAME];

  //console.log(e);
  // waitUntil; esperar a que algo se ejecute
  e.waitUntil(
    //caches.keys obtiene las claves de las distintas caches intaladas en CacheStorage del NavegadorWeb
    caches
      .keys()
      .then((cacheNames) => {
        //console.log(cacheNames);
        return Promise.all(
          cacheNames.map((cacheName) => {
            return (
              cacheWhiteList.indexOf(cacheName) === -1 &&
              caches.delete(cacheName)
            );
          })
        );
      })
      .then(() => self.clients.claim())
  );
});

// evento fetch, busca una nueva version de los archivos, retorna el name de archivos cacheados
self.addEventListener("fetch", (e) => {
  e.respondWith(
    caches.match(e.request).then((res) => (res ? res : fetch(e.request)))
  );
});
