$(function() {
	/* Navbar right-side dropdown functionality.
	 * For this to work, the links must have a data-rel attribute which contains
	 * the same value as the dropdown's data-name attribute.
	 * The two elements must share the same parent.
	 * 
	 *   <li>
	 *     <a data-rel="messages"></a>
	 *     <ul data-name="messages"></ul>
	 *
	 * Example: http://450.github.io/speedrun.com top navigation bar icons.
	 */
	$('.nav-button-dropdown').on('click', '[data-rel]', function() {
		var $el = $(this),
				$parent = $el.parent(),
				$rel = $parent.find($('[' + $el.attr('data-rel') + ']'));

		if ($parent.hasClass('active')) {
			$parent.removeClass('active');
			return;
		}

		$parent.parent().find('.active').removeClass('active');
		$parent.toggleClass('active');
	});

	/* Clickable table row functionality.
	 * For this to work, the table row element must have a class of "clickable". It
	 * must also contain a data-location attribute which will be used to pass in the
	 * URL we wish to be directed to.
	 *
	 *   <tbody>
	 *     <tr class="clickable" data-location="http://example.com">
	 *
	 * Example: http://450.github.io/speedrun.com/Games/ExampleGame.html table rows.
	 */
	$('table').on('click', 'tr.clickable[data-location]', function() {
		var $el = $(this),
				location = $el.attr('data-location');

		window.location = location;
	});
})