// bundle.js

// Dynamically load the spatial navigation script
function loadScript(src) {
  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = resolve;
    script.onerror = reject;
    document.head.appendChild(script);
  });
}

// Inject styles
function injectStyles() {
  const style = document.createElement("style");
  style.innerHTML = `
    :focus {
      outline: 2px solid red;
    }

    body {
      margin: 50px;
      background-color: white;
      font-size: 30px;
    }
  `;
  document.head.appendChild(style);
}

// Render HTML content
function renderApp() {
  const app = document.getElementById("root");

  app.innerHTML = `
    <ul>
      <li><a href="https://smarttv.atresplayer.com/_pruebas/DEVOPS/freewheel-enable-hisense-3/">Ter Freewheel enable Hisense</a></li>
      <li><a href="https://smarttv.atresplayer.com/_pruebas/DEVOPS/hisense-fix-user-agent-freewheel/">hisense-fix-user-agent-freewheel</a></li>
      <li><a href="https://p8082.staging.atresplayer.com/">p8082</a></li>
      <li><a href="https://duckduckgo.com">Duckduckgo 1</a></li>
      <li><a href="https://google.com">Google 19-mar-2026</a></li>
      <li><a href="https://smarttv.atresplayer.com/_pruebas/DEVOPS/a5.stem252/">a5.stem252</a></li>
      <li><a href="https://smarttv.atresplayer.com/_pruebas/DEVOPS/a8.museum267/">a8.museum267</a></li>
      <li><a href="https://pruebascomunes.staging.atresplayer.com">pruebas comunes</a></li>
    </ul>
  `;
}

// Initialize spatial navigation
function initSpatialNavigation() {
  // Initialize
  SpatialNavigation.init();

  // Define navigable elements
  SpatialNavigation.add({
    selector: "a, .focusable",
  });

  // Make elements focusable
  SpatialNavigation.makeFocusable();

  // Focus first element
  SpatialNavigation.focus();
}

// Bootstrap everything
window.addEventListener("load", async () => {
  injectStyles();
  renderApp();

  await loadScript(
    "https://luke-chang.github.io/js-spatial-navigation/spatial_navigation.js",
  );

  initSpatialNavigation();
});
