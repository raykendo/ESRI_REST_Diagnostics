# MapService Data Extractor (MapServiceData.js) - ESRI REST Diagnostics

A JavaScript bookmarklet for viewing all relevant map service data at a folder level.

## Features

This bookmarklet examines each map service whose link you can see, and lists data about each map service without having to navigate to it.

Map Service data displayed includes

- Descriptions
- Service Descriptions
- Copyright text
- Dynamic Layer Support
- Number of map layers
- Number of tables (if any)
- Tiled or dynamic services
- Spatial Reference
- Min/Max Scale
- Initial Extent
- Full Extent
- Map Units
- Document Info
- Max Record Count (for queries)

## Instructions

### Installation

Installation on the browser is as simple as adding a bookmark. From the [ESRI Rest Diagnostics](http://raykendo.github.io/ESRI_REST_Diagnostics/) page...

- Chrome: drag the anchor link to your browser toolbar.
- Firefox: right-click on the link and select "Bookmark this link".
- IE: right-click on the link and select "Add to Favorites".
- Safari: untested.
- Opera: drag the anchor link to your browser toolbar. 

### Basic Use

In the browser, navigate to the ArcGIS Server REST Service endpoint. From there, select the MapService Data Extractor bookmarklet from the bookmark list. Scroll down the page to view data on each map service.

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
