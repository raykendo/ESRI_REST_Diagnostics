# Field Tester (ESRI REST Diagnostics)

Bookmarklets to test for field values populated by data.

## Features

The bookmarklets count the number of features with values and return server response times for each field within an ArcGIS Server Map Service or Feature Service layer. The first tests for non-null data, while the second also checks for empty strings. You can use these bookmarklets to test data integrity and of each field, and roughly expected return times for queries.

## Instructions

### Installation

Installation on the browser is as simple as adding a bookmark. From the [ESRI Rest Diagnostics](http://raykendo.github.io/ESRI_REST_Diagnostics/) page... 

- Chrome: drag the anchor link to your browser toolbar.
- Firefox: right-click on the link and select "Bookmark this link".
- IE: right-click on the link and select "Add to Favorites".
- Safari: untested.
- Opera: untested.

### Basic Use

Navigate to an ArcGIS Server REST service endpoint in your browser. Drill down to a Map Service or a Feature Service layer. [Click here for an example](http://sampleserver6.arcgisonline.com/arcgis/rest/services/Census/MapServer/3). Call the bookmarklet from your bookmark bar, and let it run.

The bookmarklets systematically queries for the count of each field value that isn't null, then adds notes to each field with the number of features with values, as well as the number of milliseconds it took to return the features. The first bookmarklet screens out null values, while the second screens out null and empty string values.

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
