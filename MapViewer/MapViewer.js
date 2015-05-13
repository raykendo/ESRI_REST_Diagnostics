(function () {
	var d = document,
		url = window.location.href.replace(window.location.search, ""),
		single = !/(map|feature)server\/?$/i.test(url),
		test = false,
	 	js = "//js.arcgis.com/3.13compact",
		css = "//js.arcgis.com/3.13/esri/css/esri.css",
		style1, scr1;
	function loadMap() {
		var node = d.createElement("div");
		node.setAttribute("style", "position:fixed;top:0;right:0;border:1px solid grey;z-index:10;padding:8px;background:#fff;");
		node.innerHTML = "<div id='map'></div>" + (single ? "" : "<p>Hover over a Map Service link to view it.</p>");
		d.body.appendChild(node);
		require(["esri/map", "esri/request", "dojo/query", "dojo/domReady!"], function (Map, esriRequest, dojoQuery) {
			var map = new Map("map");
			function addMapServiceLayer(url) {
				if (/featureserver\/?$/i.test(url)) {
					require(["esri/layers/FeatureLayer"], function (FeatureLayer) {
						var layer = new FeatureLayer(url);
						map.addLayer(layer);
					});
				} else {
					esriRequest({
						url: url,
						handleAs: "json", 
						content: {f: "json"}
					}).then(function (response) {
						if (response.singleFusedMapCache) {
							require(["esri/layers/ArcGISTiledMapServiceLayer"], function (Tiled) {
								var layer = new Tiled(url);
								map.addLayer(layer);
							});
						} else {
							require(["esri/layers/ArcGISDynamicMapServiceLayer"], function (Dynamic) {
								var layer = new Dynamic(url);
								map.addLayer(layer);
							});
						}
					});
				}
			}
			function resetMap() {
				map.destroy();
				map = new Map("map");
			}
			if (single) {
				addMapServiceLayer(url);
			} else {
				dojoQuery("a[href$=MapServer], a[href$=FeatureServer]").on("mouseover", function (evt) {
					if (map.graphicsLayerIds.length + map.layerIds.length > 0) {
						resetMap();
					}
					addMapServiceLayer(evt.currentTarget.href);
				});
			}
		});
	}
	[].forEach.call(d.getElementsByTagName("script"), function (scr) {
		test = test || scr.src === js;
	});
	if (test) {
		loadMap();
	} else {
		style1 = d.createElement("link");
		style1.setAttribute("rel", "stylesheet");
		style1.setAttribute("type", "text/css");
		style1.href = css;
		d.head.appendChild(style1);
		scr1 = d.createElement("script");
		scr1.setAttribute("type", "text/javascript");
		scr1.onload = loadMap;
		scr1.setAttribute("src", js);
		d.body.appendChild(scr1);
	}
})();