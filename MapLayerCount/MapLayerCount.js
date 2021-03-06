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
                x.readyState > 3 && callback && callback(JSON.parse(x.responseText), x);
            };
            x.send(data);
        } catch (e) {
            window.console && console.log(e);
        }
    }
    function add(frag, title, content) {
        var li = d.createElement("li");
        li.innerHTML = ["<b>", title, "</b>", content != null ? ": " : "", content].join("");
        frag.appendChild(li);
    }
    function queryMe(f) {
        if (!f.length) { return; }
        var data = f.shift();
        ajax(data.url + "?f=json",
			function (response) {
				
			    var ul = d.createElement("ul"),
					oid = null,
					shape = null,
					newURL = data.url + "/query?where=not+field+is+null&returnGeometry=false&returnCountOnly=true&f=json",
					j;
				
				if (response.fields) { 
				
					for (j = 0; j < response.fields.length; j++) {
						switch(response.fields[j].type) {
							case "esriFieldTypeOID":
							case "":
								oid = response.fields[j].name;
								break;
							case "esriFieldTypeGeometry":
								shape = response.fields[j].name;
								break;
						}
						if (oid && shape) { break; }
					}
				}
				
				if (oid) {
					ajax(newURL.replace("field", oid), function (counter) {
						add(ul, "Number of Results", counter.count);
					});
				}
				if (shape) {
					ajax(newURL.replace("field", shape), function (counter) {
						add(ul, "With geometry", counter.count);
					});
				}
				if (response.fields && !oid && !shape) {
					add(ul, "No Queryable Results");
				}
				
				tags[data.i].parentNode.appendChild(ul);
				
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
            
        }
		if (urls && urls.length) {
			queryMe(urls);
		}

    } else {
        if (/server\/\d+\/?$/i.test(window.location.href)) {
            alert("Go to the parent map service layer.");
        } else {
            alert("Pick a valid layer");
        }
    }
}());