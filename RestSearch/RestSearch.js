(function () {
    var url = "http://js.arcgis.com/3.8/", scr1;
    function loadMe() {
		alert("loading");
        require(["dojo/ready", "dojo/dom-construct", "dojo/on", "esri/request", "dojo/_base/lang", "dojo/_base/array"
			], function (ready, domConstruct, on, esriRequest, lang, array) {
			function getFinalVal(fields, response) {
				var result = response.hasOwnProperty(fields[0]) ? response[fields[0]] : null;
				if (result != null && fields.length > 1) {
					if (result instanceof Array) {
						return array.map(result, function (item) {
							return getFinalVal(fields.slice(1), item);
						});
					}
					return getFinalVal(fields.slice(1), result);
				}
				return result;
			}
			function printResult(field, result, url, node) {
				domConstruct.create("a", {
					innerHTML: [field, result].join(": "),
					href: url
				}, node);
				domConstruct.create("br", {}, node);
			}
			function checkAndPrint(searchFor, field, result, url, node) {
				if (isNaN(searchFor)) {
					if (searchFor.test(result)) {
						printResult(field, result, url, node);
					}
				} else if (searchFor === result) {
					printResult(field, result, url, node);
				}
			}
			function responseSearch(url, resp, fieldList, searchFor, node) {
				array.forEach(fieldList, function (field) {
					var result = getFinalVal(field.split("."), resp);
					if (result == null) { return; }
					if (result instanceof Array) {
						array.forEach(result, function (item) {
							checkAndPrint(searchFor, field, item, url, node);
						});
					} else {
						checkAndPrint(searchFor, field, result, url, node);
					}
				});
			}
			function mapLayerSearch(url, node, searchFor) {
				esriRequest({
					url: url,
					handleAs: "json",
					content: {f: "json"}
				}).then(function (resp) {
					responseSearch(url, resp, ["name", "description", "displayField", "fields.name", "fields.alias"], searchFor, node);
				});
			}
			function mapServiceSearch(url, node, searchFor) {
				esriRequest({
					url: url,
					handleAs: "json",
					content: {f: "json"}
				}).then(function (resp) {
					responseSearch(url, resp, ["mapName", "layers.name", "documentInfo.Title", "documentInfo.Comments", "documentInfo.Subject", "documentInfo.Category", "documentInfo.Keywords"], searchFor, node);
					if (resp.layers && resp.layers.length) {
						array.forEach(resp.layers, function (layer) {
							mapLayerSearch([url, layer.id].join("/"), node, searchFor);
						});
					}
					if (resp.tables && resp.tables.length) {
						array.forEach(resp.tables, function (table) {
							mapLayerSearch([url, table.id].join("/"), node, searchFor);
						});
					}
				});
			}
            function folderSearch(url, node, searchFor) {
				esriRequest({
					url: url,
					handleAs: "json",
					content: {f: "json"}
				}).then(function (resp) {
					responseSearch(url, resp, ["folder", "service.name"], searchFor, node);
					if (resp.folders && resp.folders.length) {
						array.forEach(resp.folders, function (folder) {
							folderSearch([url, folder].join("/"), node, searchFor);
						});
					}
					if (resp.services && resp.services.length) {
						array.forEach(resp.services, function (service) {
							mapServiceSearch([url, service.name.replace(/\w+\//ig, ""), service.type].join("/"), node, searchFor);
						});
					}
				});
			}
			ready(function () {
                var div = domConstruct.create("div", {
                    style: "position:fixed;bottom:5px;top:50%;right:5px;width:50%;border:1px solid #880;padding:5px;background:#fff;overflow:auto;text-align:center;"
                }, document.body), searchFor;

				domConstruct.create("button", {
					type: "button",
					innerHTML: "Close",
					style: "float: right;",
					onclick: function () { domConstruct.destroy(div); }
				}, div);
				searchFor = prompt("What would you like to search for?");
				if (/^\d*\.?\d+$/.test(searchFor)) {
					searchFor = /\./.test(searchFor) ? parseFloat(searchFor) : parseInt(searchFor, 10);
				} else {
					searchFor = new RegExp(searchFor);
				}
				url = window.location.href;
				if (/\/\d+\/?$/.test(url)) {
					mapLayerSearch(url, div, searchFor);
				} else if (/\/\w+server\/?$/.test(url)) {
					mapServiceSearch(url, div, searchFor);
				} else {
					folderSearch(url, div, searchFor);
				}
            });
        });
    }
    function scriptLoaded(url) {
        var scripts = document.getElementsByTagName("script"), i;
        for (i = scripts.length - 1; i > -1; i--) {
            if (scripts[i].src === url) { return true; }
        }
        return false;
    }
    if (!scriptLoaded(url)) {
        scr1 = document.createElement("script");
        scr1.setAttribute("type", "text/javascript");
        scr1.onload = loadMe;
        scr1.setAttribute("src", url);
        document.body.appendChild(scr1);
    } else {
        loadMe();
    }
}());