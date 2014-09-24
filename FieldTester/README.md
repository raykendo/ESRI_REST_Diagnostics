# Field Tester (ESRI REST Diagnostics) 

A bookmarklet to get field information on ArcGIS Server Map Service and Feature Service layers.

## Features

The bookmarklet provides data count and return times for each field within an ArcGIS Server Map Service or Feature Service layer. You can use it to test data integrity and of each field, and roughly expected return times for queries. 

## Instructions

### Installation

Installation on the browser is as simple as adding a bookmark. From the [bookmarklet.html](https://github.com/raykendo/ESRI_REST_Diagnostics/blob/master/bookmarklets.html) page... 

- Chrome: drag the anchor link to your browser toolbar.
- Firefox: right-click on the link and select "Bookmark this link".
- IE: right-click on the link and select "Add to Favorites".
- Safari: untested.
- Opera: untested.

### Basic Use

Navigate to an ArcGIS Server REST service endpoint in your browser. Drill down to a Map Service or a Feature Service layer. [Click here for an example](http://sampleserver6.arcgisonline.com/arcgis/rest/services/Census/MapServer/3). Call the bookmarklet from your bookmark bar, and let it run.

The tool adds a table to the REST Service HTML page, and systematically queries for the count of each field value that isn't null. The table then displays field names, aliases, field types, number of non-null results, and the time it took for ArcGIS Server to return the count.

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