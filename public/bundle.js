// bundle.js

function loadScript(src) {
  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = resolve;
    script.onerror = reject;
    document.head.appendChild(script);
  });
}

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

      <!-- New special link -->
      <li><a href="https://example.com" class="set-wrapper">Set wrapperUrl & reload</a></li>
    </ul>
  `;

  // Attach click handler to the special link
  const specialLinks = app.querySelectorAll(".set-wrapper");

  specialLinks.forEach((linkEl) => {
    linkEl.addEventListener("click", function (e) {
      e.preventDefault(); // prevent normal navigation

      const link = this.getAttribute("href");
      window.localStorage.setItem("wrapperUrl", link);
      document.location.reload();
    });
  });
}

function initSpatialNavigation() {
  SpatialNavigation.init();

  SpatialNavigation.add({
    selector: "a, .focusable",
  });

  SpatialNavigation.makeFocusable();
  SpatialNavigation.focus();
}

window.addEventListener("load", async () => {
  injectStyles();
  renderApp();

  await loadScript(
    "https://luke-chang.github.io/js-spatial-navigation/spatial_navigation.js",
  );

  initSpatialNavigation();
});
