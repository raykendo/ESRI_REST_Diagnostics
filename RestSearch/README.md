# ArcGIS REST Service Search (RestSearch.js) - ESRI REST Diagnostics

A JavaScript bookmarklet for searching for properties in map services based on a string or numeric value.

## Features

This bookmarklet queries the current and lower level REST Service endpoints to find a text value that matches the current search text.

This bookmarklet searches through map service folders and names, field names and attributes, layer names, layer descriptions, copyright text, and other data. Results are provided in a list with links pointing to the resulting data.

## Instructions

### Installation

Installation on the browser is as simple as adding a bookmark. From the [ESRI Rest Diagnostics](http://raykendo.github.io/ESRI_REST_Diagnostics/) page... 

- Chrome: drag the anchor link to your browser toolbar.
- Firefox: right-click on the link and select "Bookmark this link".
- IE: right-click on the link and select "Add to Favorites".
- Safari: untested.
- Opera: untested.

### Basic Use

In the browser, navigate to any ArcGIS Server REST Service endpoint. From there, select the REST Search bookmarklet from the bookmark list. When the search box appears in the upper right hand corner, enter the value you wish to search for, and click the "Search" button. Depending on your internet connection and the ArcGIS Server connection, searches may take a minute or two to complete.

Once the list of possible results is generated, links to the resulting layers will be provided, as well as data about the map service name, property, and the matching result. Clicking on the link will navigate you to the result.

Please Note: Once you navigate away from the page, the search results will be removed, and will have to be generated again. If you must keep the search results, even temporarily, it is recommended that you open the links in a new tab or window.

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
