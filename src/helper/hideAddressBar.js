export function hideAddressBar() {
  if (document.documentElement.requestFullscreen) {
    window.addEventListener("load", function () {
      // Hide address bar on page load
      setTimeout(function () {
        window.scrollTo(0, 1);
      }, 0);

      // Hide address bar on orientation change
      window.addEventListener("orientationchange", function () {
        setTimeout(function () {
          window.scrollTo(0, 1);
        }, 100);
      });
    });
  }
}
