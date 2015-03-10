# Layer Property Extractor (MapLayerData.js) - ESRI REST Diagnostics

A JavaScript bookmarklet for displaying map and feature service layer data in the browser.

## Features

This bookmarklet examines each layer in a map service and lists data about each layer without having to navigate into each layer.

Data that the Layer Property Extractor provides includes.

- Geometry type
- Min/Max Scale
- Default visibility
- Definition Expressions assigned to the layer
- If the layer has labels
- If the layer has attachments
- If the layer supports statistics
- If the layer supports advanced queries
- If the layer has relationships
- If the layer comes from versioned data.

## Instructions

### Installation

Installation on the browser is as simple as adding a bookmark. From the [bookmarklet.html](https://github.com/raykendo/ESRI_REST_Diagnostics/blob/master/bookmarklets.html) page... 

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