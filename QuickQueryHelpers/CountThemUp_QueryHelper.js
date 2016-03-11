(function () {
    "use strict";
    var url = window.location.href.split("?")[0];

	// set active blank when clicking on the controls.
    function elementsToArray(tag) {
        return [].map.call(document.getElementsByTagName(tag), function (item) { return item; });
    }
    function getBlanks() {
        return elementsToArray("INPUT").concat(elementsToArray("TEXTAREA"));
    }
    function fillBlanks(blanks) {
        var fieldValues = {
            "where": "1=1",
            returnCountOnly: "true"
        };
        blanks.forEach(function (blank) {
            if (fieldValues.hasOwnProperty(blank.name)) {
                if (blank.type && blank.type === "radio" && fieldValues[blank.name] === blank.value) {
                  blank.checked = true;
                } else {
                  blank.value = fieldValues[blank.name];
                }
            }
        });
    }
  if (/\/query\/?$/i.test(url)) {
		fillBlanks(getBlanks());
	} else {
		if (!/(map|feature)server\/\d+\/?$/i.test(url)) {
			alert("Go to the query page to use this tool.");
		} else {
			alert("Pick a valid layer");
		}
	}
}());
