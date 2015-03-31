$(function() {
	/* Navbar right-side dropdown functionality.
	 * For this to work, the list item element must have a "nav-button-dropdown" class
	 * and must contain both an <a> and related <ul> element.
	 * The <ul> element is hidden by default in the CSS, and is made visible by an
	 * "active" class being appended to the parent <li> element.
	 * 
	 *	 <li class="nav-button-dropdown">
	 *		 <a></a>
	 *		 <ul></ul>
	 *
	 * Example: http://450.github.io/speedrun.com top navigation bar icons.
	 */
	$('li.nav-button-dropdown').on('click', 'a', function(event) {
		// Prevent any default hyperlink behaviour (if any).
		event.preventDefault();

		// Get references to the <a> element and the parent <li>.
		var $el = $(this),
			$parent = $el.parent();

		// If this element is already active, remove the active class and hide the menu.
		if ($parent.hasClass('active')) {
			$parent.removeClass('active');

			// Stop further execution.
			return;
		}

		// Remove any active class from any of the <li> element's sibling <li> elements.
		$parent.siblings('.active').removeClass('active');

		// Finally give this <li> element the active class.
		$parent.toggleClass('active');
	});

	/* Clickable table row functionality.
	 * For this to work, the table row element must have a class of "clickable". It
	 * must also contain a data-location attribute which will be used to pass in the
	 * URL we wish to be directed to.
	 *
	 *	 <tbody>
	 *		 <tr class="clickable" data-location="http://example.com">
	 *
	 * Example: http://450.github.io/speedrun.com/Games/ExampleGame.html table rows.
	 */
	$('table').on('click', 'tr.clickable[data-location]', function() {
		// Prevent any default hyperlink behaviour (if any).
		var $el = $(this),
			location = $el.attr('data-location');

		// Redirect the page.
		window.location = location;
	});
})