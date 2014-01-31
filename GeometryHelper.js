(function () {
    var url = "http://js.arcgis.com/3.8/", 
    	css = url + "js/esri/css/esri.css",
    	d = document,
    	style1, scr1;
    function loadMe() {
        require(["dojo/ready", "dojo/dom-construct", "dojo/query", "dojo/json", "esri/request", "esri/toolbars/draw", 
        	"esri/map", "esri/layers/ArcGISDynamicMapServiceLayer", "esri/layers/ArcGISTiledMapServiceLayer"
			], function (ready, domConstruct, dojoQuery, JSON, esriRequest, Draw, Map, Dynamic, Tiled) {
			ready(function () {
				var wl = window.location, url = wl.href.replace(wl.search, "").replace(/\/\d+\/query\/?$/i, ""),
					geoBlank = dojoQuery("textarea[name=\"geometry\"]"),
					geoSelect = dojoQuery("select[name=\"geometryType\"]")[0];
                esriRequest({
                	url: url,
					handleAs: "json",
					content: {f: "json"}
				}).then(function (resp) {
					var div = domConstruct.create("div", {
						style: "position:fixed;bottom:15%;top:15%;right:0;width:40%;border:1px solid #F88;padding:5px;background:#fff;overflow:auto;",
						innerHTML: "<button " + ["id=\"btnpt\">Point", "id=\"btnln\">Line", "id=\"btnpg\">Polygon", "id=\"btnex\">Extent"].join("</button><button ") + "</button><button id=\"closr\">Close</button><div id=\"map\" style=\"width:100%;\"></div>"
					}, d.body),
					map = new Map("map",{}),
					layer = resp.singleFusedMapCache ? new Tiled(url) : new Dynamic(url), 
					xlator = {btnpt: Draw.POINT,btnln: Draw.POLYLINE,btnpg:Draw.POLYGON,btnex:Draw.EXTENT}, draw;
					map.on("load", function () {
						draw = new Draw(map);
						dojoQuery("button", div).on("click", function (evt) {
							if (evt.target.id in xlator) {
								draw.activate(xlator[evt.target.id]);
							} else {
								map.destroy();
								domConstruct.destroy(div);
							}
						});
						draw.on("draw-end", function (drawn) {
							var i, xlator = {point: "esriGeometryPoint", multipoint: "esriGeometryMultipoint", polyline: "esriGeometryPolyline", polygon: "esriGeometryPolygon", extent: "esriGeometryEnvelope"};
							for (i = geoSelect.options.length - 1; i > -1; i--) {
								if (geoSelect.options[i].value === xlator[drawn.geometry.type]) {
									geoSelect.selectedIndex = i; 
									break;
								}
							}
							geoBlank.value = JSON.stringify(drawn.geometry.toJson());
							 
						});
					});
					map.addLayer(layer);
					geoBlank = geoBlank && geoBlank.length ? geoBlank[0] : domConstruct.create("textarea", {}, div);
				});
            });
        });
    }
    function scriptLoaded(url) {
        var scripts = d.getElementsByTagName("script"), i;
        for (i = scripts.length - 1; i > -1; i--) {
            if (scripts[i].src === url) { return true; }
        }
        return false;
    }
    if (!scriptLoaded(url)) {
    	style1 = d.createElement("link");
    	style1.setAttribute("rel", "stylesheet");
    	style1.setAttribute("type", "text/css");
    	style1.href = css;
    	d.head.appendChild(style1);
        scr1 = d.createElement("script");
        scr1.setAttribute("type", "text/javascript");
        scr1.onload = loadMe;
        scr1.setAttribute("src", url);
        d.body.appendChild(scr1);
    } else {
        loadMe();
    }
}());