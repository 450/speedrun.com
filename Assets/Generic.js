$(function() {
	/* Navbar right-side dropdown functionality.
	 * For this to work, the links must have a data-rel attribute which contains
	 * the same value as the dropdown's data-name attribute.
	 * The two elements must share the same parent.
	 * 
	 *   <li>
	 *     <a data-rel="messages"></a>
	 *     <ul data-name="messages"></ul>
	 */
	$('.nav-button-dropdown').on('click', '[data-rel]', function() {
		var $el = $(this),
				$parent = $el.parent(),
				$rel = $parent.find($('[' + $el.attr('data-rel') + ']'));

		if ($parent.hasClass('active')) {
			$parent.removeClass('active');
			return;
		}

		$('.active').removeClass('active');
		$parent.toggleClass('active');
	})
})