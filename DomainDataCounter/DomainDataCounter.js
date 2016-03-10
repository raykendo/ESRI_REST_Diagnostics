(function () {
    var url = window.location.href,
		d = document;
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

	function queryMe(f, nodes, tr) {
		if (!f.length) { return; }
		if (!tr) {
			var node = nodes.shift();
			tr = d.createElement("ul");
			node.appendChild(tr);
		}
		if (f[0].length) {
			var item = f[0].shift(),
			value = item.type === "esriFieldTypeString" ? "'" + item.code + "'" : item.code,
			params = "/query?where=field+%3D+value&returnGeometry=false&returnCountOnly=true&f=json".replace("field", item.field).replace("value", value);
			ajax(url + params,
				function (response) {
					response = JSON.parse(response);
					var li = d.createElement("li");
					li.innerHTML = ["<b>", item.name, ": </b>", response.count, (!response.count ? "<b style=\"color:#f00;\"> !!!</b>" : "")].join("");
					tr.appendChild(li);
					if (f[0].length) {	queryMe(f, nodes, tr); }
					else {
						f.shift();
						if (f.length) {
							queryMe(f, nodes);
						}
					}
				});
		}

	}
	function getFieldList() {
		var uls = d.getElementsByTagName("ul"),
			labels = [].map.call(uls, function (node) { var h = node; while (h.previousSibling) { h = h.previousSibling; if (h.tagName === "B") break; } return h.innerHTML;}),
			i;
		for (i = uls.length - 1; i > -1; i--) {
			if (/^Fields\:/.test(labels[i])) {
				return [].map.call(uls[i].children, function (j) {return j;});
			}
		}
		return null;
	}
	function onLoad(response) {
		var fieldNodes, fields = [], i, field;
		response = JSON.parse(response);
		if (response.fields) {
			fieldNodes = getFieldList();
			//filter fields with domains
			for (i = response.fields.length - 1; i > -1; i--) {
				field = response.fields[i];
				if (field.domain) {
					if (field.domain.codedValues) {
						fields.push(field.domain.codedValues.map(function (item) {
							item.field = field.name;
							item.type = field.type;
							return item;
						}));
					} else if (field.domain.range) {
						// handle field.domain.range, probably with a histogram
					}
				} else {
					// cut out field nodes that don't have a domain
					fieldNodes.splice(i, 1);
				}
			}
			fields.reverse();
			queryMe(fields, fieldNodes, null);
		}
	}

	if (/\d+\/?$/.test(url)) {
		ajax(url + "?f=json", onLoad);
	} else {
		if (!/(map|feature)server\/?$/i.test(url)) {
			alert("Pick a map/feature service and layer");
		} else {
			alert("Pick a valid layer");
		}
	}
}());
