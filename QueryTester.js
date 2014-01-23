(function () {
    var url = "http://js.arcgis.com/3.8/", scr1;
    function loadMe() {
        require(["dojo/ready", "dojo/dom-construct", "dojo/on", "esri/request", "esri/tasks/query", "esri/tasks/QueryTask"
        ], function (ready, domConstruct, on, esriRequest, Query, QueryTask) {
            var qt = new QueryTask(window.location.href),
                queryMe = function (tbody, f, i) {
                    var q = new Query(),
                           timeCheck;
                    if (i < f.length) {
                        q.returnGeometry = false;
                        q.outFields = [];
                        q.where = ["NOT", f[i].name, "IS NULL"].join(" ");
                        timeCheck = Date.now();
                        qt.executeForCount(q).then(function (resp) {
                            var tr = domConstruct.create("tr", {}, tbody),
                                results = [f[i].name, f[i].alias, f[i].type, resp, Date.now() - timeCheck],
                                x;
                            for (x = 0; x < 5; x++) {
                                domConstruct.create("td", {
                                    innerHTML: results[x]
                                }, tr);
                            }
                            queryMe(tbody, f, ++i);
                        });
                    }
                };
            ready(function () {
                var div = domConstruct.create("div", {
                    style: "position:fixed;bottom:5px;top:50%;right:5px;width:50%;border:1px solid green;padding:5px;background:#fff;overflow:auto;text-align:center;"
                }, document.body),

                closer = domConstruct.create("button", {
                    type: "button",
                    innerHTML: "Close",
                    style: "float: right;"
                }, div);

                on(closer, "click", function () {
                    domConstruct.destroy(div);
                });

                esriRequest({
                    url: qt.url,
                    handleAs: "json",
                    content: { f: "json" }
                }).then(function (response) {
                    if (response.fields) {
                        var tbl = domConstruct.create("table", {
                            style: "position:relative;margin:0 auto;"
                        }, div),
                            tbdy = domConstruct.create("tbody", {}, tbl);
                        domConstruct.create("tr", {
                            innerHTML: "<th>" + ["Field Name", "Alias", "Type", "Records with values", "Return Time (ms)"].join("</th><th>") + "</th>"
                        }, tbdy);
                        queryMe(tbdy, response.fields, 0);
                    }
                }, function (err) {
                    alert(err.toString());
                });
            });
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