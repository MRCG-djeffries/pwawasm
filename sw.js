/* global self, caches, fetch */
'use strict'

var cachename = 'fox-store'
var urlstocache = [
      'index.html',
      'index.js',
      'sw.js',
      'style.css',
      'datastyle.css',
      'noscript.css',
      'icon/pwa-192x192.png',
      'icon/pwa-512x512.png',
      'jquery-3.6.0.min.js',
      'pyo/pyodide.js',
      'pyo/pyodide.js.map',
      'pyo/pyodide_py.tar',
      'pyo/pyodide.mjs',
      'pyo/pyodide.mjs.map',
      'pyo/pyodide.asm.js',
      'pyo/pyodide.asm.wasm',
      'pyo/pyodide.asm.data',
      'pyo/matplotlib-3.5.1-cp310-cp310-emscripten_wasm32.whl',
      'pyo/cycler-0.11.0-py3-none-any.whl',
      'pyo/six-1.16.0-py2.py3-none-any.whl',
      'pyo/fonttools-4.32.0-py3-none-any.whl',
      'pyo/kiwisolver-1.4.2-cp310-cp310-emscripten_wasm32.whl',
      'pyo/numpy-1.22.3-cp310-cp310-emscripten_wasm32.whl',
      'pyo/packaging-21.3-py3-none-any.whl',
      'pyo/pyparsing-3.0.7-py3-none-any.whl',
      'pyo/PIL-9.1.0-cp310-cp310-emscripten_wasm32.whl',
      'pyo/python_dateutil-2.8.2-py2.py3-none-any.whl',
      'pyo/pytz-2022.1-py2.py3-none-any.whl',
      'pyo/packages.json',
      'pyo/distutils.tar'
];


/*
async function createDB(tf){
  const model = await tf.loadLayersModel('/NNmodel/tfjs_model/model.json');
  await model.save('indexeddb://report-exec-time-model');
}



self.addEventListener('activate', function(event) {
  event.waitUntil(
    createDB(tf)
  );
});
*/

// install/cache page assets
self.addEventListener('install', function (event) {
  event.waitUntil(
    caches.open(cachename)
      .then(function (cache) {
        console.log('cache opened')
        return cache.addAll(urlstocache)
      })
  )
})
/*
self.addEventListener('fetch', function(event) {
event.respondWith(async function() {
   try{
     var res = await fetch(event.request);
     var cache = await caches.open('cache');
     cache.put(event.request.url, res.clone());
     return res;
   }
   catch(error){
     return caches.match(event.request);
    }
  }());
});
*/
// intercept page requests
self.addEventListener('fetch', function (event) {
  console.log(event.request.url)
  event.respondWith(
    caches.match(event.request).then(function (response) {
      // serve requests from cache (if found)
      return response || fetch(event.request)
    })
  )
})

/* removed by DJ 29 April
 // service worker activated, remove outdated cache
self.addEventListener('activate', function (event) {
  console.log('worker activated')
    event.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(
        keys.filter(function (key) {
          // filter old versioned keys
          return key !== cachename
        }).map(function (key) {
          return caches.delete(key)
        })
      )
    })
  )
})
*/
