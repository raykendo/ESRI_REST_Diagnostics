(function () {
    var url = window.location.href,
		d = document;
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
			x.send(data);
		} catch (e) {
			window.console && console.log(e);
		}
	}
    function responseTime (timeValue) {
        var timeDiff = Date.now() - timeValue;
        return "" + (timeDiff > 1000 ? timeDiff / 1000 : timeDiff + "m") + "s"; 
    }
	function queryMe (f, nodes) { 
		if (!f.length) { return; }
		var field = f.shift(),
			node = nodes.shift(),
			params = "/query?where=not+field+is+null&returnGeometry=false&returnCountOnly=true&f=json".replace("field", field.name),
			timeCheck = Date.now();
		ajax(url + params,
			function (response) {
				response = JSON.parse(response);
				var tr = d.createElement("ul");
				tr.innerHTML = "<li>" + ["<b>Features with values: </b>" + response.count + (!response.count ? "<b style=\"color:#f00;\"> !!!</b>":""), "<b>Response Time: </b>" + responseTime(timeCheck)].join("</li><li>") + "</li>";
				node.appendChild(tr);
				if (f.length) {	queryMe(f, nodes); }
			});
	}
	function getFieldList () {
		var uls = d.getElementsByTagName("ul"),
			labels = [].map.call(uls, function (node) { var h = node; while (h.previousSibling) { h = h.previousSibling; if (h.tagName === "B") break; } return h.innerHTML;}),
			i;
		for (i = uls.length - 1; i > -1; i--) {
			if (labels[i] === "Fields: ") {
				return [].map.call(uls[i].children, function (j) {return j;});
			}
		}
		return null;
	}
	function onLoad(response) {
		response = JSON.parse(response);
		if (response.fields) {
			// run query
			queryMe(response.fields, getFieldList());
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