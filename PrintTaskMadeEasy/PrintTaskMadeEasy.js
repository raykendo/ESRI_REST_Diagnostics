(function () {
  "use strict";
  var url = window.location.href.split("?")[0],
    d = document,
    urlTest = /(execute|submitjob)\/?$/ig;
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
    var el = d.createElement(tag), a;
    for (a in attributes) {
      el.setAttribute(a, attributes[a]);
    }
    if (text) {
      el.innerHTML = text;
    }
    return el;
  }
  function swapInChoices(parameters, nodes) {
    parameters.forEach(function (param) {
      if (!param.choiceList) {
        return;
      }
      console.log("Parameter...", param);
      var select = loadElement("select", {
        "name": param.name
      });
      param.choiceList.forEach(function(choice) {
        var option = loadElement("option", {
          value: choice
        }, choice);
        select.appendChild(option);
      });
      select.value = param.defaultValue;
      var myNode = nodes.filter(function (node) {
        console.log(node.name);
        return node.name === param.name;
      })[0];
      myNode.parentNode.replaceChild(select, myNode);
    });
  }
  function toArray(item) {
    return [].map.call(item, function(i) {return i;});
  }
  function dataRequested(response) {
    var myForm, blanks = [], b;
    if (!response.parameters) {
      alert("Could not find GP parameters for this task.");
      return;
    }
    try {
      myForm = d.getElementsByTagName("FORM")[0];
      blanks = toArray(myForm.getElementsByTagName("TEXTAREA"));
      blanks = blanks.concat(toArray(myForm.getElementsByTagName("INPUT")));
      swapInChoices(response.parameters, blanks);
      blanks.some(function (blank) {
        if (blank.name === "Web_Map_as_JSON") {
          blank.value = "{\"operationalLayers\":[],\"baseMap\":{\"baseMapLayers\":[{\"id\":\"defaultBasemap\",\"opacity\":1,\"visibility\":true,\"url\":\"http://services.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer\"}],\"title\":\"Topographic\"},\"exportOptions\":{\"dpi\":300,\"outputSize\":[1280,1024]}}";
        }
        return blank.name === "Web_Map_as_JSON";
      })
    } catch (err) {
      console.error(err);
      alert("invalid form");
    }
  }
  if (!urlTest.test(url)) {
    alert("Navigate to valid print task form.")
  } else {
    ajax(url.replace(urlTest, "") + "?f=json", dataRequested);
  }
}());
