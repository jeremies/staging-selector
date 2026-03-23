// bundle.js
var IS_TIZEN = /Tizen/i.test(navigator.userAgent);
var main_url = IS_TIZEN ? window.PUBLIC_PATH : "./";

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

function fetchLinks(url, callback) {
  var xhr = new XMLHttpRequest();
  xhr.open("GET", main_url + "/" + url, true);

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

  fetchLinks("links-left.json", function (errLeft, linksLeft) {
    if (errLeft) {
      console.error("Failed to fetch links-left.json:", errLeft);
      linksLeft = [];
    }

    fetchLinks("links-right.json", function (errRight, linksRight) {
      if (errRight) {
        console.error("Failed to fetch links-right.json:", errRight);
        linksRight = [];
      }

      var html = '<div style="overflow: hidden;">';

      html +=
        '<div style="float: left; width: 50%; box-sizing: border-box;"><ul>';
      for (var i = 0; i < linksLeft.length; i++) {
        var link = linksLeft[i];
        html += '<li><a href="' + link.url + '">' + link.title + "</a></li>";
      }
      html += "</ul></div>";

      html +=
        '<div style="float: left; width: 50%; box-sizing: border-box;"><ul>';
      for (var i = 0; i < linksRight.length; i++) {
        var link = linksRight[i];
        html += '<li><a href="' + link.url + '">' + link.title + "</a></li>";
      }
      html += "</ul></div>";

      html += "</div>";
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
