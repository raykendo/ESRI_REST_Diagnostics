# Layer Feature Counter (ESRI REST Diagnostics) 

A bookmarklet to get feature result counts from layers in a map service.

## Features

The bookmarklet queries each layer in the map service, getting a count of non-null values for the object id and/or shape field. The searches skip layers with no fields (Group or Parent layers), and lets you know if you did not expose the object id if the layers are queryable.

## Instructions

### Installation

Installation on the browser is as simple as adding a bookmark. From the [bookmarklet.html](https://github.com/raykendo/ESRI_REST_Diagnostics/blob/master/bookmarklets.html) page... 

- Chrome: drag the anchor link to your browser toolbar.
- Firefox: right-click on the link and select "Bookmark this link".
- IE: right-click on the link and select "Add to Favorites".
- Safari: untested.
- Opera: untested.

### Basic Use

Navigate to an ArcGIS Server REST service endpoint in your browser. Drill down to a Map Service or a Feature Service. [Click here for an example](http://sampleserver6.arcgisonline.com/arcgis/rest/services/Census/MapServer). Call the bookmarklet from your bookmark bar, and let it run.

The tool adds lists after the links to each layer, listing the number of results and the number of results with shapes.

## Requirements

- Desktop browser (IE8+, Chrome, Firefox)
- Security settings that support bookmarklets.
- Access to an ArcGIS Server REST endpoint in browser.

## Notes

- Currently untested on Safari. Please give me feedback if you try it.
- Not tested on mobile/tablet browsers, since I'm not sure how bookmarklets work with those. 

## Contributing

Anyone is welcome to contribute to this project.

## Licensing

This is currently licensed under the MIT Licensing ([See License here](https://github.com/raykendo/ESRI_REST_Diagnostics/blob/master/LICENSE)).