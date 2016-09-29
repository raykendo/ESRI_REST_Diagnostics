# Spatial Reference Comparison Tool (SpatialRefCompare.js) - ESRI REST Diagnostics

A JavaScript bookmarklet for comparing the spatial references of map services on a page.

## Features

This bookmarklet displays and color-codes the spatial references of each map service in a folder, and also lists whether the map service is tiled or dynamic. Layers with the same spatial reference (either by wkid or wkt) will show with the same color. If WKID is listed, a link to SpatialReference.org will be provided to view information on it.

## Instructions

### Installation

Installation on the browser is as simple as adding a bookmark. From the [ESRI Rest Diagnostics](http://raykendo.github.io/ESRI_REST_Diagnostics/) page... 

- Chrome: drag the anchor link to your browser toolbar.
- Firefox: right-click on the link and select "Bookmark this link".
- IE: right-click on the link and select "Add to Favorites".
- Safari: untested.
- Opera: untested.

### Basic Use

In the browser, navigate to the map service REST endpoint. From there, select the Layer Data Extractor bookmarklet from the bookmark list. Scroll down the page to view data on each layer.

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
