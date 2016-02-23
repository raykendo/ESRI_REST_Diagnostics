(function () {
  "use strict";
  var d = document,
	url = window.location.href.replace(window.location.search, ""),
    single = /(map|feature)server\/?$/i.test(url),
    test = false,
    js = "//js.arcgis.com/3.15compact",
    css = "//js.arcgis.com/3.15/esri/css/esri.css",
    style1,
    scr1;
  function loadElement (tag, attributes) {
    var el = d.createElement(tag), a;
    for (a in attributes) {
      el.setAttribute(a, attributes[a]);
    }
    return el;
  }
  function loadMap() {
    var node = loadElement("div", {
      "style": "position:fixed;top:0;right:0;border:1px solid grey;z-index:10;padding:8px;background:#fff;"
    });
    node.innerHTML = "<div id='map'></div>" + (!single ? "<p>Hover over a Map Service link to view it.</p>": "");
    d.body.appendChild(node);
    require(["esri/map", "esri/request", "dojo/query", "dojo/domReady!"], function (Map, esriRequest, dojoQuery) {
      var map = new Map("map");
      function addFeatureServiceLayer(data, u2) {
        if (data.layers && data.layers.length) {
          require(["esri/layers/FeatureLayer", "dojo/_base/array"], function (FeatureLayer, arrayUtils) {
            arrayUtils.forEach(data.layers, function (layerData) {
              var layer = new FeatureLayer(u2.replace(/\/?$/, "/" + layerData.id), {mode: FeatureLayer.MODE_SNAPSHOT, outFields: ["*"]});
              map.addLayer(layer);
            });
          });
        }
      }
      function addMapServiceLayer(data, u2) {
        if (data.singleFusedMapCache) {
          require(["esri/layers/ArcGISTiledMapServiceLayer"], function (Tiled) {
            var layer = new Tiled(u2);
            map.addLayer(layer);
          });
        } else {
          require(["esri/layers/ArcGISDynamicMapServiceLayer"], function (Dynamic) {
            var layer = new Dynamic(u2);
            map.addLayer(layer);
          });
        }
      }
      function resetMap() {
        if (map.graphicsLayerIds.length + map.layerIds.length > 0) {
          map.destroy();
          map = new Map("map");
        }
      }
      if (single) {
        addMapServiceLayer(url);
      } else {
        dojoQuery("a[href$=MapServer]").on("mouseover", function (evt) {
          var u3 = evt.currentTarget.href;
          resetMap();
          esriRequest({
            url: u3,
            handleAs: "json",
            content: {f: "json"}
          }).then( function (data) { 
            addMapServiceLayer(data, u3); 
          }, function (err) { 
            console.error(err); 
          });
        });
        dojoQuery("a[href$=FeatureServer]").on("mouseover", function (evt) {
          var u3 = evt.currentTarget.href;
          resetMap();
          esriRequest({
            url: u3,
            handleAs: "json",
            content: {f: "json"}
          }).then(function (data) {
            addFeatureServiceLayer(data, u3); 
          }, function (err) { 
            console.error(err); 
          });
        });
      }
    });
  }
  test = [].some.call(d.getElementsByTagName("script"), function (scr) {
    return scr.src === js;
  });

  if (test) {
    loadMap();
  } else {
    style1 = loadElement("link", {
      rel: "stylesheet",
      type: "text/css",
      href: css
    });
    d.head.appendChild(style1);
    scr1 = loadElement("script", {
      type: "text/javascript"
    });
    scr1.onload = loadMap;
    scr1.setAttribute("src", js);
    d.body.appendChild(scr1);
  }
}());
