// bundle.js
const IS_TIZEN = Boolean(navigator.userAgent.match(/Tizen/i));

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

async function renderApp() {
  const app = document.getElementById("root");

  let linksData = [];
  try {
    const response = await fetch("links.json");
    if (!response.ok) throw new Error("Network response was not ok");
    linksData = await response.json();
  } catch (error) {
    console.error("Failed to fetch links.json:", error);
  }

  app.innerHTML = `
    <ul>
      ${linksData.map((link) => `<li><a href="${link.url}">${link.title}</a></li>`).join("\n")}
    </ul>
  `;

  const links = app.querySelectorAll("a");

  links.forEach((linkEl) => {
    linkEl.addEventListener("click", function (e) {
      if (IS_TIZEN) {
        e.preventDefault(); // prevent normal navigation

        const link = this.getAttribute("href");
        window.localStorage.setItem("wrapperUrl", link);
        document.location.reload();
      }
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
  await renderApp();

  await loadScript(
    "https://luke-chang.github.io/js-spatial-navigation/spatial_navigation.js",
  );

  initSpatialNavigation();
});
