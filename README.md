js-pagination
=============

JavaScript Pagination Module


##Author
Nick Katarow (<http://github.com/nkatarow>)

###What it does
**Full Description to be written upon completion...**


###Dependencies
- jQuery 2.0.3

###Using Default Options

	$(document).ready(function () {
		window.defaultPagination = new NAMESPACE.pagination();
	});


###Setting Custom Options

    $(document).ready(function () {
        window.mySecondSlideshow = new SSFJ.Slideshow({
	        // Container which the pagination content and controls live within
	        contentContainer: $('.custom-pagination'),
	
	        // Actual element to count and split between pages
	        contentSelector: $('.custom-pagination p'),
	
	        // Class or ID of page controller
	        controls: $('.pagination-ctrl'),
	
	        // Pagination triggers
	        controlTriggers: '.pagination-ctrl li a',
	
	        // Items per page
	        maxResults: 5
        });
    });

###Other Options
- You may manually pass in the total number of results if you need to as the second arguement after the options object.
- You also may manually pass in the results object manually if it has been previously created (untested).