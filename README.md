# ESRI REST Diagnostics

A list of JavaScript bookmarklets that can be used to test ArcGIS Server Map Services through the browser.

## Features

The bookmarklets provided add extra information to the ArcGIS Server REST endpoint pages. They work by collecting the underlying data and adding the results to the current HTML REST Service page. Some of features include:

- Folder level:
  - [Extract Map Service data for each Map and Feature Service in the folder.](https://github.com/raykendo/ESRI_REST_Diagnostics/tree/master/MapServiceData)
  - [Compare Spatial References of all Map and Feature Services in a folder.](https://github.com/raykendo/ESRI_REST_Diagnostics/tree/master/SpatialRefCompare)
  - [View Maps in a map service.](https://github.com/raykendo/ESRI_REST_Diagnostics/tree/master/MapViewer)
- Map Service level:
  - [Extract Layer data for each layer in the service.](https://github.com/raykendo/ESRI_REST_Diagnostics/tree/master/MapLayerData)
  - [Get counts of features and shapes for each layer in the service.](https://github.com/raykendo/ESRI_REST_Diagnostics/tree/master/MapLayerCount)
  - [Test whether tiles have been built at different levels of detail in a tiled map service.](https://github.com/raykendo/ESRI_REST_Diagnostics/tree/master/TileTester)
  - [View the service on a map.](https://github.com/raykendo/ESRI_REST_Diagnostics/tree/master/MapViewer)
- Map Service Layer level
  - [Test each field for number of non-empty results.](https://github.com/raykendo/ESRI_REST_Diagnostics/tree/master/FieldTester)
  - [Test each field for content and see how fast the results return.](https://github.com/raykendo/ESRI_REST_Diagnostics/tree/master/FieldTester)
  - [Test each field with a coded value domain to see how many features have each coded value.](https://github.com/raykendo/ESRI_REST_Diagnostics/tree/master/DomainDataCounter)
- Miscellaneous
  - [Search REST Services for specific field or text string](https://github.com/raykendo/ESRI_REST_Diagnostics/tree/master/RestSearch)
  - [Use a "Select By Attributes" like query helper to create Queries](https://github.com/raykendo/ESRI_REST_Diagnostics/tree/master/QueryHelper)
  - [Adding ArcGIS REST API compliant geometry json to queries, based on a map of the map service.](https://github.com/raykendo/ESRI_REST_Diagnostics/tree/master/GeometryHelper)

More features will be made available on request.

## Instructions

### Installation

Installation on the browser is as simple as adding a bookmark. From the [ESRI Rest Diagnostics](http://raykendo.github.io/ESRI_REST_Diagnostics/) page...

- Chrome: drag the anchor link to your browser toolbar. ![Install to Chrome illustration](https://github.com/raykendo/ESRI_REST_Diagnostics/blob/master/images/Install_Chrome.gif "Installing bookmarklets on Chrome")
- Firefox: right-click on the link and select "Bookmark this link". ![Install to Firefox illustration](https://github.com/raykendo/ESRI_REST_Diagnostics/blob/master/images/Install_Firefox.gif "Installing bookmarklets on Firefox")
- IE: right-click on the link and select "Add to Favorites". ![Install to Internet Explorer illustration](https://github.com/raykendo/ESRI_REST_Diagnostics/blob/master/images/Install_IE.gif "Installing bookmarklets on Internet Explorer")
- Safari: untested.
- Opera: drag the anchor link to your browser toolbar. ![Install to Opera illustration](https://github.com/raykendo/ESRI_REST_Diagnostics/blob/master/images/Install_Opera.gif "Installing bookmarklets on Opera")

### Basic Use

Each tool as its own basic use policy. They all involve navigating your web browser to the map service REST endpoint. From there, select the proper bookmark from the bookmark list.

## Requirements

- Desktop browser (IE8+, Chrome, Firefox)
- Security settings that support bookmarklets.
- Access to an ArcGIS Server REST endpoint in browser.
- Some tools require access to [ArcGIS JavaScript API library](http://js.arcgis.com/3.15/).

## Resources

[ArcGIS JavaScript API](https://developers.arcgis.com/javascript/index.html)

## Contributing

Anyone is welcome to contribute to this project.

## Licensing

This is currently licensed under the MIT Licensing ([See License here](https://github.com/raykendo/ESRI_REST_Diagnostics/blob/master/LICENSE)).
