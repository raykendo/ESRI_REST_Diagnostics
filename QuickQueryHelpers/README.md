# Quick Query Helpers

On the ArcGIS Server REST Query page for a layer, these bookmarklets will fill in the query pages with default values.

## Features

These bookmarklets supply simple default values for fields in the ArcGIS Server REST Query page. Each Bookmarklet affects the following fields.

- *Give Me All*
  - where: 1=1
  - outFields: *
  - returnGeometry: true
- *Count Them Up*
  - where: 1=1
  - returnCountOnly: true
- *Everything But Geometry*
  - where: 1=1
  - outFields: *
  - returnGeometry: false
- *Select Distinct*
  - where: 1=1
  - returnGeometry: false
  - outFields: value selected from a dropdown selection
  - returnDistinctValues: true

## Instructions

### Installation

Installation on the browser is as simple as adding a bookmark. From the [ESRI Rest Diagnostics](http://raykendo.github.io/ESRI_REST_Diagnostics/) page...

- Chrome: drag the anchor link to your browser toolbar.
- Firefox: right-click on the link and select "Bookmark this link".
- IE: right-click on the link and select "Add to Favorites".
- Safari: untested.
- Opera: drag the anchor link to your browser toolbar. 

### Basic Use

Navigate to an ArcGIS Server REST service endpoint in your browser. Drill down to a Map Service or a Feature Service layer, [like this US Census State layer](http://sampleserver6.arcgisonline.com/arcgis/rest/services/Census/MapServer/3/query). Call the bookmarklet from your bookmark bar, and let it run.

The bookmarklet will show a form in the upper right hand corner that lists the field names by alias, as well as SQL keywords used in queries. Selecting a field from the list will populate whatever text blank you had selected previously with the field name. It will also request a list of valid results, and fill them in a second selection list. Clicking on any list or button will fill the last text blank you selected with field names, results, and SQL keywords.

## Requirements

- Desktop browser (IE10+, Chrome, Firefox)
- Security settings that support bookmarklets.
- Access to an ArcGIS Server REST endpoint in browser.

## Notes

- Currently untested on Safari. Please give me feedback if you try it.
- Not tested on mobile/tablet browsers, since I'm not sure how bookmarklets work with those.

## Contributing

Anyone is welcome to contribute to this project.

## Licensing

This is currently licensed under the MIT Licensing ([See License here](https://github.com/raykendo/ESRI_REST_Diagnostics/blob/master/LICENSE)).
