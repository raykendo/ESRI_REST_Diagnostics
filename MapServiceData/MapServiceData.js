(function () {
    var url = "http://js.arcgis.com/3.10/", scr1, colorhash = {};
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
			coltbl = "fedcba98".indexOf(col.substr(1,1)) > -1 ? "0000000001234567" : "89abcdefffffffff", 
			c; 
		for (c = 0; c < col.length; c++) { 
			newcol += c%2 === 1 ? coltbl[parseInt(col.substr(c,1), 16)] : col.substr(c, 1); 
		} 
		return newcol; 
    }
    function loadMe() {
        require([
            "dojo/query",
            "dojo/dom-construct",
            "dojo/dom-attr",
            "esri/request"
        ], function (dojoQuery, domConstruct, domAttr, esriRequest) {
            var review = function (list) {
                var jsonUrl, node;
                if (list.length) {
                    node = list.shift();
                    jsonUrl = domAttr.get(node, "href");
                    jsonUrl = getFullLink(jsonUrl);
                    esriRequest({
                        url: jsonUrl,
                        handleAs: "json",
                        content:{f:"json"}
                    }).then(function (response) {
                        var wkid, wkt, sp;
                        if (!response.spatialReference) { return; }
                        sp = response.spatialReference; 
						wkid = sp.latestWkid || sp.wkid || null;
						wkt = sp.latestWkt || sp.wkt || null;
                        if (wkid === null && wkt === null) {
                            domConstruct.create("span", {
                                innerHTML: "&nbsp;No valid spatial reference available &nbsp;"
                            }, node, "after");
                        }
                        else {
                            domConstruct.create("a", {
                                href: wkid ? "http://spatialreference.org/ref/?search=" + wkid : "javascript:void(0);",
                                innerHTML: wkid ? "WKID: " + wkid : "WKT: " + wkt,
                                style:"background:" + getColor(wkid || wkt) + ";color:" + getCompColor(wkid || wkt) + ";"
                            }, node, "after");
                        }
                        domConstruct.create("span", {
                            innerHTML: "&nbsp;" + (response.singleFusedMapCache ? "tiled" : "dynamic") + "&nbsp;"
                        }, node, "after");

                        review(list);
                    });
                    
                }
            },
            linkList = dojoQuery("a[href$=\"MapServer\"],a[href$=\"FeatureServer\"],a[href$=\"ImageServer\"],a[href$=\"MobileServer\"]");
            
            review(linkList);
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