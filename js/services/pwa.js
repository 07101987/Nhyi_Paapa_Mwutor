export function registerPwa() {
  if ("serviceWorker" in navigator && location.protocol !== "file:") {
    navigator.serviceWorker.register("./sw.js").catch((error) => {
      console.warn("Service worker registration failed.", error);
    });
  }
}

export function setupInstallButton(callback) {
  let deferredPrompt = null;
  window.addEventListener("beforeinstallprompt", (event) => {
    event.preventDefault();
    deferredPrompt = event;
    callback?.(true);
  });
  window.addEventListener("appinstalled", () => {
    deferredPrompt = null;
    callback?.(false);
  });
  return async () => {
    if (!deferredPrompt) {
      alert("On iPhone or iPad, open this in Safari, tap Share, then Add to Home Screen.");
      return;
    }
    deferredPrompt.prompt();
    await deferredPrompt.userChoice;
    deferredPrompt = null;
    callback?.(false);
  };
}
