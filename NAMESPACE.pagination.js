/*

    FILE: pagination.js
    DESCRIPTION:
    AUTHOR(S): Nick Katarow

    DEPENDENCIES:
    - jQuery 2.0.3

    TO DO:
    - Clean up

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
        controls: $('ul.pagination'),

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
            showingAll = false,
            rangeCap,
            rangeFloor,
            nowShowingCopy,
            resultsContent;

        // Calculate the highest item to be displayed in our range of results
        if (currentPage == totalPages) {
            rangeCap = totalResults;
        } else {
            rangeCap = currentPage * self.options.maxResults;
        }

        // Calculate the lowest item to be displayed in our range of results
        rangeFloor = (currentPage * self.options.maxResults) - self.options.maxResults;

        nowShowingCopy = '<p class="now-showing">' + (rangeFloor + 1) + ' - ' + rangeCap + ' of ' + totalResults + ' &nbsp;&nbsp;( <a href="#" class="show-select show-all">view all</a> )</p>';

        // Empty the currently showing items
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
        self.renderControls(totalPages, totalResults, currentPage, resultsObject, nowShowingCopy, showingAll);
    }, //END showPage

    showAll: function (totalPages, totalResults, currentPage, resultsObject, nowShowingCopy) {
        var self = this,
            rangeFloor = 0,
            showingAll = true,
            rangeCap = totalResults;


        nowShowingCopy = '<p class="now-showing">viewing all results &nbsp;&nbsp;( <a href="#" class="show-select show-less">view less</a> )</p>';

        for (var i = rangeFloor; i < rangeCap; i++) {

            // Check to see if object exisits
            if (resultsObject[i]) {
                // Append object to the container
                self.options.contentContainer.append(resultsObject[i].markup);
            }
        }

        // Kick off rendering of controls
        self.renderControls(totalPages, totalResults, currentPage, resultsObject, nowShowingCopy, showingAll);
    }, //END showAll

    renderControls: function (totalPages, totalResults, currentPage, resultsObject, nowShowingCopy, showingAll) {
        var self = this;

        // Clear out all previous content
        $('.now-showing').remove();
        $('.show-select').remove();
        self.options.controls.empty();

        // Add correct now showing message
        self.options.controls.before(nowShowingCopy);


        // If not we're showing all items
        if (showingAll !== true) {

            // Set up pagination page selectors
            for (var i = 1; i <= totalPages; i++) {
                if (i == currentPage) {
                    self.options.controls.append('<li>' + i + '</li>');
                } else {
                    self.options.controls.append('<li><a href="#' + i + '">' + i + '</a></li>');
                }
            }
        }



        // Pagination controls click handling
        $(self.options.controlTriggers).click( function(event){
            event.preventDefault();

            // Call the pagination page set up, passing the desired page
            self.showPage(Number(this.href.split('#')[1]), totalResults, totalPages, resultsObject);

            $('html,body').animate({
                scrollTop: self.options.contentContainer.offset().top - 250
            }, 500);
        });

        $('.show-all').click( function(event){
            event.preventDefault();

            self.showAll(totalPages, totalResults, currentPage, resultsObject, nowShowingCopy);

            $('html,body').animate({
                scrollTop: self.options.contentContainer.offset().top - 250
            }, 500);
        });

        $('.show-less').click( function(event){
            event.preventDefault();

            self.showPage(currentPage, totalResults, totalPages, resultsObject);

            $('html,body').animate({
                scrollTop: self.options.contentContainer.offset().top - 250
            }, 500);
        });
    } //END renderControls

}; // END NAMESPACE.pagination.prototype

