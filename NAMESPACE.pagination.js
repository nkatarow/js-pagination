/*

    FILE: pagination.js
    DESCRIPTION:
    AUTHOR(S): Nick Katarow

    DEPENDENCIES:
    - jQuery 2.0.3

    TO DO:

*/

NAMESPACE.pagination = function (options, totalResults, resultsObject) {
    var self = this,
        currentPage = 1,
        totalPages,
        defaults,
        option;

    // Default settings that may be overwritten by passing different options when instantiating
    defaults = {
        // Container which the pagination content and controls live within
        contentContainer: $('.pagination-container'),

        // Actual element to count and split between pages
        contentSelector: $('.pagination-container li'),

        // Class or ID of page controller
        controls: $('.pagination'),

        // Pagination triggers
        controlTriggers: '.pagination li a',

        // Items per page
        maxResults: 10
    };

    // If different options are passed, overwrite the defaults with them
    for (option in options) {
        defaults[option] = options[option] || defaults[option];
    }

    self.options = defaults;

    // If totalResults is not manually set
    if (totalResults === undefined) {
        // Count them here
        totalResults = self.options.contentSelector.length;
    }

    // If we haven't already been passed a results object, create our own
    if (resultsObject === undefined) {
        resultsObject = [];

        // Grab each result and add it to the resultsObject
        for (var i = 0; i < totalResults; i ++) {
            resultsObject.push({
                markup: self.options.contentSelector[i].outerHTML
            });
        }
    }

    // If total number of results exceeds our max per page
    if (totalResults > self.options.maxResults) {
        // Determine number of pages rounting to next whole number
        totalPages = Math.ceil(totalResults / self.options.maxResults);
    } else {
        // Otherwise stop the script
        return;
    }

    // Kick off our page setup
    self.showPage(currentPage, totalResults, totalPages, resultsObject);

}; // END pagination

NAMESPACE.pagination.prototype = {

    showPage: function (currentPage, totalResults, totalPages, resultsObject) {
        var self = this,
            rangeCap,
            rangeFloor,
            resultsContent;

        // Calculate the highest item to be displayed in our range of results
        rangeCap = currentPage * self.options.maxResults;

        // Calculate the lowest item to be displayed in our range of results
        rangeFloor = rangeCap - self.options.maxResults;

        // Now only display the itmes that fall within our ranges
        self.options.contentContainer.empty();

        // For each item within the calculated range
        for (var i = rangeFloor; i < rangeCap; i++) {

            // Check to see if object exisits
            if (resultsObject[i]) {
                // Append object to the container
                self.options.contentContainer.append(resultsObject[i].markup);
            }
        }

        // Kick off rendering of controls
        self.renderControls(totalPages, totalResults, currentPage, resultsObject);

    }, //END showPage


    renderControls: function (totalPages, totalResults, currentPage, resultsObject) {
        var self = this;

        // Determine if we're running for the first time or updating existing controls
        if ((self.options.controls.find('li').length) !== 0) {
            self.options.controls.empty();
        }

        // Set up pagination page selectors
        for (var i = 1; i <= totalPages; i++) {
            if (i == currentPage) {
                self.options.controls.append('<li>' + i + '</li>');
            } else {
                self.options.controls.append('<li><a href="#' + i + '">' + i + '</a></li>');
            }
        }

        // Pagination controls click handling
        $(self.options.controlTriggers).click( function(event){

            event.preventDefault();

            // Call the pagination page set up, passing the desired page
            self.showPage((this.href.split('#')[1]), totalResults, totalPages, resultsObject);
        });

    } //END renderControls

}; // END NAMESPACE.pagination.prototype