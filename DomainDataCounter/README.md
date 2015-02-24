# Domain Data Counter (ESRI REST Diagnostics) 

Bookmarklet to test ArcGIS REST Service fields with domains, counting the number of features with each domain value assigned to a field.

## Features

This bookmarklet scans an ArcGIS Server MapService layer for fields that have domains. When it finds a field with a domain, it loops through each domain value and queries the layer for the number of features that have that domain value. It then presents the data on the REST html page for that layer.

## Instructions

### Installation

Installation on the browser is as simple as adding a bookmark. From the [bookmarklet.html](https://github.com/raykendo/ESRI_REST_Diagnostics/blob/master/bookmarklets.html) page... 

- Chrome: drag the anchor link to your browser toolbar.
- Firefox: right-click on the link and select "Bookmark this link".
- IE: right-click on the link and select "Add to Favorites".
- Safari: untested.
- Opera: untested.

### Basic Use

Navigate to an ArcGIS Server REST service endpoint in your browser. Drill down to a Map Service or a Feature Service layer. [Click here for an example](http://sampleserver6.arcgisonline.com/arcgis/rest/services/DamageAssessment/MapServer/0). Call the bookmarklet from your bookmark bar, and let it run.

The bookmarklets requests field properties for the layer and finds fields with domains. For each coded value domain, the bookmarklet queries for the count of features that have that coded value. It then writes the values on the HTML page for the REST service.

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