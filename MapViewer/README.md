# Map Service Viewer (MapViewer.js) - ESRI REST Diagnostics

A JavaScript bookmarklet for viewing a Map or Feature Service from the REST Service.

## Features

This bookmarklet loads an ArcGIS JavaScript API based map on the REST Service page, then loads a map with whatever map or feature service you specify. If you are on a map service level, it will automatically load the map service at the top of the page. If you are on a folder level with multiple services, you can hover your mouse over the links to the map or feature service to view it in the viewer.

## Instructions

### Installation

Installation on the browser is as simple as adding a bookmark. From the [ESRI Rest Diagnostics](http://raykendo.github.io/ESRI_REST_Diagnostics/) page...

- Chrome: drag the anchor link to your browser toolbar.
- Firefox: right-click on the link and select "Bookmark this link".
- IE: right-click on the link and select "Add to Favorites".
- Safari: untested.
- Opera: drag the anchor link to your browser toolbar. 

### Basic Use

In the browser, navigate to the ArcGIS Server REST Service endpoint. You can either view multiple map services from the folder level, or a single map service if you are looking at the map service endpoint.

## Requirements

- Desktop browser (IE8+, Chrome, Firefox)
- Security settings that support bookmarklets.
- Access to an ArcGIS Server REST endpoint in browser.

## Resources

[ESRI JavaScript API](https://developers.arcgis.com/javascript/index.html)

## Contributing

Anyone is welcome to contribute to this project.

## Licensing

This is currently licensed under the MIT Licensing ([See License here](https://github.com/raykendo/ESRI_REST_Diagnostics/blob/master/LICENSE)).
