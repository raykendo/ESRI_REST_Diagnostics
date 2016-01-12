(function () {
    var d = document,
		tags = d.getElementsByTagName("a"),
		urls = [];
  function insertAfter(newNode, refNode) {
		refNode.parentNode.insertBefore(newNode, refNode.nextSibling);
	}
	function Result(message, color) {
		var item = d.createElement("span");
		item.innerHTML = message;
		item.setAttribute("style", "font-weight:bold;color:" + color + ";");
		return item;
	}
	function onSuccess(index) {
		insertAfter(Result(" OK ", "green"), tags[index]);
		this.parentNode.removeChild(this);
	}
  function onError(index, error) {
		insertAfter(Result(" !!! ", "red"), tags[index]);
		console.error(error);
		this.parentNode.removeChild(this);
	}
  function queryMe(f) {
      if (!f.length) { return; }
      var data = f.shift(),
			  img = d.createElement("img");
		img.onerror = function (err) { onError.call(this, data.i, err); };
		img.onload = function () { onSuccess.call(this, data.i); };
		img.setAttribute("src", data.url);
		insertAfter(img, tags[data.i]);
		window.setTimeout(function () {
			queryMe(f);
		}, 50);
  }

  if (/(map|feature)server\/?$/i.test(window.location.href)) {
    [].forEach.call(tags, function (tag, i) {
      if (/server\/tile(\/\d+){3}\/?$/i.test(tag.href)) {
        urls.push({ i: i, url: tag.href });
      }
    });
	  if (urls && urls.length) {
	    queryMe(urls);
	  }

  } else if (/server\/\d+\/?$/i.test(window.location.href)) {
    alert("Go to the parent map service layer.");
  } else {
    alert("Pick a valid layer");
  }

}());
