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
    function add(frag, title, content) {
        var li = d.createElement("li");
        li.innerHTML = ["<b>", title, "</b>", content ? ": " : "", content].join("");
        frag.appendChild(li);
    }
    function queryMe(f) {
        if (!f.length) { return; }
        var data = f.shift();
        ajax(data.url + "?f=json",
			function (response) {
			    var dF = d.createDocumentFragment(),
                    ul = d.createElement("ul");
			    response = JSON.parse(response);
			    add(dF, "Geometry", response.geometryType.replace("esriGeometry", ""));
			    add(dF, "Min Scale", response.minScale || "None");
			    add(dF, "Max Scale", response.maxScale || "None");
			    if (response.definitionExpression) {
			        add(dF, "Definition Expression", response.definitionExpression);
			    }
			    add(dF, "Visible by default", response.defaultVisibility.toString());
			    if (response.hasAttachments) {
			        add(dF, "Has Attachments");
			    }
			    if (response.hasLabels) {
			        add(dF, "Has Labels");
			    }
			    if (response.supportsStatistics) {
			        add(dF, "Supports Statistics");
			    }
			    if (response.supportsAdvancedQueries) {
			        add(dF, "Supports Advanced Queries");
			    }
			    if (response.relationships && response.relationships.length) {
			        add(dF, "Has Relationships");
			    }
			    add(dF, "Versioned Data", response.isDataVersioned ? "Yes" : "No");
				
			    tags[data.i].parentNode.appendChild(ul);
			    ul.appendChild(dF);
			    if (f.length) {
			        queryMe(f);
			    }
			});
    }

    if (/(map|feature)server\/?$/i.test(window.location.href)) {
        for (i = 0; i < tags.length; i++) {
            // filter links for map service layers (index number at end);
            if (/server\/\d+\/?$/i.test(tags[i].href)) {
                urls.push({ i: i, url: tags[i].href });
            }

            if (urls && urls.length) {
                queryMe(urls);
            }
        }

    } else {
        if (/server\/\d+\/?$/i.test(window.location.href)) {
            alert("Go to the parent map service layer.");
        } else {
            alert("Pick a valid layer");
        }
    }
}());