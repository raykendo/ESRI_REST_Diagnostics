(function () {
    var url = window.location.href,
		d = document,
		node;
	// ajax function from https://gist.github.com/Xeoncross/7663273
	function ajax(u, callback, data, x) {
		try {
			x = new(this.XMLHttpRequest || ActiveXObject)("MSXML2.XMLHTTP.3.0");
			x.open(data ? "POST" : "GET", u, 1);
			x.setRequestHeader("X-Requested-With", "XMLHttpRequest");
			x.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
			x.onreadystatechange = function () {
				x.readyState > 3 && callback && callback(x.responseText, x);
			};
			x.send(data)
		} catch (e) {
			window.console && console.log(e);
		}
	}
	function queryMe (f) { 
		if (!f.length) { return; }
		var field = f.shift(),
			params = "/query?where=not+field+is+null&returnGeometry=false&returnCountOnly=true&f=json".replace("field", field.name),
			timeCheck = Date.now();
		ajax(url + params,
			function (response) {
				response = JSON.parse(response);
				var tr = d.createElement("tr");
				tr.innerHTML = "<td>" + [field.name, field.alias, field.type, response.count, Date.now() - timeCheck].join("</td><td>") + "</td>";
				node.appendChild(tr);
				if (f.length) {	queryMe(f); }
			});
	}
	function onLoad(response) {
		response = JSON.parse(response);
		if (response.fields) {
			// create div
			var div = d.createElement("div");
			div.setAttribute("style", "position:fixed;bottom:5px;top:50%;right:5px;width:50%;border:1px solid #0F0;padding:5px;background:#fff;overflow:auto;text-align:center;");
			d.body.appendChild(div);
			// create close button
			var closer = d.createElement("button");
			closer.setAttribute("type", "button");
			closer.setAttribute("style", "float:right;");
			closer.onclick = function () { d.body.removeChild(div) };
			closer.innerHTML = "close";
			div.appendChild(closer);
			// create results table
			var table = d.createElement("table");
			table.setAttribute("style", "position:relative;margin:0 auto;");
			table.innerHTML = "<thead><tr><th>" + ["Field Name", "Alias", "Type", "# values not null", "Return Time (ms)"].join("</th><th>") + "</th></tr></thead>";
			div.appendChild(table);
			// add table body.
			node = d.createElement("tbody");
			table.appendChild(node);
			// run query
			queryMe(response.fields);
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