(function () {
    var d = document,
		tags = d.getElementsByTagName("a"),
		urls = [],
		colorhash = {},
		i;
    function getFullLink(link) {
        var newLink = "", wl = window.location;
        if (link.indexOf(wl.protocol) === 0) { return link; }
        newLink += wl.protocol + "//";
        if (link.indexOf(wl.hostname) === 0) { return newLink + link; }
        newLink += wl.hostname;
        if (link.indexOf(wl.pathname) === 0) { return newLink + link; }
        return newLink + wl.pathname + link;
    }
    function getColor(item) {
        if (colorhash[item]) { return colorhash[item]; }
        colorhash[item] = "#" + (0x1000000 + (Math.random()) * 0xffffff).toString(16).substr(1, 6);
        return colorhash[item];
    }
    function getCompColor(item) {
        var col = colorhash[item],
            newcol = "",
			mid = [col.substr(1,1),col.substr(3,1),col.substr(5,1)].sort()[1],
			coltbl = "fedcba98".indexOf(mid) > -1 ? "0000000001234567" : "89abcdefffffffff", 
			c; 
		for (c = 0; c < col.length; c++) { 
			newcol += c%2 === 1 ? coltbl[parseInt(col.substr(c,1), 16)] : col.substr(c, 1); 
		} 
		return newcol; 
    }
	function srNode(sr) {
		var n, 
		val="&nbsp;No valid spatial reference available &nbsp;",
		el = "span";
		if (sr) {
			val = sr.latestWkid || sr.wkid || sr.latestWkt || sr.wkt || noval;
			if (sr.latestWkid || sr.wkid) {
				el = "a";
			}
		}
		n = d.createElement(el);
		if (el === "a") {
			n.setAttribute("href", "http://spatialreference.org/ref/?search=" + val);
		}
		n.setAttribute("style", ["color:", getColor(val), ";background:", getCompColor(val), ";"].join(""));
		n.innerHTML = val;
		return n;
	}
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
	function queryMe(f) {
		if (!f.length) { return; }
		var data = f.shift();
		ajax(data.url + "?f=json",
			function (response) {
				response = JSON.parse(response);
				var node = srNode(response.spatialReference),
					n2 = d.createElement("b");
				n2.innerHTML = "&nbsp;" + response.singleFusedMapCache ? "tiled" : "dynamic";
				//alert("" + data.i + ": " + tags.length);
				data.link.parentNode.appendChild(node);
				data.link.parentNode.appendChild(n2);
				if (f.length) {
					queryMe(f);
				}
			});
	}
	
	for (i = 0; i < tags.length; i++) {
		// filter links for map service layers (index number at end);
		if (/(map|feature|image|mobile)server\/?$/i.test(tags[i].href)) {
			urls.push({link: tags[i], url: getFullLink(tags[i].href) });
		}
	}
	// if there are services that fit the test, query them.
	if (urls && urls.length) {
		queryMe(urls);
	} else {
		alert("Pick a REST Service folder with services");
	}
}());