(function () {
    "use strict";
    var url = window.location.href.split("?")[0],
      qreg = /\/query\/?$/i;

    // ajax function from https://gist.github.com/Xeoncross/7663273
  	function ajax(u, callback, data, x) {
  		try {
  			x = new(window.XMLHttpRequest || ActiveXObject)("MSXML2.XMLHTTP.3.0");
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
    function loadElement (tag, attributes, text) {
      var el = document.createElement(tag), a;
      for (a in attributes) {
        el.setAttribute(a, attributes[a]);
      }
      if (text) {
        el.innerHTML = text;
      }
      return el;
    }
    function swapInFields(fields, node) {
        var select = loadElement("select", {
            "name": node.name
        });
        fields.forEach(function(field) {
            var option = loadElement("option", {
            value: field.name
            }, field.alias + " (" + field.name + ")");
            select.appendChild(option);
        });
        select.value = fields[0].name;
        node.parentNode.replaceChild(select, node);
    }
	// set active blank when clicking on the controls.
    function elementsToArray(tag) {
        return [].map.call(document.getElementsByTagName(tag), function (item) { return item; });
    }
    function getBlanks() {
        return elementsToArray("INPUT").concat(elementsToArray("TEXTAREA"));
    }
    function fillBlanks(blanks) {
        var fieldValues = {
            where: "1=1",
            returnDistinctValues: "true",
            returnGeometry: "false"
        };
        blanks.forEach(function (blank) {
            if (fieldValues.hasOwnProperty(blank.name)) {
                if (blank.type && blank.type === "radio" && fieldValues[blank.name] === blank.value) {
                  blank.checked = true;
                } else {
                  blank.value = fieldValues[blank.name];
                }
            } else if (blank.name === "outFields") {
              ajax(url.replace(qreg, "?f=json"), function (response) {
                swapInFields(response.fields.filter(function (field) {
                  return field.type.substr(13).toLowerCase() !== "geometry";
                }), blank);
              })
            }
        });
    }
  if (qreg.test(url)) {
		fillBlanks(getBlanks());
	} else {
		if (!/(map|feature)server\/\d+\/?$/i.test(url)) {
			alert("Go to the query page to use this tool.");
		} else {
			alert("Pick a valid layer");
		}
	}
}());
