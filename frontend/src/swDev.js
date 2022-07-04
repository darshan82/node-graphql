export default function sw() {
  let swUrl = `${process.env.PUBLIC_URL}/sw.js`;
  navigator.serviceWorker
    .register(swUrl)
    .then((res) => console.log("--service worker--"))
    .catch((err) => console.error("--service worker error--"));
}
