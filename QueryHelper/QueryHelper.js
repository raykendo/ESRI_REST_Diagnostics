(function () {
    var d = document,
		wl = window.location,
		url = wl.href.replace(wl.search, ""),
		qreg = /\/query\/?$/i,
		active;
	// ajax function from https://gist.github.com/Xeoncross/7663273
	function ajax(u, callback, data, x) {
		try {
			x = new(this.XMLHttpRequest || ActiveXObject)("MSXML2.XMLHTTP.3.0");
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
	function listenAll(node, selector, evt, callback) {
		[].forEach.call(node.querySelectorAll(selector), function (el) {
			el[evt] = callback;
		});
	}
	function build(fields) {
		var div = d.createElement("div"),
			listF = d.createElement("select"),
			listR = d.createElement("select"),
			btns = d.createElement("div");
		div.setAttribute("style", "position:fixed;top:10%;right:0;width:35%;padding:5px;background:#fff;overflow:auto;");
		div.innerHTML = "<button style=\"float:right;\" onclick=\"this.parentNode.parentNode.removeChild(this.parentNode);\">Close</button><b>Query Builder</b><br />";
		d.body.appendChild(div);
		listF.setAttribute("size", "10");
		listF.innerHTML = fields.map(function (field) {
			return ["<option value=\"", field.name, "\">", field.alias, "</option>"].join("");
		}).join("");
		div.appendChild(listF);
		listR.setAttribute("size", "10");
		div.appendChild(listR);
		listF.onchange = function () {
			var val = listF.value;
			ajax(url + "?where=1%3D1&returnGeometry=false&outFields=field&orderByFields=field&returnDistinctValues=true&f=json".replace(/field/g, val), function (res) {
				listR.innerHTML = [].map.call(res.features, function (feature) {
					return ["<option value=\"", feature.attributes[val], "\">", feature.attributes[val], "</option>"].join("");
				});
			});
		};
		btns.innerHTML = [" = ", " &lt;&gt; ", " LIKE ", " &gt; ", " &gt;= ", " AND ", " &lt; ", " &lt;= ", " OR ", "_", "%", "()", "NOT ", " IS ", "*", "&#39;&#39;", " IN ", ", " ].map(function (txt) {
			return ["<button class=\"sql\" type=\"button\" name=\"", txt, "\">", txt.replace(/\s+/g, ""), "</button>"].join("");
		});
		div.appendChild(btns);
		return div;
	}
	function setActive(value) {
		if (active !== undefined) {
			// get cursor position
			var oldVal = active.value.substring(0),
				iCaretPos = oldVal.length;
			active.focus();
			if (d.selection) {
				var oSel = d.selection.createRange();
				oSel.moveStart("character", -active.value.length);
				iCaretPos = oSel.text.length;
			} else if ("selectionStart" in active) {
				iCaretPos = active.selectionStart;
			}
			// insert clicked text
			active.value = oldVal.substring(0, iCaretPos) + value + oldVal.substring(iCaretPos);

			// reset cursor position
			iCaretPos += value.length - (["()", "''"].indexOf(value) > -1);
			if (active.createTextRange) {
				var range = active.createTextRange();
				range.move("character", iCaretPos);
				range.select();
			} else if ("selectionStart" in active) {
				active.setSelectionRange(iCaretPos, iCaretPos);
			}
		}
	}
    function onLoad(response) {
		var node = build(response.fields);
		listenAll(node, "select", "onclick", function (evt) {
			setActive(evt.currentTarget.value);
		});
		listenAll(node, "button.sql", "onclick", function (evt) {
			setActive(evt.currentTarget.name);
		});
    }
	// set active blank when clicking on the controls.
	listenAll(d, "input[type=text], textarea", "onblur", function () { active = this; });
    if (qreg.test(url)) {
		ajax(url.replace(qreg, "") + "?f=json", onLoad);
	} else {
		if (!/(map|feature)server\/\d+\/?$/i.test(url)) {
			alert("Go to the query page to use this tool.");
		} else {
			alert("Pick a valid layer");
		}
	}
}());