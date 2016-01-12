# Tiled Service tester (TileTester.js) - ESRI REST Diagnostics

A JavaScript bookmarklet for testing available tiles in a tiled service.

## Features

This bookmarklet examines each level of detail in a tiled map service, and reports if the first and last tile folder locations return tiles or not.

This bookmarklet examines the links to the first and last tile in each level of detail. If the link produces a valid image, the bookmarklet writes "OK" in big green letters. If the link produces an invalid image, where an error is thrown, the bookmarklet will write "!!!" in red letters next to the link to show that it doesn't work.

## Instructions

### Installation

Installation on the browser is as simple as adding a bookmark. From the [bookmarklet.html](https://github.com/raykendo/ESRI_REST_Diagnostics/blob/master/bookmarklets.html) page...

- Chrome: drag the anchor link to your browser toolbar.
- Firefox: right-click on the link and select "Bookmark this link".
- IE: right-click on the link and select "Add to Favorites".
- Safari: untested.
- Opera: untested.

### Basic Use

In the browser, navigate to the map service REST endpoint. From there, select the Tiled Service Tester bookmarklet from the bookmark list. Scroll down the page to view data on each level of detail. The tool will add to the HTML page used by ArcGIS REST Services. REST services pointing to dynamic layers will be ignored, since they don't have links to tiles.

## Requirements

- Desktop browser (IE9+, Chrome, Firefox)
- Security settings that support bookmarklets.
- Access to an ArcGIS Server REST endpoint in browser.

## Resources

[ESRI JavaScript API](https://developers.arcgis.com/javascript/index.html)

## Contributing

Anyone is welcome to contribute to this project.

## Licensing

This is currently licensed under the MIT Licensing ([See License here](https://github.com/raykendo/ESRI_REST_Diagnostics/blob/master/LICENSE)).
