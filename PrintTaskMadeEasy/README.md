# Print Task Made Easy (ESRI REST Diagnostics) (BETA)

Modifies the HTML and contents of an ArcGIS Server *Export Web Map Task* to make it easier to fill out the form.
## Features

This bookmarklet modifies the form for submitting an *Export Web Map Task*. It replaces form text blanks with select elements for fields with a choice list (like Format or Layout Template). It also provides a template Web Map as JSON to test a print service.


## Instructions

### Installation

Installation on the browser is as simple as adding a bookmark. From the [bookmarklet.html](https://github.com/raykendo/ESRI_REST_Diagnostics/blob/master/bookmarklets.html) page...

- Chrome: drag the anchor link to your browser toolbar.
- Firefox: right-click on the link and select "Bookmark this link".
- IE: right-click on the link and select "Add to Favorites".
- Safari: untested.
- Opera: untested.

### Basic Use

Navigate to an ArcGIS Server REST service endpoint in your browser. Find an *Export Web Map Task*, typically in the Utilities folder. At the bottom of the page, select either the "Execute Task" or "Submit Job" link to navigate to the *Export Web Map Task* form. From there, run the bookmark.

***

## Requirements

- Desktop browser (IE10+, Chrome, Firefox)
- Security settings that support bookmarklets.
- Access to an ArcGIS Server REST endpoint in browser.

## Notes

- Currently untested on Safari and Opera. Please give me feedback if you try it.
- Not tested on mobile/tablet browsers, since I'm not sure how bookmarklets work with those.

## Contributing

Anyone is welcome to contribute to this project.

## Licensing

This is currently licensed under the MIT Licensing ([See License here](https://github.com/raykendo/ESRI_REST_Diagnostics/blob/master/LICENSE)).
