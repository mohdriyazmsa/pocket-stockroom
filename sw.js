const C="stockroom-v19";
const ASSETS=["./","index.html","manifest.json","icon-180.png","icon-192.png","icon-512.png","zxr.js","zxing_reader.wasm","https://unpkg.com/@zxing/library@0.21.3/umd/index.min.js"];
self.addEventListener("install",e=>{e.waitUntil(caches.open(C).then(c=>Promise.all(ASSETS.map(u=>c.add(new Request(u,u.startsWith("http")?{mode:"cors"}:{})).catch(()=>{}))))); self.skipWaiting();});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))).then(()=>self.clients.claim()));});
self.addEventListener("fetch",e=>{
  if(e.request.method!=="GET")return;
  e.respondWith(fetch(e.request).then(r=>{const cp=r.clone(); if(r.ok||r.type==="opaque") caches.open(C).then(c=>c.put(e.request,cp)); return r;}).catch(()=>caches.match(e.request,{ignoreSearch:true}).then(r=>r||(e.request.mode==="navigate"?caches.match("index.html"):Response.error()))));
});
