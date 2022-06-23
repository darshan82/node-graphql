// console.warn("----service worker----");
// let cacheData = "appv1";
// this.addEventListener("install", (event) => {
//   event.waitUntil(
//     caches.open(cacheData).then((cache) => {
//       cache.addAll([
//         "/static/js/bundle.js",
//         "/index.html",
//         "/auth",
//         "/",
//         "/bookings",
//         "/events",
//       ]);
//     })
//   );
// });
// this.addEventListener("fetch", (event) => {
//   if (!navigator.onLine)
//     event.respondWith(
//       caches.match(event.request).then((res) => {
//         if (res) {
//           return res;
//         }
//       })
//     );
// });
