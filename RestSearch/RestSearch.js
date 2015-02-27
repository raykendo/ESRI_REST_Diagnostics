(function () {
    var d = document,
		form = d.createElement("form"),
		txt = d.createElement("input"),
		btn = d.createElement("button"),
		resultList = d.createElement("ul"),
		locs, hits;
		
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
	// get values of dot.notated.parameters out of a JSON object
	// @param {string[]} fields - list of fields
	// @param {object} data - JSON object.
	function getFinalVal(fields, data) {
		var result = data.hasOwnProperty(fields[0]) ? data[fields[0]] : null;
		if (result != null && fields.length > 1) {
			if (result instanceof Array) {
				return result.map(function (item) {
					return getFinalVal(fields.slice(1), item);
				});
			}
			return getFinalVal(fields.slice(1), result);
		}
		return result;
	}
	// displays a link to a map service REST endpoint with data that matches the search.
	// @param {string} field
	// @param {string} result
	// @param {string} url
	function printResult(field, result, url) {
		var li = d.createElement("li"),
		    link = d.createElement("a");
		link.setAttribute("href", url);
		link.innerHTML = [url.replace(/^\S*\/rest\/services\//i, ""), "=> ", field, ": ", result].join("");
		li.appendChild(link);
		resultList.appendChild(li);
	}
	// test if the result matches the search. If so, increments the hit counter and displays the result.
	function checkAndPrint(myTest, field, result, url) {
		if (myTest(result)) {
			hits++;
			printResult(field, result, url);
		}
	}
	// collect values from the data, and send the data off for testing.
	function responseSearch(url, data, myTest) {
		var fieldList = ["name", "description", "displayField", "fields.name", "fields.alias", "mapName", "layers.name", "documentInfo.Title", "documentInfo.Comments", "documentInfo.Subject", "documentInfo.Category", "documentInfo.Keywords", "folder", "service.name"];
		fieldList.forEach(function (field) {
			var result = getFinalVal(field.split("."), data);
			if (result == null) { return; }
			if (result instanceof Array) {
				result.forEach(function (item) {
					checkAndPrint(myTest, field, item, url);
				});
			} else {
				checkAndPrint(myTest, field, result, url);
			}
		});
	}
	
	// returns a list of child folders for the current service.
	function subUrls(url, data) {
		var list = [],
			runners = {
				"folders": function (folder) { return [url, folder].join("/"); },
				"services": function (service) { return [url, service.name.replace(/\w+\//ig, ""), service.type].join("/"); },
				"layers": function (layer) { return [url, layer.id].join("/"); },
				"tables": function (table) { return [url, table.id].join("/"); }
			}, r;
		for (r in runners) {
			if (data[r] && data[r].length) {
				list = list.concat(data[r].map(runners[r]));
			}
		}
		return list;
	}
	// given a list of urls and a testing function, requests data from the first url in the list, searches the JSON response,
	// and if there are more urls in the list, calls itself again.
	// @param {string[]} list - list of urls
	// @param {function} myTest - test to perform on the results to see if it matches.
	function queryMe(list, myTest) { 
		if (!list.length) { return; }
		var url = list.shift();
		ajax(url + "?f=json",
			function (data) {
				locs++;
				responseSearch(url, data, myTest);
				list = list.concat(subUrls(url, data));
				if (list.length) {	
					queryMe(list, myTest); 
				} else {
					btn.removeAttribute("disabled");
					btn.innerHTML = "Search";
					var li = d.createElement("li");
					li.innerHTML = ["<b>Places Searched:</b>",locs,"<br/><b>Results found</b>",hits].join(" ");
					resultList.insertBefore(li, resultList.firstChild);
				}
			});
	}
	// function called on mouse click, parses searches, sets up tests, and queries the current REST service.
	function onSubmit() {
		var searchFor, myTest;
		if (txt.value) {
			// clear the list
			while (resultList.childNodes.length) {
				resultList.removeChild(resultList.childNodes[0]);
			}
			btn.innerHTML = "Scanning";
			btn.setAttribute("disabled", "disabled");
			
			if (/^\d*\.?\d+$/.test(txt.value)) {
				searchFor = /\./.test(txt.value) ? parseFloat(txt.value) : parseInt(txt.value, 10);
				myTest = function (val) { return val === searchFor; };
			} else {
				searchFor = new RegExp(txt.value, "i");
				myTest = function (val) { return searchFor.test(val); };
			}
			locs = 0;
			hits = 0;
			queryMe([window.location.href.replace(window.location.search, "")], myTest);
		} else { alert("Please enter a value"); }
		return false;
	}

	form.setAttribute("style", "position:fixed;top:5px;right:5px;width:300px;height:80%;overflow:auto;z-index:100;background:#fff;font-size:0.9em;");
	txt.setAttribute("style", "width:75%");
	form.appendChild(txt);
	btn.innerHTML = "Search";
	btn.onclick = onSubmit;
	form.appendChild(btn);
	form.appendChild(resultList);
	d.body.appendChild(form);
}());