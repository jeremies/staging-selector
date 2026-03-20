// bundle.js
var main_url = "https://jmc-stagings.netlify.app";

var IS_TIZEN = /Tizen/i.test(navigator.userAgent);

function loadScript(src, callback) {
  var script = document.createElement("script");
  script.src = src;

  script.onload = function () {
    callback(null);
  };

  script.onerror = function () {
    callback(new Error("Failed to load script: " + src));
  };

  document.head.appendChild(script);
}

function injectStyles() {
  var style = document.createElement("style");
  style.innerHTML =
    ":focus { outline: 2px solid red; }" +
    "body { margin: 50px; background-color: white; font-size: 30px; }";
  document.head.appendChild(style);
}

function fetchLinks(callback) {
  var xhr = new XMLHttpRequest();
  xhr.open("GET", main_url + "/links.json", true);

  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      if (xhr.status >= 200 && xhr.status < 300) {
        try {
          var data = JSON.parse(xhr.responseText);
          callback(null, data);
        } catch (e) {
          callback(e, []);
        }
      } else {
        callback(new Error("Request failed"), []);
      }
    }
  };

  xhr.send();
}

function renderApp(callback) {
  var app = document.getElementById("root");

  fetchLinks(function (err, linksData) {
    if (err) {
      console.error("Failed to fetch links.json:", err);
      linksData = [];
    }

    var html = "<ul>";

    for (var i = 0; i < linksData.length; i++) {
      var link = linksData[i];
      html += '<li><a href="' + link.url + '">' + link.title + "</a></li>";
    }

    html += "</ul>";
    app.innerHTML = html;

    var links = app.getElementsByTagName("a");

    for (var j = 0; j < links.length; j++) {
      links[j].addEventListener("click", function (e) {
        if (IS_TIZEN) {
          e.preventDefault();

          var link = this.getAttribute("href");
          if (link.charAt(link.length - 1) !== "/") {
            link = link + "/";
          }
          window.localStorage.setItem("wrapperUrl", link);
          document.location.reload();
        }
      });
    }

    callback();
  });
}

function initSpatialNavigation() {
  SpatialNavigation.init();

  SpatialNavigation.add({
    selector: "a, .focusable"
  });

  SpatialNavigation.makeFocusable();
  SpatialNavigation.focus();
}

window.addEventListener("load", function () {
  // loadScript("https://tv-socket.atresmedia.com/target.js", function (err) {
  //   if (err) {
  //     console.error(err);
  //   }
  // });
  injectStyles();

  renderApp(function () {
    loadScript(
      "https://luke-chang.github.io/js-spatial-navigation/spatial_navigation.js",
      function (err) {
        if (err) {
          console.error(err);
          return;
        }
        initSpatialNavigation();
      }
    );
  });
});
