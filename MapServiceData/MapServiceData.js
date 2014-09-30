(function () {
    var d = document,
		tags = d.getElementsByTagName("a"),
		urls = [],
		i;
    // ajax function from https://gist.github.com/Xeoncross/7663273
    function ajax(u, callback, data, x) {
        try {
            x = new (this.XMLHttpRequest || ActiveXObject)("MSXML2.XMLHTTP.3.0");
            x.open(data ? "POST" : "GET", u, 1);
            x.setRequestHeader("X-Requested-With", "XMLHttpRequest");
            x.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            x.onreadystatechange = function () {
                x.readyState > 3 && callback && callback(x.responseText, x);
            };
            x.send(data);
        } catch (e) {
            window.console && console.log(e);
        }
    }
    function add(node, title, content, hideifContentFalse, hideContent) {
		if (hideifContentFalse && !content) { return; }
        var li = d.createElement("li");
        li.innerHTML = ["<b>", title, "</b>", (hideContent ? "": ": " + (content instanceof Object ? JSON.stringify(content) : content))].join("");
        node.appendChild(li);
    }
	function addSubList(node, title, content) {
		var li = d.createElement("li"), ul = d.createElement("ul"), i;
		li.innerHTML = "<b>" + title + ":</b>";
		for (i in content) {
			add(ul, i, content[i], 1);
		}
		li.appendChild(ul);
		node.appendChild(li);
	}
    function queryMe(f) {
        if (!f.length) { return; }
        var data = f.shift();
        ajax(data.url + "?f=json",
			function (response) {
			    var dF = d.createDocumentFragment(),
                    ul = d.createElement("ul");
			    response = JSON.parse(response);
			    add(dF, "Description", response.description, true);
				add(dF, "Service Description", response.serviceDescription, true);
				add(dF, "&copy;", response.copyrightText, true);
				add(dF, "Supports Dynamic Layers", 0, response.supportsDynamicLayers, 1);
				add(dF, "# Layers", response.layers ? response.layers.length : 0);
				add(dF, "# Tables", response.tables ? response.tables.length : 0, 1);
				add(dF, "Tiled or Dynamic", response.tileInfo ? " tiled" : " dynamic");
				add(dF, "Spatial Reference", JSON.stringify(response.spatialReference || "none"));
			    add(dF, "Min Scale", response.minScale || "None");
			    add(dF, "Max Scale", response.maxScale || "None");
			    addSubList(dF, "Initial Extent", response.initialExtent);
				addSubList(dF, "Full Extent", response.fullExtent);
				add(dF, "Units", response.units.replace("esri", ""));
				addSubList(dF, "Document Info", response.documentInfo);
				add(dF, "Max Record Count", response.maxRecordCount);
			    tags[data.i].parentNode.appendChild(ul);
			    ul.appendChild(dF);
			    if (f.length) {
			        queryMe(f);
			    }
			});
    }

	for (i = 0; i < tags.length; i++) {
		// filter links for map service layers (index number at end);
		if (/(map|feature|image|mobile)server\/?$/i.test(tags[i].href)) {
			urls.push({ i: i, url: tags[i].href });
		}

		if (urls && urls.length) {
			queryMe(urls);
		}
	}
}());