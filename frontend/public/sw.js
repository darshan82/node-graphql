console.warn("----service worker----");
let cacheData = "appv1";
this.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(cacheData).then((cache) => {
      cache.addAll([
        "/static/js/bundle.js",
        "/index.html",
        "/auth",
        "/",
        "/bookings",
        "/events",
        "main.ca14f99b",
        "/static/main.ca14f99b",
        "/main.24eece14.css",
        "/static/main.24eece14.css",

      ]);
    })
  );
});
this.addEventListener("fetch", (event) => {
  console.log("sss", navigator);
  if (!navigator.onLine) {
    event.respondWith(
      caches.match(event.request).then((res) => {
        if (res) {
          return res;
        }
        let fetchUrl = event.request.clone();
        return fetch(fetchUrl);
      })
    );
  }
});
